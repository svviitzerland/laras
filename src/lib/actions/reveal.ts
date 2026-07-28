type RevealOptions = {
	/** jeda sebelum animasi mulai (ms) */
	delay?: number;
	/** geser vertikal awal, mis. '40px' */
	y?: string;
	/** geser horizontal awal */
	x?: string;
	/** skala awal */
	scale?: number;
	/** blur awal dalam px */
	blur?: number;
	/** berapa bagian elemen yang harus terlihat (0–1) */
	threshold?: number;
	/** ulangi animasi tiap kali elemen keluar-masuk layar */
	repeat?: boolean;
};

/**
 * Menambahkan kelas `is-in` saat elemen masuk viewport.
 * Gaya transisinya sendiri ada di layout.css (`.reveal`, `.line-mask`, `.rule-grow`).
 */
export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	let observer: IntersectionObserver | null = null;

	const apply = (o: RevealOptions) => {
		node.style.setProperty('--rv-delay', `${o.delay ?? 0}ms`);
		if (o.y !== undefined) node.style.setProperty('--rv-y', o.y);
		if (o.x !== undefined) node.style.setProperty('--rv-x', o.x);
		if (o.scale !== undefined) node.style.setProperty('--rv-s', String(o.scale));
		if (o.blur !== undefined) node.style.setProperty('--rv-blur', `${o.blur}px`);
	};

	const observe = (o: RevealOptions) => {
		observer?.disconnect();
		observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						node.classList.add('is-in');
						if (!o.repeat) observer?.disconnect();
					} else if (o.repeat) {
						node.classList.remove('is-in');
					}
				}
			},
			{ threshold: o.threshold ?? 0.15, rootMargin: '0px 0px -8% 0px' }
		);
		observer.observe(node);
	};

	apply(options);
	observe(options);

	return {
		update(next: RevealOptions = {}) {
			apply(next);
			observe(next);
		},
		destroy() {
			observer?.disconnect();
		}
	};
}
