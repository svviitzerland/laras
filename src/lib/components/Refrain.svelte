<script lang="ts">
	import { refrain } from '$lib/data';
	import { reveal } from '$lib/actions/reveal';

	let rows = $state<HTMLElement[]>([]);

	// tiap baris menyalakan stabilonya sendiri begitu masuk layar
	$effect(() => {
		const nodes = rows.filter(Boolean);
		if (!nodes.length) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					entry.target.classList.add('lit');
					observer.unobserve(entry.target);
				}
			},
			{ threshold: 0.7 }
		);

		for (const node of nodes) observer.observe(node);
		return () => observer.disconnect();
	});
</script>

<section class="refrain" aria-label="Sekilas tentang Larasati">
	<p class="eyebrow reveal label-caps" use:reveal={{ y: '12px', blur: 0 }}>Sekilas</p>

	<div class="stack">
		{#each refrain as line, i (line.before)}
			<p bind:this={rows[i]} class="row reveal" use:reveal={{ delay: i * 90, y: '24px' }}>
				<span class="side before">{line.before}</span>
				<span class="anchor font-display">Laras</span>
				<span class="side after">{line.after}</span>
			</p>
		{/each}
	</div>
</section>

<style>
	.refrain {
		position: relative;
		padding: 9rem 1.5rem;
		background: var(--color-mist);
	}
	@media (min-width: 768px) {
		.refrain {
			padding: 12rem 3rem;
		}
	}

	.eyebrow {
		margin-bottom: 4.5rem;
		text-align: center;
		color: var(--color-mocha);
	}

	.stack {
		display: grid;
		gap: 2.6rem;
		max-width: 1400px;
		margin-inline: auto;
	}
	@media (min-width: 900px) {
		.stack {
			gap: 3.2rem;
		}
	}

	/* Tiga kolom, dan kolom tengahnya selebar kata Laras. Karena kata itu
	   sama di semua baris, posisinya terkunci rapi dari atas sampai bawah. */
	.row {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: baseline;
		column-gap: 0.4em;
		font-family: var(--font-display);
		font-size: clamp(1.15rem, 2.6vw, 2.15rem);
		line-height: 1.35;
		font-weight: 300;
		color: var(--color-ink);
	}
	.side {
		color: color-mix(in srgb, var(--color-ink) 78%, transparent);
	}
	.before {
		text-align: right;
	}
	.after {
		text-align: left;
	}

	/* tiap baris punya karakter huruf yang berbeda */
	.row:nth-child(2) .side {
		font-style: italic;
		color: var(--color-mocha);
	}
	.row:nth-child(3) .side {
		font-family: var(--font-sans);
		font-size: 0.58em;
		letter-spacing: 0.02em;
		color: var(--color-mocha);
	}
	.row:nth-child(4) .side {
		font-style: italic;
		color: color-mix(in srgb, var(--color-ink) 70%, transparent);
	}

	/* --- kata yang disapu stabilo --- */
	.anchor {
		position: relative;
		white-space: nowrap;
		background-image: linear-gradient(
			to right,
			color-mix(in srgb, var(--color-blush) 88%, transparent),
			color-mix(in srgb, var(--color-blush) 88%, transparent)
		);
		background-repeat: no-repeat;
		background-size: 0% 100%;
		padding: 0.14em 0.18em;
		margin: 0 -0.18em;
		transition: background-size 1.1s cubic-bezier(0.42, 0.06, 0.2, 1) 180ms;
	}
	/* kelas `lit` dipasang lewat JavaScript, jadi perlu ditandai global */
	.row:global(.lit) .anchor {
		background-size: 100% 100%;
	}

	/* di layar sempit kalimatnya mengalir biasa supaya tetap terbaca */
	@media (max-width: 700px) {
		.row {
			display: block;
			text-align: center;
			line-height: 1.6;
		}
		.before::after {
			content: ' ';
		}
		.after::before {
			content: ' ';
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.anchor {
			transition-duration: 0.01ms;
		}
	}
</style>
