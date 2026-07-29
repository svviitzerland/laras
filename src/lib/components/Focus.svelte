<script lang="ts">
	import { paperLines, paperNameLines } from '$lib/data';

	let section = $state<HTMLElement | null>(null);
	let grid = $state<HTMLElement | null>(null);
	let lit = $state(false);

	const ROWS = 17;
	const ANCHOR = Math.floor(ROWS / 2);
	const indexes = Array.from({ length: ROWS }, (_, i) => i);

	const pick = () => paperLines[Math.floor(Math.random() * paperLines.length)];
	/** satu baris koran, sengaja panjang supaya terpotong di kedua tepi layar */
	const strip = (n = 3) => Array.from({ length: n }, pick).join(' ');

	$effect(() => {
		if (!section || !grid) return;

		const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const rows = [...grid.querySelectorAll<HTMLElement>('.row')];
		const line = grid.querySelector<HTMLElement>('.line');
		const lead = grid.querySelector<HTMLElement>('.lead');
		const trail = grid.querySelector<HTMLElement>('.trail');
		const mark = grid.querySelector<HTMLElement>('.hit');

		let beat = 0;
		let said = -1;

		// Kedalaman fokus dipasang sekali saja. Menghitung ulang blur pada tiap
		// denyut terlalu berat untuk perangkat yang tidak kencang.
		for (let i = 0; i < rows.length; i++) {
			if (i === ANCHOR) continue;
			const far = Math.abs(i - ANCHOR);
			rows[i].style.filter = `blur(${(far * 0.42).toFixed(2)}px)`;
			rows[i].style.opacity = `${Math.max(0.24, 0.94 - far * 0.075).toFixed(2)}`;
		}

		/**
		 * Satu denyut. Seluruh isi halaman berganti, termasuk kalimat yang
		 * memuat namanya. Setelah kalimatnya berganti, barisnya digeser
		 * sampai nama itu kembali jatuh tepat di titik tengah layar, jadi
		 * hanya nama itulah yang tidak pernah berpindah.
		 */
		const shuffle = () => {
			for (let i = 0; i < rows.length; i++) {
				if (i === ANCHOR) continue;

				const row = rows[i];
				row.textContent = strip();
				row.style.fontSize = `${(0.92 + Math.random() * 0.26).toFixed(3)}em`;
				row.style.fontWeight = Math.random() > 0.76 ? '600' : '400';
				row.style.letterSpacing = `${(Math.random() * 0.04 - 0.01).toFixed(3)}em`;
				row.style.transform = `translateX(${(Math.random() * 16 - 8).toFixed(1)}%)`;
			}

			if (!line || !lead || !trail || !mark) return;

			said = (said + 1) % paperNameLines.length;
			const [head, , tail] = paperNameLines[said].split(/(\bLaras\b)/);
			lead.textContent = `${strip(1)} ${head}`;
			trail.textContent = `${tail} ${strip(1)}`;

			// offsetLeft tidak terpengaruh transform, jadi aman diukur langsung
			const middle = mark.offsetLeft + mark.offsetWidth / 2;
			line.style.transform = `translateX(${-middle.toFixed(2)}px)`;
		};

		shuffle();

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					lit = true;
					if (!calm && !beat) beat = window.setInterval(shuffle, 150);
				} else {
					clearInterval(beat);
					beat = 0;
				}
			},
			{ threshold: 0.35 }
		);
		observer.observe(section);

		return () => {
			observer.disconnect();
			clearInterval(beat);
		};
	});
</script>

<section bind:this={section} class="paper" aria-label="Sekilas tentang Larasati">
	<div bind:this={grid} class="rows">
		{#each indexes as i (i)}
			{#if i === ANCHOR}
				<div class="row anchor">
					<span class="line">
						<span class="lead"></span><mark class="hit" class:lit>Laras</mark><span class="trail"
						></span>
					</span>
				</div>
			{:else}
				<div class="row" aria-hidden="true"></div>
			{/if}
		{/each}
	</div>
</section>

<style>
	.paper {
		position: relative;
		display: grid;
		place-items: center;
		min-height: 100svh;
		overflow: hidden;
		background: var(--color-mist);
	}

	/* Tinggi tiap baris dikunci, jadi seberapa pun isinya berubah, tidak ada
	   satu pun baris yang bergeser naik atau turun. */
	.rows {
		--row: clamp(1.9rem, 5.2vh, 3.1rem);
		display: grid;
		grid-auto-rows: var(--row);
		width: 100%;
		font-family: var(--font-display);
		font-size: clamp(1.1rem, 2.1vw, 1.7rem);
		color: var(--color-ink);
	}

	.row {
		display: flex;
		align-items: center;
		justify-content: center;
		height: var(--row);
		overflow: hidden;
		white-space: nowrap;
		line-height: var(--row);
	}

	/* baris kalimat utama, tetap satu baris teks biasa seperti yang lain */
	.anchor {
		position: relative;
		z-index: 2;
		display: block;
	}
	.line {
		position: absolute;
		top: 0;
		left: 50%;
		display: flex;
		align-items: center;
		height: 100%;
		white-space: nowrap;
		font-weight: 500;
	}

	/* satu satunya yang tidak pernah berpindah dari tengah layar */
	.hit {
		white-space: nowrap;
		color: var(--color-ink);
		background-color: transparent;
		background-image: linear-gradient(
			to right,
			color-mix(in srgb, var(--color-blush) 95%, transparent),
			color-mix(in srgb, var(--color-blush) 95%, transparent)
		);
		background-repeat: no-repeat;
		background-size: 0% 100%;
		padding: 0.1em 0.22em;
		margin: 0 -0.06em;
		transition: background-size 1s cubic-bezier(0.42, 0.06, 0.2, 1) 200ms;
	}
	.hit.lit {
		background-size: 100% 100%;
	}

	@media (prefers-reduced-motion: reduce) {
		.hit {
			transition-duration: 0.01ms;
		}
	}
</style>
