<script setup lang="ts">
import TheHeader from './components/TheHeader/index.vue';
</script>

<template>
	<div class="app">

		<!-- Верхняя панель -->
		<TheHeader />

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
</style>
