<script lang="ts">
	import { fade, fly, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { gallery } from '$lib/data';
	import { viewer, closeViewer } from '$lib/viewer.svelte';
	import { lockScroll } from '$lib/scroll.svelte';

	const item = $derived(gallery[viewer.index]);

	function next() {
		viewer.index = (viewer.index + 1) % gallery.length;
	}
	function prev() {
		viewer.index = (viewer.index - 1 + gallery.length) % gallery.length;
	}

	function onKey(event: KeyboardEvent) {
		if (!viewer.open) return;
		if (event.key === 'Escape') closeViewer();
		if (event.key === 'ArrowRight') next();
		if (event.key === 'ArrowLeft') prev();
	}

	$effect(() => {
		if (!viewer.open) return;
		lockScroll(true);
		return () => lockScroll(false);
	});
</script>

<svelte:window on:keydown={onKey} />

{#if viewer.open}
	<div class="viewer" role="dialog" aria-modal="true" aria-label="Tampilan karya">
		<button
			class="backdrop"
			transition:fade={{ duration: 400 }}
			onclick={closeViewer}
			aria-label="Tutup tampilan"
		></button>

		<span class="beam" transition:fade={{ duration: 800 }} aria-hidden="true"></span>

		<div class="body">
			{#key item.id}
				<div class="art" in:scale={{ duration: 750, start: 0.94, opacity: 0, easing: cubicOut }}>
					<img src={item.src} alt="{item.title} pada {item.event}" />
				</div>

				<div class="note" in:fly={{ y: 26, duration: 750, delay: 120, easing: cubicOut }}>
					<p class="gold label-caps">Karya {item.no} · {item.year}</p>
					<h3 class="font-display">{item.title}</h3>
					<p class="say">{item.note}</p>

					<dl>
						{#each [['Acara', item.event], ['Peran', item.role], ['Lokasi', item.venue], ['Skala', item.audience]] as [key, value] (key)}
							<div>
								<dt class="label-caps">{key}</dt>
								<dd class="font-display">{value}</dd>
							</div>
						{/each}
					</dl>
				</div>
			{/key}
		</div>

		<button class="ctrl close" onclick={closeViewer} transition:fade aria-label="Tutup">
			<span></span><span></span>
		</button>
		<button class="ctrl left" onclick={prev} transition:fade aria-label="Karya sebelumnya">‹</button
		>
		<button class="ctrl right" onclick={next} transition:fade aria-label="Karya berikutnya"
			>›</button
		>

		<p class="tally label-caps" transition:fade>{viewer.index + 1} dari {gallery.length}</p>
	</div>
{/if}

<style>
	.viewer {
		position: fixed;
		inset: 0;
		z-index: 150;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.backdrop {
		position: absolute;
		inset: 0;
		background: color-mix(in srgb, var(--color-noir) 94%, transparent);
		backdrop-filter: blur(14px);
	}
	.beam {
		position: absolute;
		top: 0;
		left: 50%;
		width: 70vw;
		max-width: 60rem;
		height: 100%;
		margin-left: -35vw;
		clip-path: polygon(43% 0, 57% 0, 96% 100%, 4% 100%);
		background: linear-gradient(to bottom, rgba(255, 236, 204, 0.2), transparent 72%);
		filter: blur(48px);
		pointer-events: none;
	}

	.body {
		position: relative;
		z-index: 2;
		display: grid;
		align-items: center;
		gap: 2.5rem;
		width: 100%;
		max-width: 72rem;
		padding-inline: 1.5rem;
		color: var(--color-ivory);
	}
	@media (min-width: 900px) {
		.body {
			grid-template-columns: 1.15fr 0.85fr;
			gap: 4rem;
			padding-inline: 3rem;
		}
	}

	.art {
		display: flex;
		justify-content: center;
	}
	.art img {
		max-height: 52svh;
		width: auto;
		max-width: 100%;
		border: 10px solid #efe6da;
		object-fit: contain;
		box-shadow: 0 60px 120px -40px rgba(0, 0, 0, 0.9);
	}
	@media (min-width: 900px) {
		.art img {
			max-height: 74svh;
		}
	}

	.gold {
		color: var(--color-gold);
		margin-bottom: 1rem;
	}
	.note h3 {
		font-size: clamp(1.8rem, 4vw, 3rem);
		line-height: 1.1;
		font-weight: 300;
		margin-bottom: 1.2rem;
	}
	.say {
		max-width: 24rem;
		font-size: 0.94rem;
		line-height: 1.95;
		color: color-mix(in srgb, var(--color-ivory) 66%, transparent);
	}
	dl {
		margin-top: 2rem;
		padding-top: 1.5rem;
		border-top: 1px solid color-mix(in srgb, var(--color-ivory) 16%, transparent);
	}
	dl div {
		display: flex;
		gap: 1.5rem;
		margin-bottom: 0.7rem;
	}
	dt {
		width: 5.5rem;
		flex-shrink: 0;
		padding-top: 0.35rem;
		color: color-mix(in srgb, var(--color-ivory) 40%, transparent);
	}
	dd {
		font-size: 1.05rem;
		color: color-mix(in srgb, var(--color-ivory) 92%, transparent);
	}

	.ctrl {
		position: absolute;
		z-index: 3;
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		border-radius: 999px;
		border: 1px solid color-mix(in srgb, var(--color-ivory) 20%, transparent);
		color: var(--color-ivory);
		font-family: var(--font-display);
		font-size: 1.6rem;
		line-height: 1;
		transition:
			background-color 0.5s var(--ease-silk),
			border-color 0.5s var(--ease-silk),
			color 0.5s var(--ease-silk);
	}
	.ctrl:hover {
		background: color-mix(in srgb, var(--color-ivory) 12%, transparent);
		border-color: var(--color-gold);
		color: var(--color-gold);
	}
	.close {
		top: 1.5rem;
		right: 1.5rem;
	}
	@media (min-width: 768px) {
		.close {
			top: 2.5rem;
			right: 2.5rem;
		}
	}
	.close span {
		position: absolute;
		width: 15px;
		height: 1px;
		background: currentColor;
	}
	.close span:first-child {
		transform: rotate(45deg);
	}
	.close span:last-child {
		transform: rotate(-45deg);
	}
	.left {
		left: 1rem;
		top: 50%;
		margin-top: -1.5rem;
	}
	.right {
		right: 1rem;
		top: 50%;
		margin-top: -1.5rem;
	}
	@media (min-width: 768px) {
		.left {
			left: 2rem;
		}
		.right {
			right: 2rem;
		}
	}

	.tally {
		position: absolute;
		bottom: 1.6rem;
		left: 50%;
		transform: translateX(-50%);
		color: color-mix(in srgb, var(--color-ivory) 42%, transparent);
	}
</style>
