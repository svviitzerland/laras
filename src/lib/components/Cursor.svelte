<script lang="ts">
	import { onFrame } from '$lib/scroll.svelte';

	let ring = $state<HTMLElement | null>(null);
	let label = $state('');
	let active = $state(false);
	let visible = $state(false);

	$effect(() => {
		if (!ring) return;
		if (!window.matchMedia('(pointer: fine)').matches) return;

		let x = window.innerWidth / 2;
		let y = window.innerHeight / 2;
		let targetX = x;
		let targetY = y;

		const move = (event: PointerEvent) => {
			targetX = event.clientX;
			targetY = event.clientY;
			visible = true;

			const hit = (event.target as HTMLElement | null)?.closest('[data-cursor]');
			if (hit) {
				label = hit.getAttribute('data-cursor') ?? '';
				active = true;
			} else {
				label = '';
				active = false;
			}
		};

		const leave = () => (visible = false);

		window.addEventListener('pointermove', move, { passive: true });
		window.addEventListener('pointerdown', move, { passive: true });
		document.addEventListener('pointerleave', leave);

		const stop = onFrame(() => {
			x += (targetX - x) * 0.19;
			y += (targetY - y) * 0.19;
			if (ring) ring.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
		});

		document.documentElement.classList.add('has-custom-cursor');

		return () => {
			window.removeEventListener('pointermove', move);
			window.removeEventListener('pointerdown', move);
			document.removeEventListener('pointerleave', leave);
			document.documentElement.classList.remove('has-custom-cursor');
			stop();
		};
	});
</script>

<div bind:this={ring} class="ring" class:active class:visible aria-hidden="true">
	<span class="inner">
		<span class="text">{label}</span>
	</span>
</div>

<style>
	.ring {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 200;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.4s ease;
	}
	.ring.visible {
		opacity: 1;
	}
	.inner {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 26px;
		height: 26px;
		margin-left: -13px;
		margin-top: -13px;
		border-radius: 999px;
		border: 1px solid color-mix(in srgb, var(--color-ink) 45%, transparent);
		background: color-mix(in srgb, var(--color-ivory) 10%, transparent);
		backdrop-filter: invert(6%);
		transition:
			width 0.55s var(--ease-silk),
			height 0.55s var(--ease-silk),
			margin 0.55s var(--ease-silk),
			background-color 0.55s var(--ease-silk),
			border-color 0.55s var(--ease-silk);
	}
	.ring.active .inner {
		width: 92px;
		height: 92px;
		margin-left: -46px;
		margin-top: -46px;
		border-color: transparent;
		background: color-mix(in srgb, var(--color-gold) 88%, transparent);
	}
	.text {
		font-size: 0.6rem;
		letter-spacing: 0.24em;
		text-transform: uppercase;
		color: var(--color-noir);
		opacity: 0;
		transform: scale(0.7);
		transition:
			opacity 0.45s var(--ease-silk),
			transform 0.45s var(--ease-silk);
		white-space: nowrap;
	}
	.ring.active .text {
		opacity: 1;
		transform: scale(1);
	}

	@media (pointer: coarse) {
		.ring {
			display: none;
		}
	}
</style>
