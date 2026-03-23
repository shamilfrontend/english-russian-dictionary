<script setup lang="ts">

</script>

<template>
	<header class="the-header">
		<div class="the-header__inner">
			<router-link to="/" class="the-header__logo" aria-label="Главная">
				<svg class="the-header__logo-icon" viewBox="0 0 40 40" fill="none" aria-hidden="true">
					<rect width="40" height="40" rx="12" fill="#58cc02"/>
					<text
						x="20"
						y="27"
						text-anchor="middle"
						font-size="22"
						font-weight="800"
						fill="#fff"
						font-family="Nunito, sans-serif"
					>
						W
					</text>
				</svg>
			</router-link>

			<nav class="the-header__nav" aria-label="Основные разделы">
				<router-link to="/" class="the-header__tab the-header__tab--active" aria-current="page">
					<svg class="the-header__tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
							 stroke-linecap="round" stroke-linejoin="round">
						<path d="M3 9.5L12 4l9 5.5"/>
						<path d="M19 13v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-6"/>
					</svg>
					<span>Учить</span>
				</router-link>
				<router-link to="/" class="the-header__tab">
					<svg class="the-header__tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
							 stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="12" r="10"/>
						<path d="M12 6v6l4 2"/>
					</svg>
					<span>Повторение</span>
				</router-link>
				<router-link to="/" class="the-header__tab">
					<svg class="the-header__tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
							 stroke-linecap="round" stroke-linejoin="round">
						<path d="M18 20V10"/>
						<path d="M12 20V4"/>
						<path d="M6 20v-6"/>
					</svg>
					<span>Статистика</span>
				</router-link>
				<router-link to="/" class="the-header__tab">
					<svg
						class="the-header__tab-icon"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="12" cy="8" r="4"/>
						<path d="M5.5 21a7.5 7.5 0 0 1 13 0"/>
					</svg>
					<span>Профиль</span>
				</router-link>
			</nav>
		</div>
	</header>
</template>

<style lang="scss" scoped>
.the-header {
	position: sticky;
	top: 0;
	z-index: 100;
	background-color: var(--bg-card);

	&__inner {
		display: grid;
		grid-template-columns: 40px 1fr;
		align-items: center;
		gap: 1rem;
		max-width: var(--max-w);
		margin: 0 auto;
		padding: 10px clamp(0.75rem, 3vw, 1.5rem);
	}

	&__logo {
		flex-shrink: 0;
		display: grid;
		place-items: center;
		text-decoration: none;
	}

	&__logo-icon {
		width: 40px;
		height: 40px;
		border-radius: 12px;
	}

	&__nav {
		flex-grow: 1;
		display: flex;
		gap: 0.15rem;
	}

	&__tab {
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

		&:last-of-type {
			margin-left: auto;
		}
	}
}

.the-header__tab-icon {
	width: 20px;
	height: 20px;
	flex-shrink: 0;
}

.the-header__tab:hover {
	color: var(--text);
	background: var(--bg-raised);
}

.the-header__tab--active {
	color: var(--green);
	background: rgba(88, 204, 2, 0.1);
	border-color: rgba(88, 204, 2, 0.25);
}

.the-header__tab:focus-visible {
	outline: 2px solid var(--blue);
	outline-offset: 2px;
}
</style>
