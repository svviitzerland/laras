<script lang="ts">
	import { onFrame } from '$lib/scroll.svelte';

	let started = $state(false);
	let cue = $state(true);

	let stage = $state<HTMLElement | null>(null);
	let beam = $state<HTMLElement | null>(null);
	let title = $state<HTMLElement | null>(null);

	// lampu sorot yang mengejar kursor dengan lembut
	let aimX = 0;
	let aimY = 0;
	let atX = 0;
	let atY = 0;
	let placed = false;

	$effect(() => {
		const id = setTimeout(() => (started = true), 60);
		return () => clearTimeout(id);
	});

	$effect(() => {
		if (!beam) return;

		return onFrame((state) => {
			const rect = stage?.getBoundingClientRect();
			if (!placed && rect) {
				atX = aimX = rect.width / 2;
				atY = aimY = rect.height * 0.44;
				placed = true;
			}

			atX += (aimX - atX) * 0.07;
			atY += (aimY - atY) * 0.07;

			if (beam) beam.style.transform = `translate3d(${atX.toFixed(1)}px, ${atY.toFixed(1)}px, 0)`;

			// nama bergeser tipis ke arah sorotan
			if (title && rect) {
				const dx = (atX / Math.max(rect.width, 1) - 0.5) * 16;
				const dy = (atY / Math.max(rect.height, 1) - 0.5) * 10;
				title.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
			}

			const near = state.y < state.viewportH * 0.25;
			if (near !== cue) cue = near;
		});
	});

	function aim(event: PointerEvent) {
		const rect = stage?.getBoundingClientRect();
		if (!rect) return;
		aimX = event.clientX - rect.left;
		aimY = event.clientY - rect.top;
	}
</script>

<section
	id="atas"
	bind:this={stage}
	class="hero"
	class:started
	class:is-in={started}
	onpointermove={aim}
	aria-label="Beranda"
>
	<div class="ambient" aria-hidden="true">
		<span class="orb one"></span>
		<span class="orb two"></span>
		<span bind:this={beam} class="beamlight"></span>
	</div>

	<!-- lengkung tipis yang menggambar dirinya sendiri saat halaman dibuka -->
	<svg
		class="gate"
		viewBox="0 0 400 520"
		fill="none"
		aria-hidden="true"
		preserveAspectRatio="xMidYMax meet"
	>
		<path d="M18 520 V214 A182 182 0 0 1 382 214 V520" />
	</svg>

	<h1 bind:this={title} class="name font-display">
		<span class="line-mask" style="--rv-delay:200ms"><span>Larasati</span></span>
		<span class="line-mask" style="--rv-delay:360ms"><span class="soft">Putri Maharani</span></span>
	</h1>

	<div class="cue" class:show={cue} aria-hidden="true">
		<span class="track"><span></span></span>
		<span class="label-caps">Gulir</span>
	</div>
</section>

<style>
	.hero {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100svh;
		padding: 8rem 1.5rem 9rem;
		overflow: hidden;
		text-align: center;
	}

	.ambient {
		position: absolute;
		inset: 0;
		pointer-events: none;
		mask-image: linear-gradient(to bottom, #000 62%, transparent 97%);
	}
	.orb {
		position: absolute;
		border-radius: 999px;
		filter: blur(120px);
	}
	.one {
		top: -16rem;
		right: -12rem;
		width: 36rem;
		height: 36rem;
		background: color-mix(in srgb, var(--color-blush) 62%, transparent);
		animation: drift 21s ease-in-out infinite;
	}
	.two {
		bottom: -18rem;
		left: -14rem;
		width: 32rem;
		height: 32rem;
		background: color-mix(in srgb, var(--color-sand) 68%, transparent);
		animation: drift 27s ease-in-out infinite reverse;
	}

	/* sorotan hangat yang mengikuti kursor */
	.beamlight {
		position: absolute;
		top: 0;
		left: 0;
		width: 48rem;
		height: 48rem;
		margin: -24rem 0 0 -24rem;
		border-radius: 999px;
		background: radial-gradient(
			circle,
			rgba(255, 253, 249, 0.95),
			rgba(255, 246, 232, 0.4) 40%,
			transparent 68%
		);
		opacity: 0;
		transition: opacity 2s var(--ease-silk) 0.4s;
	}
	.started .beamlight {
		opacity: 1;
	}

	/* lengkung latar, sama seperti gerbang galeri */
	.gate {
		position: absolute;
		bottom: 0;
		left: 50%;
		width: min(54rem, 88vw);
		height: min(36rem, 64svh);
		transform: translateX(-50%);
		pointer-events: none;
		/* kaki lengkungnya dibiarkan larut, bukan terpotong tepi layar */
		mask-image: linear-gradient(to bottom, #000 45%, transparent 92%);
	}
	.gate path {
		fill: none;
		stroke: color-mix(in srgb, var(--color-rose) 42%, transparent);
		stroke-width: 1;
		stroke-dasharray: 1300;
		stroke-dashoffset: 1300;
		transition: stroke-dashoffset 3.4s var(--ease-silk) 0.35s;
	}
	.started .gate path {
		stroke-dashoffset: 0;
	}

	/* --- nama --- */
	.name {
		position: relative;
		font-size: clamp(3.2rem, 12vw, 9.5rem);
		line-height: 0.9;
		font-weight: 300;
		letter-spacing: -0.015em;
	}
	.soft {
		display: block;
		color: var(--color-mocha);
		font-style: italic;
	}

	/* --- petunjuk gulir, tepat di tengah bawah --- */
	.cue {
		position: absolute;
		bottom: 2.4rem;
		left: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.9rem;
		color: var(--color-mocha);
		transform: translateX(-50%);
		opacity: 0;
		transition: opacity 1s var(--ease-silk) 1.3s;
	}
	.cue.show {
		opacity: 1;
	}
	.track {
		position: relative;
		display: block;
		width: 1px;
		height: 3.4rem;
		overflow: hidden;
		background: var(--color-sand);
	}
	.track span {
		position: absolute;
		inset-inline: 0;
		height: 50%;
		background: var(--color-rose);
		animation: cue 2.4s ease-in-out infinite;
	}
</style>
