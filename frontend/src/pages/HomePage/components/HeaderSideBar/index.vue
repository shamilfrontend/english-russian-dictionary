<script setup lang="ts">
</script>

<template>
	<div class="sidebar" aria-label="Уровни">
		<div class="path-card">
			<h2 class="path-card__heading">Твой путь</h2>
			<ul class="path" role="list">
				<li class="path__item path__item--done">
						<span class="path__node" aria-hidden="true">
							<svg
								viewBox="0 0 24 24"
								stroke="#fff"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<polyline points="20 6 9 17 4 12"/>
							</svg>
						</span>
					<div class="path__text">
						<span class="path__label">Top 100</span>
						<span class="path__sub">Базовые слова</span>
					</div>
				</li>
				<li class="path__item path__item--current">
						<span class="path__node" aria-hidden="true">
            	<svg
								viewBox="0 0 24 24"
								stroke="#fff"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
							</svg>
						</span>
					<div class="path__text">
						<span class="path__label">Top 300</span>
						<span class="path__sub">Частые слова</span>
					</div>
					<span class="path__badge">12%</span>
				</li>
				<li class="path__item path__item--locked">
						<span class="path__node" aria-hidden="true">
							<svg
								viewBox="0 0 24 24"
								stroke="#b0b0b0"
								stroke-width="2.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<rect x="3" y="11" width="18" height="11" rx="2"/>
								<path d="M7 11V7a5 5 0 0 1 10 0v4"/>
							</svg>
						</span>
					<div class="path__text">
						<span class="path__label">Top 500</span>
						<span class="path__sub">Средний уровень</span>
					</div>
				</li>

				<li class="path__item path__item--locked">
						<span class="path__node" aria-hidden="true">
							<svg
								viewBox="0 0 24 24"
								stroke="#b0b0b0"
								stroke-width="2.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<rect x="3" y="11" width="18" height="11" rx="2"/>
								<path d="M7 11V7a5 5 0 0 1 10 0v4"/>
							</svg>
						</span>
					<div class="path__text">
						<span class="path__label">Top 1 000</span>
						<span class="path__sub">Уверенный</span>
					</div>
				</li>

				<li class="path__item path__item--locked">
						<span class="path__node" aria-hidden="true">
							<svg
								viewBox="0 0 24 24"
								stroke="#b0b0b0"
								stroke-width="2.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<rect x="3" y="11" width="18" height="11" rx="2"/>
								<path d="M7 11V7a5 5 0 0 1 10 0v4"/>
							</svg>
						</span>
					<div class="path__text">
						<span class="path__label">Top 3 000</span>
						<span class="path__sub">Продвинутый</span>
					</div>
				</li>

				<li class="path__item path__item--locked">
						<span class="path__node" aria-hidden="true">
							<svg
								viewBox="0 0 24 24"
								stroke="#b0b0b0"
								stroke-width="2.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<rect x="3" y="11" width="18" height="11" rx="2"/>
								<path d="M7 11V7a5 5 0 0 1 10 0v4"/>
							</svg>
						</span>
					<div class="path__text">
						<span class="path__label">Top 10 000</span>
						<span class="path__sub">Мастер</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.sidebar {
	padding-right: 1.25rem;
}

/* ============ Sidebar / Path ============ */

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
</style>
