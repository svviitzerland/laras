<script lang="ts">
	import { profile, facets, stats } from '$lib/data';
	import { reveal } from '$lib/actions/reveal';
	import { panel, parallax } from '$lib/actions/motion';
	import { marker } from '$lib/actions/marker';
	import SectionHeading from './SectionHeading.svelte';
	import Counter from './Counter.svelte';
</script>

<section id="tentang" class="about">
	<!-- efek panel dikenakan pada isinya, bukan pada latar, supaya tepi
	     bagian ini tidak pernah terlihat saat menyusut -->
	<div class="wrap" use:panel={{ depth: 0.05, fade: 0.45 }}>
		<div class="top">
			<div class="heading" use:parallax={{ speed: 46 }}>
				<SectionHeading eyebrow="Tentang" title="Dua bahasa," italic="satu orang." />
			</div>

			<div class="prose">
				<p
					class="lead reveal font-display"
					use:reveal={{ y: '26px' }}
					use:marker={{ delay: 420, step: 420 }}
				>
					{profile.intro}
				</p>

				<div class="columns">
					{#each profile.bio as paragraph, i (i)}
						<p class="reveal" use:reveal={{ delay: 120 + i * 90, y: '22px' }}>{paragraph}</p>
					{/each}
				</div>
			</div>
		</div>

		<div class="numbers">
			{#each stats as stat, i (stat.label)}
				<div class="stat reveal" use:reveal={{ delay: i * 110, y: '26px' }}>
					<span class="value font-display">
						<Counter value={stat.value} suffix={stat.suffix} />
					</span>
					<span class="muted label-caps">{stat.label}</span>
				</div>
			{/each}
		</div>

		<div class="facets">
			{#each facets as facet, i (facet.no)}
				<article class="facet reveal" use:reveal={{ delay: i * 160, y: '42px' }}>
					<span class="no font-display">{facet.no}</span>
					<p class="kind label-caps">{facet.subtitle}</p>
					<h3 class="font-display">{facet.title}</h3>
					<p class="body">{facet.text}</p>
					<ul>
						{#each facet.skills as skill (skill)}
							<li>{skill}</li>
						{/each}
					</ul>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.about {
		position: relative;
		overflow: hidden;
		padding: 8rem 1.5rem;
		background: var(--color-ivory);
	}
	@media (min-width: 768px) {
		.about {
			padding: 11rem 3rem;
		}
	}

	.wrap {
		position: relative;
		max-width: 1500px;
		margin-inline: auto;
	}

	.top {
		display: grid;
		gap: 3.5rem;
	}
	@media (min-width: 1024px) {
		.top {
			grid-template-columns: 0.85fr 1.15fr;
			gap: 6rem;
		}
	}

	.lead {
		font-size: clamp(1.35rem, 2.4vw, 2rem);
		line-height: 1.5;
		font-weight: 300;
		color: color-mix(in srgb, var(--color-ink) 92%, transparent);
	}

	.columns {
		display: grid;
		gap: 1.6rem;
		margin-top: 2.5rem;
	}
	@media (min-width: 768px) {
		.columns {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 2.5rem;
		}
	}
	.columns p {
		font-size: 0.94rem;
		line-height: 1.95;
		color: var(--color-mocha);
	}

	/* empat angka dengan lebar sama dan garis pemisah di antaranya */
	.numbers {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		margin-top: 7rem;
	}
	@media (min-width: 768px) {
		.numbers {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}
	.stat {
		display: grid;
		justify-items: center;
		gap: 1rem;
		padding: 2.6rem 1rem;
		text-align: center;
		border-top: 1px solid var(--color-sand);
	}
	.stat:nth-child(odd) {
		border-right: 1px solid var(--color-sand);
	}
	@media (min-width: 768px) {
		.stat {
			border-right: 1px solid var(--color-sand);
		}
		.stat:last-child {
			border-right: 0;
		}
	}
	.value {
		font-size: clamp(2.3rem, 4.6vw, 3.4rem);
		line-height: 1;
		font-weight: 300;
	}
	.muted {
		color: var(--color-mocha);
	}

	/* dua kartu setinggi sama tanpa kotak yang tegas */
	.facets {
		display: grid;
		gap: 0;
		margin-top: 6rem;
	}
	@media (min-width: 900px) {
		.facets {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	.facet {
		position: relative;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		padding: 3rem 0 3.5rem;
		border-top: 1px solid var(--color-sand);
		transition: background-color 0.9s var(--ease-silk);
	}
	@media (min-width: 900px) {
		.facet {
			padding: 3.5rem 3rem 4rem;
		}
		.facet:first-child {
			padding-left: 0;
			border-right: 1px solid var(--color-sand);
		}
		.facet:last-child {
			padding-right: 0;
		}
	}
	.facet::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			160deg,
			color-mix(in srgb, var(--color-blush) 48%, transparent),
			transparent 58%
		);
		opacity: 0;
		transition: opacity 0.9s var(--ease-silk);
	}
	.facet:hover::before {
		opacity: 1;
	}
	.facet > *:not(.no) {
		position: relative;
	}

	.no {
		position: absolute;
		top: 2.6rem;
		right: 0;
		z-index: 1;
		font-size: 3.4rem;
		color: color-mix(in srgb, var(--color-sand) 90%, transparent);
		transition: color 0.7s var(--ease-silk);
	}
	.facet:hover .no {
		color: var(--color-blush);
	}

	.kind {
		color: var(--color-rose);
		margin-bottom: 1.2rem;
	}
	.facet h3 {
		font-size: clamp(1.7rem, 3.2vw, 2.4rem);
		line-height: 1.15;
		margin-bottom: 1.2rem;
	}
	.body {
		max-width: 30rem;
		font-size: 0.94rem;
		line-height: 1.95;
		color: var(--color-mocha);
	}
	.facet ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		margin-top: auto;
		padding-top: 2.4rem;
	}
	.facet li {
		padding: 0.45rem 1.1rem;
		border: 1px solid var(--color-sand);
		border-radius: 999px;
		font-size: 0.72rem;
		letter-spacing: 0.06em;
		color: var(--color-mocha);
		transition: border-color 0.7s var(--ease-silk);
	}
	.facet:hover li {
		border-color: color-mix(in srgb, var(--color-rose) 45%, transparent);
	}
</style>
