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

	/**
	 * Wajah huruf untuk tiap baris. Halaman koran tidak pernah memakai satu
	 * gaya saja, ada badan berita, ada judul, ada baris pengantar berhuruf
	 * kapital. Baris badan berita sengaja diulang beberapa kali supaya lebih
	 * sering terpilih daripada judul.
	 */
	const looks = [
		{
			family: 'var(--font-display)',
			size: 1,
			weight: 400,
			style: 'normal',
			caps: 'none',
			track: 0
		},
		{
			family: 'var(--font-display)',
			size: 1,
			weight: 400,
			style: 'normal',
			caps: 'none',
			track: 0
		},
		{
			family: 'var(--font-display)',
			size: 0.96,
			weight: 400,
			style: 'italic',
			caps: 'none',
			track: 0.01
		},
		{
			family: 'var(--font-sans)',
			size: 0.78,
			weight: 300,
			style: 'normal',
			caps: 'none',
			track: 0
		},
		{
			family: 'var(--font-sans)',
			size: 0.78,
			weight: 300,
			style: 'normal',
			caps: 'none',
			track: 0
		},
		// judul berita
		{
			family: 'var(--font-display)',
			size: 1.32,
			weight: 600,
			style: 'normal',
			caps: 'none',
			track: -0.01
		},
		{
			family: 'var(--font-sans)',
			size: 1.02,
			weight: 600,
			style: 'normal',
			caps: 'none',
			track: -0.015
		},
		// baris pengantar
		{
			family: 'var(--font-sans)',
			size: 0.62,
			weight: 400,
			style: 'normal',
			caps: 'uppercase',
			track: 0.2
		},
		{
			family: 'var(--font-display)',
			size: 0.88,
			weight: 500,
			style: 'normal',
			caps: 'uppercase',
			track: 0.12
		}
	];

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
				const look = looks[Math.floor(Math.random() * looks.length)];

				row.textContent = strip();
				row.style.fontFamily = look.family;
				row.style.fontSize = `${(look.size * (0.95 + Math.random() * 0.12)).toFixed(3)}em`;
				row.style.fontWeight = `${look.weight}`;
				row.style.fontStyle = look.style;
				row.style.textTransform = look.caps;
				row.style.letterSpacing = `${(look.track + Math.random() * 0.012).toFixed(3)}em`;
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
		position: relative;
		z-index: 0;
		white-space: nowrap;
		color: var(--color-ink);
		background: none;
		padding: 0 0.1em;
	}

	/* Sapuan stabilonya dibuat sebagai lapisan tersendiri di belakang huruf,
	   sedikit lebih pendek dari tinggi baris, ujungnya membulat tidak rata,
	   dan miring tipis seperti coretan tangan. */
	.hit::before {
		content: '';
		position: absolute;
		z-index: -1;
		inset: 17% -0.14em 13% -0.12em;
		border-radius: 0.42em 0.2em 0.34em 0.26em / 0.7em 0.5em 0.6em 0.44em;
		transform: rotate(-0.7deg) skewX(-1.5deg);
		background-image: linear-gradient(
			100deg,
			color-mix(in srgb, var(--color-blush) 62%, transparent),
			color-mix(in srgb, var(--color-blush) 96%, transparent) 18%,
			color-mix(in srgb, var(--color-blush) 86%, transparent) 74%,
			color-mix(in srgb, var(--color-blush) 58%, transparent)
		);
		background-repeat: no-repeat;
		background-size: 0% 100%;
		filter: blur(0.35px);
		transition: background-size 1s cubic-bezier(0.42, 0.06, 0.2, 1) 200ms;
	}
	.hit.lit::before {
		background-size: 100% 100%;
	}

	@media (prefers-reduced-motion: reduce) {
		.hit {
			transition-duration: 0.01ms;
		}
	}
</style>
