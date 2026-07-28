import { onResize } from '$lib/scroll.svelte';

type MarkerOptions = {
	/** jeda sebelum baris pertama disapu (ms) */
	delay?: number;
	/** jarak waktu antar baris (ms) */
	step?: number;
};

/**
 * Menyapu teks dengan stabilo, satu baris demi satu baris, ketika paragraf
 * masuk ke layar.
 *
 * Cara kerjanya, teks dipecah menjadi kata, lalu kata kata yang berada pada
 * baris yang sama dikelompokkan ke dalam satu span. Karena tiap span hanya
 * selebar barisnya sendiri, sapuan warnanya berhenti persis di ujung kalimat
 * dan mengikuti tepi teks yang tidak rata.
 */
export function marker(node: HTMLElement, options: MarkerOptions = {}) {
	const source = (node.textContent ?? '').replace(/\s+/g, ' ').trim();
	const delay = options.delay ?? 0;
	const step = options.step ?? 120;

	let observer: IntersectionObserver | null = null;
	let stopResize: (() => void) | null = null;
	let timer = 0;
	let width = 0;

	const paint = () => {
		node.classList.remove('is-lit');

		// tahap satu, setiap kata dibungkus supaya posisinya bisa diukur
		const words = source.split(' ').filter(Boolean);
		const probe = document.createDocumentFragment();
		const cells: HTMLElement[] = [];

		words.forEach((word, i) => {
			const cell = document.createElement('span');
			cell.textContent = word;
			probe.append(cell);
			if (i < words.length - 1) probe.append(document.createTextNode(' '));
			cells.push(cell);
		});
		node.replaceChildren(probe);

		// tahap dua, kata dikelompokkan menurut baris tempatnya berada
		const lines: string[][] = [];
		let previous = Number.NaN;
		for (const cell of cells) {
			const top = cell.offsetTop;
			if (Number.isNaN(previous) || Math.abs(top - previous) > 2) {
				lines.push([]);
				previous = top;
			}
			lines[lines.length - 1].push(cell.textContent ?? '');
		}

		// tahap tiga, tiap baris mendapat satu span berlatar stabilo
		const painted = document.createDocumentFragment();
		lines.forEach((line, i) => {
			const row = document.createElement('span');
			row.className = 'mark-line';
			row.style.setProperty('--mark-delay', `${delay + i * step}ms`);
			row.textContent = line.join(' ');
			painted.append(row);
			if (i < lines.length - 1) painted.append(document.createTextNode(' '));
		});
		node.replaceChildren(painted);
	};

	const watch = () => {
		observer?.disconnect();
		observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					node.classList.add('is-lit');
					observer?.disconnect();
				}
			},
			{ threshold: 0.55 }
		);
		observer.observe(node);
	};

	const build = () => {
		paint();
		watch();
	};

	// susunan baris hanya perlu dihitung ulang kalau lebarnya berubah
	const remeasure = () => {
		const next = node.clientWidth;
		if (next === width) return;
		width = next;
		clearTimeout(timer);
		timer = window.setTimeout(build, 180);
	};

	width = node.clientWidth;
	build();
	stopResize = onResize(remeasure);

	return {
		destroy() {
			observer?.disconnect();
			stopResize?.();
			clearTimeout(timer);
			node.textContent = source;
		}
	};
}
