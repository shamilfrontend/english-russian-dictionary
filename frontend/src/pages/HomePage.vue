<script setup lang="ts">
</script>

<template>
  <div class="home-page">
		<!-- Сайдбар: «путь» из уровней -->
		<aside class="sidebar" aria-label="Уровни">
			<div class="path-card">
				<h2 class="path-card__heading">Твой путь</h2>
				<ul class="path" role="list">
					<li class="path__item path__item--done">
                <span class="path__node" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
						<div class="path__text">
							<span class="path__label">Top 100</span>
							<span class="path__sub">Базовые слова</span>
						</div>
					</li>
					<li class="path__item path__item--current">
                <span class="path__node" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </span>
						<div class="path__text">
							<span class="path__label">Top 300</span>
							<span class="path__sub">Частые слова</span>
						</div>
						<span class="path__badge">12%</span>
					</li>
					<li class="path__item path__item--locked">
                <span class="path__node" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
						<div class="path__text">
							<span class="path__label">Top 500</span>
							<span class="path__sub">Средний уровень</span>
						</div>
					</li>
					<li class="path__item path__item--locked">
                <span class="path__node" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
						<div class="path__text">
							<span class="path__label">Top 1 000</span>
							<span class="path__sub">Уверенный</span>
						</div>
					</li>
					<li class="path__item path__item--locked">
                <span class="path__node" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
						<div class="path__text">
							<span class="path__label">Top 3 000</span>
							<span class="path__sub">Продвинутый</span>
						</div>
					</li>
					<li class="path__item path__item--locked">
                <span class="path__node" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
						<div class="path__text">
							<span class="path__label">Top 10 000</span>
							<span class="path__sub">Мастер</span>
						</div>
					</li>
				</ul>
			</div>
		</aside>

		<!-- Основной контент -->
		<main class="main" id="main">

			<!-- Прогресс урока -->
			<section class="lesson-progress" aria-label="Прогресс урока">
				<div class="lesson-progress__head">
					<span class="lesson-progress__title">Top 300 — Частые слова</span>
					<span class="lesson-progress__frac"><strong>36</strong> / 300</span>
				</div>
				<div class="lesson-progress__track" role="progressbar" aria-valuenow="12" aria-valuemin="0" aria-valuemax="100">
					<div class="lesson-progress__fill" style="width: 12%"></div>
				</div>
			</section>

			<!-- Карточка слова -->
			<article class="card" aria-labelledby="card-word">
				<div class="card__counter">Слово 37 из 300</div>
				<div class="card__body">
					<h2 id="card-word" class="card__word">dictionary (сюда добавить кнопку воспроизведения)</h2>
					<p class="card__ipa">[ˈdɪkʃəˌnɛɹi]</p>
					<div class="card__divider"></div>
					<p class="card__translation">словарь</p>
				</div>
				<div class="card__hint">
					<span class="card__hint-icon" aria-hidden="true">💡</span>
					<p class="card__hint-text">Плейсхолдер для примера или ассоциации</p>
				</div>
				<div class="card__actions">
					<button type="button" class="btn btn--green">Знаю</button>
					<button type="button" class="btn btn--orange">Не помню</button>
					<button type="button" class="btn btn--blue">Пропустить</button>
				</div>
			</article>

			<!-- Сложные слова -->
			<section class="hard-words" aria-labelledby="hard-heading">
				<h2 id="hard-heading" class="hard-words__heading">Слова для повторения</h2>
				<ul class="hard-words__list" role="list">
					<li class="hard-words__item">
						<span class="hard-words__en">through</span>
						<span class="hard-words__ipa">[θɹuː]</span>
						<span class="hard-words__ru">через; сквозь</span>
					</li>
					<li class="hard-words__item">
						<span class="hard-words__en">though</span>
						<span class="hard-words__ipa">[ðoʊ]</span>
						<span class="hard-words__ru">хотя</span>
					</li>
					<li class="hard-words__item">
						<span class="hard-words__en">thought</span>
						<span class="hard-words__ipa">[θɔːt]</span>
						<span class="hard-words__ru">мысль</span>
					</li>
					<li class="hard-words__item">
						<span class="hard-words__en">enough</span>
						<span class="hard-words__ipa">[ɪˈnʌf]</span>
						<span class="hard-words__ru">достаточно</span>
					</li>
				</ul>
			</section>
		</main>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100%;
	flex: 1;
	display: grid;
	grid-template-columns: var(--sidebar-w) 1fr;
	gap: 0;
	max-width: var(--max-w);
	width: 100%;
	margin: 0 auto;
	padding: 1.25rem clamp(0.75rem, 3vw, 1.5rem) 3rem;
}
</style>
