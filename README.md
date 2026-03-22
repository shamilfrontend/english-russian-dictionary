# english-russian-dictionary

Англо-русский словарь в виде JSON: частотный порядок по списку **Google 10k English** ([first20hours/google-10000-english](https://github.com/first20hours/google-10000-english), файл `google-10000-english.txt` из корпуса Google Trillion Word, через агрегацию в духе Norvig). Слова в `top/*.json` — префикс этого списка (после нормализации: `trim`, нижний регистр; в исходнике без дубликатов).

## Схема JSON

```json
[
  {
    "word": "car",
    "translation": "машина",
    "transcription": "[kɑː]"
  }
]
```

Поля `translation` и `transcription` собраны **автоматически** (Викисловари en/ru, при необходимости — [MyMemory](https://mymemory.translated.net/doc) как запасной перевод). Их стоит выборочно править под ваш тренажёр. Часть статей без удобной строки «Russian:» или без IPA даёт перевод «—» или транскрипцию `[]`.

## Файлы

| Файл | Число записей |
|------|----------------|
| `top/top100.json` | 100 |
| `top/top300.json` | 300 |
| `top/top500.json` | 500 |
| `top/top1000.json` | 1000 |
| `top/top1500.json` | 1500 |
| `top/top3000.json` | 3000 |
| `top/top10000.json` | 10000 |

## Пересборка

Требуется Node.js 18+ (скрипт без зависимостей).

1. Список слов: [`scripts/data/google-10000-english.txt`](scripts/data/google-10000-english.txt) (уже vendored; при обновлении замените файл или скачайте с GitHub-репозитория выше).
2. Запуск:

```bash
node scripts/build_top_words.mjs
```

Кэш запросов — в `scripts/cache/` (в git не коммитится). Повторный запуск дозаполняет только отсутствующие слова. Для проверки на малом префиксе: `node scripts/build_top_words.mjs --limit=50` (пишет `top/_preview_50.json`).

## Лицензии и атрибуция

- Порядок слов — производная от открытых частотных данных (см. репозиторий google-10000-english; уточняйте лицензию у автора списка при коммерческом использовании).
- Тексты Викисловари: [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
- MyMemory — см. условия на их сайте (fallback, ограниченный объём).
