#!/usr/bin/env node
/**
 * Builds top/top{100,300,500,1000,1500,3000,10000}.json from
 * scripts/data/google-10000-english.txt using Wiktionary (en) wikitext
 * for Russian glosses + IPA, with disk cache and optional MyMemory fallback.
 */

import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DATA_FILE = path.join(ROOT, "scripts", "data", "google-10000-english.txt");
const CACHE_DIR = path.join(ROOT, "scripts", "cache", "wiktionary");
const TOP_DIR = path.join(ROOT, "top");

const USER_AGENT = "english-russian-dictionary/1.0 (educational; https://github.com/)";
const DELAY_MS = 90;
const MMM_DELAY_MS = 80;

const SLICE_SIZES = [100, 300, 500, 1000, 1500, 3000, 10000];

/** RU Wiktionary lemma pages for English auxiliaries (no plain «Значение» block). */
const BE_FORM_GLOSS = {
  is: "есть (3-е л. ед. ч., глагол to be)",
  am: "есть (1-е л. ед. ч., глагол to be)",
  are: "есть (наст. вр. to be: вы / мн. ч.)",
  was: "был, была, было (прош. вр. to be)",
  were: "были (прош. вр. to be)",
  been: "been (причастие II to be)",
  being: "being (герундий / причастие to be)",
};

/** Personal pronouns (en lemmas in the frequency list — avoid letter-name entries on RU Wiktionary). */
const PRONOUN_GLOSS = {
  i: "я",
  you: "ты; вы",
  it: "оно; это",
  we: "мы",
  they: "они",
  he: "он",
  she: "она",
};

const PRONOUN_IPA = {
  i: "aɪ",
  you: "juː",
  it: "ɪt",
  we: "wiː",
  they: "ðeɪ",
  he: "hiː",
  she: "ʃiː",
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function httpsGetJson(url, attempt = 1) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
        timeout: 45000,
      },
      (res) => {
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () => {
          if (res.statusCode && res.statusCode >= 400) {
            reject(new Error(`HTTP ${res.statusCode} for ${url}`));
            return;
          }
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(e);
          }
        });
      }
    );
    req.on("timeout", () => {
      req.destroy(new Error("socket timeout"));
    });
    req.on("error", reject);
  }).catch(async (err) => {
    const retriable =
      /ETIMEDOUT|ECONNRESET|EAI_AGAIN|socket timeout|ECONNREFUSED/i.test(String(err && err.message));
    if (retriable && attempt < 5) {
      await sleep(800 * attempt);
      return httpsGetJson(url, attempt + 1);
    }
    throw err;
  });
}

function stripStress(s) {
  return s.normalize("NFC").replace(/\u0301|\u0300/g, "");
}

function cleanTranslation(s) {
  let t = stripStress(s.trim());
  t = t.replace(/\s+/g, " ");
  return t;
}

/** Extract phonemic IPA from one {{IPA|en|...}} inner content */
function ipaFromBlock(inner) {
  const ukish = /a=RP|a=UK|Received Pronunciation|GA,UK|UK,GA|a=GA,UK/i.test(inner);
  const m = inner.match(/\/([^/]+)\//);
  if (m) return m[1].trim();
  const m2 = inner.match(/\[([^\]]+)\]/);
  if (m2) return m2[1].trim();
  return "";
}

function extractIpaFromWikitext(wt) {
  const re = /\{\{IPA\|en\|([^}]*)\}\}/g;
  const blocks = [];
  let mm;
  while ((mm = re.exec(wt)) !== null) blocks.push(mm[1]);

  const rp = blocks.find((b) => /a=RP|a=UK|Received Pronunciation/i.test(b));
  if (rp) {
    const ipa = ipaFromBlock(rp);
    if (ipa) return ipa;
  }
  const gaUk = blocks.find((b) => /GA,UK|UK,GA|a=GA,UK/i.test(b));
  if (gaUk) {
    const ipa = ipaFromBlock(gaUk);
    if (ipa) return ipa;
  }
  for (const b of blocks) {
    const ipa = ipaFromBlock(b);
    if (ipa) return ipa;
  }
  return "";
}

const RU_TEMPLATE_RE = /\{\{(?:t\+|tt\+)\|ru\|([^}|]+)/g;

function extractRussianFromLine(line) {
  if (!line || /not used\|ru|t-needed\|ru/i.test(line)) return [];
  const out = [];
  let m;
  RU_TEMPLATE_RE.lastIndex = 0;
  while ((m = RU_TEMPLATE_RE.exec(line)) !== null) out.push(cleanTranslation(m[1]));
  return out;
}

function russianLineIsAmbiguous(line) {
  if (!line || line.length > 450) return true;
  return /\{\{\s*qualifier\s*\|/i.test(line);
}

function extractRussianFromWikitext(wt) {
  const lineMatch = wt.match(/\* Russian:\s*([^\n]+)/);
  if (lineMatch && !russianLineIsAmbiguous(lineMatch[1])) {
    const fromLine = extractRussianFromLine(lineMatch[1]);
    if (fromLine.length) return dedupeTranslations(fromLine);
  }
  return [];
}

function dedupeTranslations(arr) {
  const seen = new Set();
  const out = [];
  for (const x of arr) {
    const k = x.toLowerCase();
    if (!x || seen.has(k)) continue;
    seen.add(k);
    out.push(x);
  }
  return out;
}

function needsTranslationsSubpage(wt) {
  return /\{\{\s*see translation subpage/i.test(wt);
}

async function fetchParseWikitext(pageTitle, host = "en.wiktionary.org") {
  const url = `https://${host}/w/api.php?action=parse&prop=wikitext&format=json&page=${encodeURIComponent(pageTitle)}`;
  const j = await httpsGetJson(url);
  if (j.error) return { error: j.error, wikitext: "" };
  return { error: null, wikitext: j.parse?.wikitext?.["*"] ?? "" };
}

function stripRuWikiMarkup(s) {
  return s
    .replace(/\{\{[^}]+\}\}/g, "")
    .replace(/\[\[([^|\]]+)\|[^\]]+\]\]/g, "$1")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/''+/g, "")
    .replace(/^#\s*/, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** RU Wiktionary: take only the English block (until the next `= {{-lang-` language section). */
function sliceRuWiktionaryEnglishBlock(wt) {
  const enMark = wt.search(/\{\{-en-/);
  if (enMark < 0) return "";
  const rest = wt.slice(enMark);
  const re = /\n= \{\{-([a-z]{2,})(?:\||-|\}\})/gi;
  let m;
  let cut = Math.min(rest.length, 20000);
  while ((m = re.exec(rest)) !== null) {
    const code = m[1].toLowerCase();
    if (code !== "en") {
      cut = m.index;
      break;
    }
  }
  return rest.slice(0, cut);
}

/** Russian Wiktionary: English lemmas use {{-en-…}}; inflected forms use {{Форма-гл|…|МФА=…}}. */
function extractRuWiktionaryEnGlossAndIpa(wt) {
  const slice = sliceRuWiktionaryEnglishBlock(wt);
  if (!slice) return { gloss: "", ipa: "" };
  let gloss = "";
  const zIdx = slice.indexOf("==== Значение ====");
  if (zIdx >= 0) {
    const chunk = slice.slice(zIdx, zIdx + 2000);
    const lines = chunk.split("\n");
    const defLine = lines.find((l) => /^#\s+/.test(l));
    if (defLine) {
      gloss = stripRuWikiMarkup(defLine);
      gloss = gloss.split(/\s\{\{/)[0].trim();
      gloss = gloss.replace(/\s*\{\{.*$/, "").trim();
      const semi = gloss.indexOf(";");
      if (semi > 0 && semi < 120) gloss = gloss.slice(0, semi).trim();
      if (gloss.length > 180) gloss = `${gloss.slice(0, 177)}…`;
    }
  }
  let ipa = "";
  const mfaM = slice.match(/\|МФА=([^|}\n]+)/);
  if (mfaM) ipa = mfaM[1].trim();
  const pronIdx = slice.indexOf("=== Произношение ===");
  if (!ipa && pronIdx >= 0) {
    const pchunk = slice.slice(pronIdx, pronIdx + 2500);
    const tm = pchunk.match(/\{\{transcription\|([^}|]+)/);
    if (tm) ipa = tm[1].trim();
  }
  return { gloss, ipa };
}

async function myMemoryTranslate(word) {
  if (word.length <= 1) return "";
  const q = encodeURIComponent(word);
  const url = `https://api.mymemory.translated.net/get?q=${q}&langpair=en|ru`;
  await sleep(MMM_DELAY_MS);
  const j = await httpsGetJson(url);
  const t = j?.responseData?.translatedText;
  if (!t || typeof t !== "string") return "";
  const lower = t.trim();
  if (/^QUERY LENGTH LIMIT/i.test(lower)) return "";
  const one = cleanTranslation(lower.split(/[,;]/)[0].trim());
  if (!one || one.length < 2) return "";
  if (/^[–—\-−]+$/u.test(one)) return "";
  if (one.toLowerCase() === word.toLowerCase()) return "";
  if (/^[a-z]+$/i.test(one) && one.length === word.length) return "";
  return one;
}

function cachePath(word) {
  const safe = word.replace(/[^a-z0-9_-]/gi, "_");
  return path.join(CACHE_DIR, `${safe}.json`);
}

async function enrichWord(word) {
  const cp = cachePath(word);
  if (fs.existsSync(cp)) {
    try {
      return JSON.parse(fs.readFileSync(cp, "utf8"));
    } catch {
      /* regenerate */
    }
  }

  await sleep(DELAY_MS);
  const main = await fetchParseWikitext(word);
  let wt = main.wikitext;
  let translation = "";
  let transcription = "";
  const sources = ["en.wiktionary.org"];

  const ruLineMatch = wt.match(/\* Russian:\s*([^\n]+)/);
  const ruLineNotUsed = !!(ruLineMatch && /not used\|ru/i.test(ruLineMatch[1]));

  if (!main.error && wt) {
    transcription = extractIpaFromWikitext(wt);
    let ru = extractRussianFromWikitext(wt);
    if (ru.length === 0 && needsTranslationsSubpage(wt)) {
      await sleep(DELAY_MS);
      const sub = await fetchParseWikitext(`${word}/translations`);
      if (!sub.error && sub.wikitext) {
        ru = extractRussianFromWikitext(sub.wikitext);
        sources.push("en.wiktionary.org/…/translations");
      }
    }
    if (ru.length) translation = ru.join(", ");
    if (!translation || ruLineNotUsed) {
      await sleep(DELAY_MS);
      const ruWiki = await fetchParseWikitext(word, "ru.wiktionary.org");
      if (!ruWiki.error && ruWiki.wikitext) {
        const { gloss, ipa } = extractRuWiktionaryEnGlossAndIpa(ruWiki.wikitext);
        if (gloss) {
          translation = gloss;
          sources.push("ru.wiktionary.org ({{-en-}})");
        } else if (BE_FORM_GLOSS[word]) {
          translation = BE_FORM_GLOSS[word];
          sources.push("ru.wiktionary.org (форма to be)");
        }
        if (!transcription && ipa) {
          transcription = ipa.split(/\s*,\s*/)[0].trim();
          sources.push("ru.wiktionary.org (IPA fallback)");
        }
      }
    }
  }

  if (!translation) {
    const mm = await myMemoryTranslate(word);
    if (mm) {
      translation = mm;
      sources.push("mymemory.translated.net (fallback)");
    }
  }

  if (!transcription) transcription = "";

  if (PRONOUN_GLOSS[word]) {
    translation = PRONOUN_GLOSS[word];
    transcription = PRONOUN_IPA[word] || transcription;
    sources.push("lemma fix: personal pronoun");
  }

  if (word === "a") {
    transcription = "ə";
    sources.push("lemma fix: indefinite article IPA");
  }

  const entry = {
    word,
    translation: translation || "—",
    transcription: transcription ? `[${transcription}]` : "[]",
    _sources: sources,
  };
  ensureDir(CACHE_DIR);
  fs.writeFileSync(cp, JSON.stringify(entry, null, 0), "utf8");
  return entry;
}

function loadWords() {
  const raw = fs.readFileSync(DATA_FILE, "utf8");
  const lines = raw.split(/\r?\n/);
  const words = [];
  const seen = new Set();
  for (const line of lines) {
    const w = line.trim().toLowerCase();
    if (!w) continue;
    if (seen.has(w)) continue;
    seen.add(w);
    words.push(w);
    if (words.length >= 10000) break;
  }
  if (words.length !== 10000) {
    throw new Error(`Expected 10000 unique words, got ${words.length}`);
  }
  return words;
}

function toPublicEntry(e) {
  return {
    word: e.word,
    translation: e.translation,
    transcription: e.transcription,
  };
}

function writeJson(filePath, arr) {
  const text = JSON.stringify(arr, null, 2) + "\n";
  fs.writeFileSync(filePath, text, "utf8");
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const limitArg = [...args].find((a) => a.startsWith("--limit="));
  const limit = limitArg ? Math.min(10000, Math.max(1, parseInt(limitArg.split("=")[1], 10))) : 10000;

  ensureDir(TOP_DIR);
  const allWords = loadWords();
  const slice = allWords.slice(0, limit);
  const results = [];

  for (let i = 0; i < slice.length; i++) {
    const w = slice[i];
    process.stderr.write(`\r${i + 1}/${slice.length} ${w}`.padEnd(60, " "));
    const e = await enrichWord(w);
    results.push(toPublicEntry(e));
  }
  process.stderr.write("\n");

  if (limit < 10000) {
    writeJson(path.join(TOP_DIR, `_preview_${limit}.json`), results);
    console.error(`Wrote preview only (--limit=${limit}).`);
    return;
  }

  for (const n of SLICE_SIZES) {
    const out = path.join(TOP_DIR, `top${n}.json`);
    writeJson(out, results.slice(0, n));
    console.error(`Wrote ${out} (${n} entries)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
