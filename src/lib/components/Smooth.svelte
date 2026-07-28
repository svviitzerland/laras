<script lang="ts">
	import { startScroll } from '$lib/scroll.svelte';

	let { children } = $props();

	let content = $state<HTMLElement | null>(null);
	let spacer = $state<HTMLElement | null>(null);

	$effect(() => {
		if (!content || !spacer) return;
		return startScroll(content, spacer);
	});
</script>

<div class="viewport">
	<div bind:this={content} class="content">
		{@render children()}
	</div>
</div>

<div bind:this={spacer} aria-hidden="true"></div>

<style>
	.viewport {
		position: fixed;
		inset: 0;
		overflow: hidden;
		z-index: 1;
	}
	.content {
		will-change: transform;
	}
</style>
