<script setup lang="ts">
import HeaderSideBar from './components/HeaderSideBar/index.vue'
</script>

<template>
	<div class="home-page">
		<!-- Сайдбар: «путь» из уровней -->
		<HeaderSideBar />

		<!-- Основной контент -->
		<div class="main" id="main">
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
		</div>
	</div>
</template>

<style scoped>
.home-page {
	display: grid;
	grid-template-columns: var(--sidebar-w) 1fr;
	gap: 0;
	max-width: var(--max-w);
	width: 100%;
	margin: 0 auto;
	padding: 1.25rem clamp(0.75rem, 3vw, 1.5rem) 3rem;
}

.main {
	padding-left: 1.25rem;
	max-width: 100%;
}

/* Прогресс урока */
.lesson-progress {
	margin-bottom: 1.25rem;
}

.lesson-progress__head {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	gap: 0.75rem;
	margin-bottom: 0.4rem;
}

.lesson-progress__title {
	font-size: 0.8125rem;
	font-weight: 800;
	color: var(--text-dim);
}

.lesson-progress__frac {
	font-size: 0.8125rem;
	font-weight: 700;
	color: var(--text-muted);
}

.lesson-progress__frac strong {
	color: var(--green);
	font-weight: 800;
}

.lesson-progress__track {
	height: 16px;
	border-radius: var(--r-pill);
	background: var(--bg-raised);
	border: 2px solid var(--border);
	overflow: hidden;
}

.lesson-progress__fill {
	height: 100%;
	border-radius: inherit;
	background: linear-gradient(90deg, var(--green), var(--green-light));
	transition: width 0.4s ease;
	position: relative;
}

.lesson-progress__fill::after {
	content: "";
	position: absolute;
	inset: 2px 0;
	background: linear-gradient(180deg, rgba(255, 255, 255, 0.25), transparent);
	border-radius: inherit;
}

/* ============ Карточка слова ============ */
.card {
	background: var(--bg-card);
	border: 2px solid var(--border);
	border-radius: var(--r-lg);
	box-shadow: 0 6px 0 var(--border);
	overflow: hidden;
}

.card__counter {
	padding: 0.65rem 1.25rem;
	font-size: 0.75rem;
	font-weight: 700;
	color: var(--text-muted);
	border-bottom: 1px solid var(--border);
	background: var(--bg-raised);
}

.card__body {
	padding: 1.5rem 1.5rem 1.25rem;
	text-align: center;
}

.card__word {
	margin: 0;
	font-size: clamp(2.25rem, 7vw, 3rem);
	font-weight: 800;
	letter-spacing: -0.03em;
	line-height: 1.1;
	color: #fff;
}

.card__ipa {
	margin: 0.4rem 0 0;
	font-size: 1.05rem;
	font-weight: 600;
	font-style: italic;
	color: var(--text-dim);
}

.card__divider {
	width: 48px;
	height: 4px;
	background: var(--green);
	border-radius: 2px;
	margin: 1.15rem auto;
	opacity: 0.6;
}

.card__translation {
	margin: 0;
	font-size: 1.5rem;
	font-weight: 800;
	color: var(--green);
}

/* Подсказка */
.card__hint {
	display: flex;
	align-items: flex-start;
	gap: 0.55rem;
	margin: 0 1.25rem;
	padding: 0.75rem 0.85rem;
	border-radius: var(--r-sm);
	background: var(--bg-raised);
	border: 1px dashed var(--border-light);
}

.card__hint-icon {
	flex-shrink: 0;
	font-size: 1rem;
	line-height: 1.4;
}

.card__hint-text {
	margin: 0;
	font-size: 0.875rem;
	font-weight: 600;
	color: var(--text-dim);
	line-height: 1.4;
}

/* Кнопки */
.card__actions {
	display: grid;
	grid-template-columns: 1fr;
	gap: 0.55rem;
	padding: 1.15rem 1.25rem 1.25rem;

	@media (min-width: 480px) {
		grid-template-columns: 1fr 1fr;
		.card__actions .btn--green {
			grid-column: 1 / -1;
		}
	}
}

.btn {
	font: inherit;
	font-weight: 800;
	font-size: 0.9375rem;
	letter-spacing: 0.02em;
	text-transform: uppercase;
	padding: 0.8rem 1.2rem;
	border-radius: var(--r-md);
	border: none;
	cursor: pointer;
	width: 100%;
	min-height: 52px;
	color: #fff;
	position: relative;
	transition: transform 0.08s, filter 0.12s;
}

.btn:focus-visible {
	outline: 3px solid var(--blue);
	outline-offset: 3px;
}

.btn:active {
	transform: translateY(4px);
}

.btn--green {
	background: linear-gradient(180deg, var(--green-light), var(--green));
	border-bottom: 4px solid var(--green-dark);

	@media (min-width: 480px) {
		grid-column: 1 / -1;
	}
}

.btn--green:hover {
	filter: brightness(1.06);
}

.btn--green:active {
	border-bottom-width: 0;
	padding-bottom: calc(0.8rem + 4px);
}

.btn--orange {
	background: linear-gradient(180deg, #ffb347, var(--orange));
	border-bottom: 4px solid var(--orange-dark);
}

.btn--orange:hover {
	filter: brightness(1.04);
}

.btn--orange:active {
	border-bottom-width: 0;
	padding-bottom: calc(0.8rem + 4px);
}

.btn--blue {
	background: linear-gradient(180deg, #56c8fa, var(--blue));
	border-bottom: 4px solid var(--blue-dark);
}

.btn--blue:hover {
	filter: brightness(1.04);
}

.btn--blue:active {
	border-bottom-width: 0;
	padding-bottom: calc(0.8rem + 4px);
}
</style>
