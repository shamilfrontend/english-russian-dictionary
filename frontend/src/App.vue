<script setup lang="ts">
</script>

<template>
	<div class="app">

		<!-- Верхняя панель -->
		<header class="topbar">
			<div class="topbar__inner">
				<a href="#" class="topbar__logo" aria-label="Главная">
					<svg class="topbar__logo-icon" viewBox="0 0 40 40" fill="none" aria-hidden="true">
						<rect width="40" height="40" rx="12" fill="#58cc02"/>
						<text x="20" y="27" text-anchor="middle" font-size="22" font-weight="800" fill="#fff" font-family="Nunito, sans-serif">W</text>
					</svg>
				</a>

				<nav class="topbar__nav" aria-label="Основные разделы">
					<a href="#" class="topbar__tab topbar__tab--active" aria-current="page">
						<svg class="topbar__tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 4l9 5.5"/><path d="M19 13v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-6"/></svg>
						<span>Учить</span>
					</a>
					<a href="#" class="topbar__tab">
						<svg class="topbar__tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
						<span>Повторение</span>
					</a>
					<a href="#" class="topbar__tab">
						<svg class="topbar__tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
						<span>Статистика</span>
					</a>
					<a href="#" class="topbar__tab">
						<svg class="topbar__tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M5.5 21a7.5 7.5 0 0 1 13 0"/></svg>
						<span>Профиль</span>
					</a>
				</nav>
			</div>
		</header>

		<!-- Основная сетка -->
		<div class="layout">
			<RouterView />
		</div>
	</div>
</template>

<style lang="scss">
:root {
	--green: #58cc02;
	--green-dark: #46a302;
	--green-light: #89e219;
	--blue: #1cb0f6;
	--blue-dark: #1899d6;
	--orange: #ff9600;
	--orange-dark: #e68600;
	--red: #ff4b4b;
	--gold: #ffc800;

	--bg: #131f24;
	--bg-card: #1a2c32;
	--bg-raised: #233a42;
	--bg-input: #1a2c32;
	--text: #f5f5f5;
	--text-dim: #94a3ab;
	--text-muted: #637980;
	--border: #2a3f47;
	--border-light: #344e58;
	--glow: rgba(88, 204, 2, 0.12);

	--r-sm: 14px;
	--r-md: 18px;
	--r-lg: 22px;
	--r-pill: 999px;
	--font: "Nunito", system-ui, -apple-system, sans-serif;
	--topbar-h: 64px;
	--sidebar-w: 280px;
	--max-w: 1160px;
}

*,
*::before,
*::after {
	box-sizing: border-box;
}

html {
	-webkit-text-size-adjust: 100%;
	scrollbar-color: var(--border) var(--bg);
}

body {
	margin: 0;
	min-height: 100vh;
	font-family: var(--font);
	font-size: 1rem;
	line-height: 1.45;
	color: var(--text);
	background: var(--bg);
}

.visually-hidden {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}

.app {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

/* ============ Topbar ============ */
.topbar {
	position: sticky;
	top: 0;
	z-index: 100;
	background: var(--bg-card);
	border-bottom: 2px solid var(--border);
}

.topbar__inner {
	display: flex;
	align-items: center;
	gap: 1rem;
	max-width: var(--max-w);
	margin: 0 auto;
	height: var(--topbar-h);
	padding: 0 clamp(0.75rem, 3vw, 1.5rem);
}

.topbar__logo {
	flex-shrink: 0;
	display: grid;
	place-items: center;
	text-decoration: none;
}

.topbar__logo-icon {
	width: 40px;
	height: 40px;
	border-radius: 12px;
}

/* Навигационные табы */
.topbar__nav {
	display: flex;
	gap: 0.15rem;
	margin-left: 0.5rem;
}

.topbar__tab {
	display: flex;
	align-items: center;
	gap: 0.4rem;
	padding: 0.5rem 0.85rem;
	border-radius: var(--r-sm);
	color: var(--text-dim);
	text-decoration: none;
	font-size: 0.875rem;
	font-weight: 700;
	border: 2px solid transparent;
	transition: background 0.15s, color 0.15s, border-color 0.15s;
}

.topbar__tab-icon {
	width: 20px;
	height: 20px;
	flex-shrink: 0;
}

.topbar__tab:hover {
	color: var(--text);
	background: var(--bg-raised);
}

.topbar__tab--active {
	color: var(--green);
	background: rgba(88, 204, 2, 0.1);
	border-color: rgba(88, 204, 2, 0.25);
}

.topbar__tab:focus-visible {
	outline: 2px solid var(--blue);
	outline-offset: 2px;
}

/* ============ Layout ============ */
.layout {
}

/* ============ Sidebar / Path ============ */
.sidebar {
	padding-right: 1.25rem;
}

.path-card {
	position: sticky;
	top: calc(var(--topbar-h) + 1.25rem);
	background: var(--bg-card);
	border: 2px solid var(--border);
	border-radius: var(--r-lg);
	padding: 1.15rem 1rem 1rem;
	box-shadow: 0 6px 0 var(--border);
}

.path-card__heading {
	margin: 0 0 0.85rem 0.25rem;
	font-size: 0.7rem;
	font-weight: 800;
	text-transform: uppercase;
	letter-spacing: 0.12em;
	color: var(--text-muted);
}

.path {
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	gap: 0;
	position: relative;
}

.path__item {
	display: flex;
	align-items: center;
	gap: 0.75rem;
	padding: 0.65rem 0.5rem;
	border-radius: var(--r-sm);
	position: relative;
	transition: background 0.15s;
	cursor: default;
}

/* Вертикальная линия между нодами */
.path__item:not(:last-child)::after {
	content: "";
	position: absolute;
	left: calc(0.5rem + 18px);
	top: calc(0.65rem + 38px);
	width: 3px;
	height: calc(100% - 38px);
	border-radius: 2px;
}

.path__item--done:not(:last-child)::after {
	background: var(--green-dark);
}

.path__item--current:not(:last-child)::after {
	background: linear-gradient(180deg, var(--green-dark) 0%, var(--border) 100%);
}

.path__item--locked:not(:last-child)::after {
	background: var(--border);
}

.path__node {
	width: 38px;
	height: 38px;
	flex-shrink: 0;
	border-radius: 50%;
	display: grid;
	place-items: center;
	border: 3px solid transparent;
	box-shadow: 0 3px 0 rgba(0, 0, 0, 0.25);
}

.path__node svg {
	width: 18px;
	height: 18px;
}

.path__item--done .path__node {
	background: var(--green-dark);
	border-color: var(--green);
}

.path__item--current .path__node {
	background: var(--green);
	border-color: var(--green-light);
	box-shadow: 0 3px 0 var(--green-dark), 0 0 16px var(--glow);
	animation: pulse-node 2.2s ease-in-out infinite;
}

.path__item--locked .path__node {
	background: var(--bg-raised);
	border-color: var(--border);
}

@keyframes pulse-node {
	0%, 100% { box-shadow: 0 3px 0 var(--green-dark), 0 0 12px var(--glow); }
	50%      { box-shadow: 0 3px 0 var(--green-dark), 0 0 24px var(--glow), 0 0 42px rgba(88, 204, 2, 0.06); }
}

.path__text {
	display: flex;
	flex-direction: column;
	min-width: 0;
}

.path__label {
	font-size: 0.9375rem;
	font-weight: 800;
	line-height: 1.2;
}

.path__item--locked .path__label {
	color: var(--text-muted);
}

.path__sub {
	font-size: 0.75rem;
	font-weight: 600;
	color: var(--text-muted);
	line-height: 1.2;
}

.path__badge {
	margin-left: auto;
	padding: 0.2rem 0.5rem;
	font-size: 0.7rem;
	font-weight: 800;
	background: var(--green);
	color: #fff;
	border-radius: var(--r-pill);
	box-shadow: 0 2px 0 var(--green-dark);
}

.path__item--current {
	background: rgba(88, 204, 2, 0.07);
	border-radius: var(--r-sm);
}

.path__item:not(.path__item--locked):hover {
	background: var(--bg-raised);
}

/* ============ Main ============ */
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

/* ============ Слова для повторения ============ */
.hard-words {
	margin-top: 1.75rem;
}

.hard-words__heading {
	margin: 0 0 0.65rem;
	font-size: 1rem;
	font-weight: 800;
	color: var(--text-dim);
}

.hard-words__list {
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	border: 2px solid var(--border);
	border-radius: var(--r-md);
	overflow: hidden;
	box-shadow: 0 4px 0 var(--border);
}

.hard-words__item {
	display: grid;
	grid-template-columns: 1fr auto 1fr;
	align-items: center;
	gap: 0.75rem;
	padding: 0.7rem 1rem;
	background: var(--bg-card);
	border-bottom: 1px solid var(--border);
	transition: background 0.12s;
}

.hard-words__item:last-child {
	border-bottom: none;
}

.hard-words__item:hover {
	background: var(--bg-raised);
}

.hard-words__en {
	font-weight: 800;
	font-size: 0.9375rem;
}

.hard-words__ipa {
	font-size: 0.8125rem;
	font-weight: 600;
	font-style: italic;
	color: var(--text-muted);
	white-space: nowrap;
	text-align: center;
}

.hard-words__ru {
	font-size: 0.9375rem;
	font-weight: 700;
	color: var(--text-dim);
	text-align: right;
}

/* ============ Адаптив ============ */
@media (max-width: 860px) {
	:root {
		--sidebar-w: 220px;
	}

	.topbar__tab span {
		display: none;
	}

	.topbar__tab {
		padding: 0.5rem;
	}

	.topbar__tab-icon {
		width: 22px;
		height: 22px;
	}
}

@media (max-width: 680px) {
	.layout {
		grid-template-columns: 1fr;
		padding-bottom: 2rem;
	}

	.sidebar {
		padding-right: 0;
		padding-bottom: 0.75rem;
	}

	.path-card {
		position: static;
	}

	.path {
		flex-direction: row;
		gap: 0.25rem;
		overflow-x: auto;
		padding-bottom: 0.25rem;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: thin;
	}

	.path__item {
		flex-direction: column;
		text-align: center;
		gap: 0.35rem;
		min-width: 80px;
		flex-shrink: 0;
	}

	.path__item:not(:last-child)::after {
		display: none;
	}

	.path__sub,
	.path__badge {
		display: none;
	}

	.main {
		padding-left: 0;
		max-width: none;
	}

	.topbar__tab span {
		display: none;
	}

	.topbar__tab {
		padding: 0.5rem;
	}

	.topbar__tab-icon {
		width: 22px;
		height: 22px;
	}

	.pill__icon {
		font-size: 0.75rem;
	}

	.pill {
		padding: 0.25rem 0.45rem;
		font-size: 0.75rem;
	}
}

@media (min-width: 480px) {
	.card__actions {
		grid-template-columns: 1fr 1fr;
	}

	.card__actions .btn--green {
		grid-column: 1 / -1;
	}
}

</style>
