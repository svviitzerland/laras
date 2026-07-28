// Seluruh isi situs bersifat statis, jadi halaman diprarender saat build.
// Di Cloudflare Pages hasilnya disajikan langsung dari jaringan tepi
// tanpa perlu menjalankan worker untuk tiap permintaan.
export const prerender = true;
export const ssr = true;
