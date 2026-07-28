<script lang="ts">
	import { tickerWords } from '$lib/data';
	import { onFrame } from '$lib/scroll.svelte';

	const loop = [...tickerWords, ...tickerWords, ...tickerWords];

	let track = $state<HTMLElement | null>(null);

	// Jalan pelan dengan sendirinya, lalu dipercepat dan dibalik arah
	// oleh gulir. Inilah yang bikin pita ini terasa hidup.
	$effect(() => {
		if (!track) return;
		let offset = 0;
		let span = track.scrollWidth / 3;

		const remeasure = () => {
			if (track) span = track.scrollWidth / 3;
		};
		remeasure();

		return onFrame((state) => {
			if (span <= 0) remeasure();
			offset -= 0.45 + state.velocity * 0.55;
			if (offset <= -span) offset += span;
			if (offset > 0) offset -= span;
			const lean = Math.max(Math.min(state.velocity * 0.06, 4), -4);
			if (track) {
				track.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0) skewX(${lean.toFixed(
					2
				)}deg)`;
			}
		});
	});
</script>

<div class="ticker">
	<div bind:this={track} class="track">
		{#each loop as word, i (word + i)}
			<span class="word font-display">{word}</span>
			<span class="star">✦</span>
		{/each}
	</div>
	<span class="fade left"></span>
	<span class="fade right"></span>
</div>

<style>
	/* tanpa warna latar sendiri supaya menyatu dengan bagian di atas dan bawahnya */
	.ticker {
		position: relative;
		overflow: hidden;
		padding-block: 2rem;
	}
	.track {
		display: flex;
		align-items: center;
		gap: 2.4rem;
		width: max-content;
		will-change: transform;
	}
	.word {
		font-size: clamp(1.5rem, 3vw, 2.2rem);
		color: var(--color-mocha);
		white-space: nowrap;
	}
	.star {
		color: color-mix(in srgb, var(--color-rose) 70%, transparent);
		font-size: 0.9rem;
	}
	.fade {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 7rem;
		pointer-events: none;
	}
	.left {
		left: 0;
		background: linear-gradient(to right, var(--color-ivory), transparent);
	}
	.right {
		right: 0;
		background: linear-gradient(to left, var(--color-ivory), transparent);
	}
</style>
