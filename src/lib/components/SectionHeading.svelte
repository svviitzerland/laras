<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	let {
		eyebrow = '',
		title = '',
		italic = '',
		align = 'left',
		tone = 'light'
	}: {
		eyebrow?: string;
		title?: string;
		italic?: string;
		align?: 'left' | 'center';
		tone?: 'light' | 'dark';
	} = $props();
</script>

<div class={align === 'center' ? 'text-center' : ''}>
	<div
		class="reveal mb-6 flex items-center gap-4 {align === 'center' ? 'justify-center' : ''}"
		use:reveal={{ y: '12px', blur: 0 }}
	>
		<span class="h-px w-10 {tone === 'dark' ? 'bg-gold/70' : 'bg-rose/70'}"></span>
		<span class="label-caps {tone === 'dark' ? 'text-gold/90' : 'text-mocha'}">{eyebrow}</span>
		{#if align === 'center'}
			<span class="h-px w-10 {tone === 'dark' ? 'bg-gold/70' : 'bg-rose/70'}"></span>
		{/if}
	</div>

	<h2
		class="font-display text-[clamp(2.2rem,5.4vw,4.2rem)] leading-[1.05] font-light {tone === 'dark'
			? 'text-ivory'
			: 'text-ink'}"
		use:reveal={{ y: '0px', blur: 0 }}
	>
		<span class="line-mask"><span>{title}</span></span>
		{#if italic}
			<span class="line-mask" style="--rv-delay:140ms">
				<span class="{tone === 'dark' ? 'text-gold' : 'text-rose'} italic">{italic}</span>
			</span>
		{/if}
	</h2>
</div>
