<script lang="ts">
	let {
		value = 0,
		suffix = '',
		duration = 1800
	}: { value?: number; suffix?: string; duration?: number } = $props();

	let node: HTMLSpanElement;
	let shown = $state(0);

	$effect(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) {
			shown = value;
			return;
		}

		let frame = 0;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				observer.disconnect();
				const start = performance.now();
				const tick = (now: number) => {
					const t = Math.min((now - start) / duration, 1);
					// ease-out kuartik supaya berhenti dengan lembut
					shown = Math.round(value * (1 - Math.pow(1 - t, 4)));
					if (t < 1) frame = requestAnimationFrame(tick);
				};
				frame = requestAnimationFrame(tick);
			},
			{ threshold: 0.4 }
		);
		observer.observe(node);

		return () => {
			observer.disconnect();
			cancelAnimationFrame(frame);
		};
	});
</script>

<span bind:this={node} class="tabular-nums">{shown}{suffix}</span>
