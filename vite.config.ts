import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Situs ini dibangun untuk Cloudflare, baik lewat Pages maupun
			// Workers. Hasil build ada di `.svelte-kit/cloudflare`, dan
			// pengaturan untuk Workers ada di `wrangler.jsonc`. Karena seluruh
			// halaman diprarender (lihat `src/routes/+layout.ts`), isinya
			// disajikan sebagai berkas statis dari jaringan Cloudflare.
			// https://svelte.dev/docs/kit/adapter-cloudflare
			adapter: adapter({
				routes: {
					include: ['/*'],
					exclude: ['<all>']
				}
			})
		})
	]
});
