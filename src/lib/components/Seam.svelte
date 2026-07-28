<script lang="ts">
	/**
	 * Sambungan antar bagian. Warna bagian berikutnya naik dalam bentuk
	 * lengkungan lebar, jadi peralihannya terasa seperti gelombang tenang
	 * dan bukan garis mendatar.
	 */
	let {
		from = 'var(--color-ivory)',
		to = 'var(--color-ivory)',
		height = '18vh'
	}: { from?: string; to?: string; height?: string } = $props();
</script>

<div class="seam" style:height style:background={from} aria-hidden="true">
	<span class="swell" style:background={to}></span>
	<span class="line"></span>
</div>

<style>
	.seam {
		position: relative;
		width: 100%;
		overflow: hidden;
		pointer-events: none;
	}

	/* lengkungan lebar dan landai */
	.swell {
		position: absolute;
		inset: 45% -12% -2% -12%;
		border-radius: 50% 50% 0 0 / 100% 100% 0 0;
	}

	/* satu garis rambut mengikuti puncak lengkungan */
	.line {
		position: absolute;
		inset: calc(45% - 0.6rem) -12% auto -12%;
		height: 60%;
		border-top: 1px solid color-mix(in srgb, var(--color-rose) 22%, transparent);
		border-radius: 50% 50% 0 0 / 100% 100% 0 0;
	}
</style>
