/**
 * Semua isi situs ada di file ini, jadi cukup ubah teks dan foto di sini.
 *
 * Foto galeri disimpan di `static/gallery/` lalu ditulis sebagai
 * `/gallery/nama-berkas.jpg` pada properti `src`.
 */

export const profile = {
	name: 'Larasati Putri Maharani',
	shortName: 'Larasati',
	/** dipakai sebagai monogram di navigasi */
	initials: 'Laras',
	role: 'IT Enthusiast dan Master of Ceremony',
	intro:
		'Saya menjalani dua bidang sekaligus, teknologi informasi dan pembawa acara. Keduanya menuntut hal yang sama, persiapan yang rapi dan kemampuan membaca situasi.',
	bio: [
		'Berlatar pendidikan teknologi informasi, saya terbiasa membedah masalah menjadi bagian kecil yang bisa diselesaikan satu per satu. Kebiasaan itu ternyata sama bergunanya ketika menyusun rundown acara.',
		'Di atas panggung saya menemukan sisi lain dari diri saya. Menjadi MC bukan sekadar membaca susunan acara, tapi menjaga tempo, mencairkan jeda, dan memastikan setiap orang di ruangan merasa dilibatkan.',
		'Sampai hari ini saya menikmati keduanya. Menutup laptop setelah rilis fitur, lalu berdiri di depan mikrofon keesokan harinya.'
	],
	email: 'halo@larasati.id',
	socials: [
		{ label: 'Instagram', href: 'https://instagram.com/' },
		{ label: 'LinkedIn', href: 'https://linkedin.com/in/' },
		{ label: 'GitHub', href: 'https://github.com/' }
	]
};

export const stats = [
	{ value: 60, suffix: '+', label: 'Acara dibawakan' },
	{ value: 5, suffix: ' thn', label: 'Jam terbang panggung' },
	{ value: 20, suffix: '+', label: 'Proyek dan kolaborasi' },
	{ value: 12, suffix: 'k', label: 'Total audiens' }
];

export const tickerWords = [
	'Master of Ceremony',
	'Public Speaking',
	'Front End Development',
	'UI dan UX',
	'Moderator',
	'Event Host',
	'Data dan Analitik',
	'Voice Over'
];

/** Dua sisi profesi yang ditampilkan berdampingan. */
export const facets = [
	{
		no: '01',
		title: 'Di Balik Layar',
		subtitle: 'Teknologi',
		text: 'Merancang dan membangun antarmuka yang rapi, cepat, dan enak dipakai. Terbiasa bekerja bersama tim lintas peran, dari desainer sampai pemangku kepentingan.',
		skills: ['JavaScript', 'TypeScript', 'Svelte dan React', 'UI Engineering', 'Figma', 'SQL']
	},
	{
		no: '02',
		title: 'Di Atas Panggung',
		subtitle: 'Panggung dan Suara',
		text: 'Membawakan acara formal maupun santai, mulai dari seminar kampus, gelar wicara, wisuda, sampai peluncuran produk. Naskah disusun sendiri dan gaya dibawa menyesuaikan karakter acara.',
		skills: [
			'Formal dan Semi Formal',
			'Dwibahasa',
			'Moderator Diskusi',
			'Penulisan Naskah',
			'Improvisasi',
			'Voice Over'
		]
	}
];

export type GalleryItem = {
	id: string;
	no: string;
	title: string;
	event: string;
	role: string;
	venue: string;
	year: string;
	audience: string;
	note: string;
	src: string;
	shape: 'portrait' | 'landscape' | 'square';
};

export const gallery: GalleryItem[] = [
	{
		id: 'g1',
		no: 'I',
		title: 'Panggung Pertama Tahun Ini',
		event: 'Tech Summit Nasional',
		role: 'Master of Ceremony',
		venue: 'Balai Sidang, Jakarta',
		year: '2025',
		audience: '1.200 audiens',
		note: 'Membuka rangkaian acara dua hari dan memandu sesi utama bersama tiga pembicara internasional.',
		src: '/gallery/01.svg',
		shape: 'portrait'
	},
	{
		id: 'g2',
		no: 'II',
		title: 'Suara di Ruang Diskusi',
		event: 'Seminar Perempuan dan Teknologi',
		role: 'Moderator',
		venue: 'Auditorium Kampus',
		year: '2025',
		audience: '400 audiens',
		note: 'Memandu diskusi panel tentang keterwakilan perempuan di industri teknologi.',
		src: '/gallery/02.svg',
		shape: 'landscape'
	},
	{
		id: 'g3',
		no: 'III',
		title: 'Malam Penghargaan',
		event: 'Anugerah Inovasi Mahasiswa',
		role: 'Master of Ceremony',
		venue: 'Grand Ballroom',
		year: '2024',
		audience: '800 audiens',
		note: 'Acara semi formal dwibahasa dengan susunan acara yang berubah di menit terakhir.',
		src: '/gallery/03.svg',
		shape: 'portrait'
	},
	{
		id: 'g4',
		no: 'IV',
		title: 'Peluncuran Produk',
		event: 'Product Launch Startup Lokal',
		role: 'Host',
		venue: 'Creative Hub',
		year: '2024',
		audience: '250 audiens',
		note: 'Memandu demo produk sekaligus sesi tanya jawab langsung dengan tim pengembang.',
		src: '/gallery/04.svg',
		shape: 'square'
	},
	{
		id: 'g5',
		no: 'V',
		title: 'Pagi di Wisuda',
		event: 'Upacara Wisuda',
		role: 'Master of Ceremony',
		venue: 'Gedung Serba Guna',
		year: '2024',
		audience: '2.000 audiens',
		note: 'Acara paling formal yang pernah saya bawakan, dengan protokol yang sangat ketat.',
		src: '/gallery/05.svg',
		shape: 'landscape'
	},
	{
		id: 'g6',
		no: 'VI',
		title: 'Kelas Berbagi',
		event: 'Workshop Public Speaking',
		role: 'Pembicara',
		venue: 'Ruang Kelas Bersama',
		year: '2023',
		audience: '120 peserta',
		note: 'Berbagi cara menyusun pembukaan yang tidak membosankan dalam tiga puluh detik pertama.',
		src: '/gallery/06.svg',
		shape: 'portrait'
	},
	{
		id: 'g7',
		no: 'VII',
		title: 'Panggung Terbuka',
		event: 'Festival Musik Kampus',
		role: 'Stage Host',
		venue: 'Lapangan Utama',
		year: '2023',
		audience: '3.000 audiens',
		note: 'Menjaga tempo panggung terbuka selama enam jam di bawah cuaca yang tidak bisa ditebak.',
		src: '/gallery/07.svg',
		shape: 'square'
	},
	{
		id: 'g8',
		no: 'VIII',
		title: 'Studio Kecil',
		event: 'Siniar dan Voice Over',
		role: 'Pengisi Suara',
		venue: 'Studio Rekaman',
		year: '2023',
		audience: 'Sesi rekaman',
		note: 'Proyek pengisian suara untuk video profil perusahaan dan siniar kampus.',
		src: '/gallery/08.svg',
		shape: 'landscape'
	}
];

export const timeline = [
	{
		year: '2025',
		title: 'Master of Ceremony di Tech Summit Nasional',
		text: 'Memandu acara utama dua hari untuk lebih dari seribu peserta.'
	},
	{
		year: '2024',
		title: 'Front End Developer pada proyek kolaborasi',
		text: 'Membangun antarmuka aplikasi internal bersama tim lintas jurusan.'
	},
	{
		year: '2024',
		title: 'Moderator rangkaian seminar kampus',
		text: 'Menjadi moderator tetap untuk enam sesi gelar wicara sepanjang tahun.'
	},
	{
		year: '2023',
		title: 'Fasilitator workshop public speaking',
		text: 'Merancang materi pelatihan berbicara di depan umum untuk mahasiswa baru.'
	},
	{
		year: '2022',
		title: 'Langkah pertama di atas panggung',
		text: 'Membawakan acara internal himpunan, awal dari semuanya.'
	}
];

/** Bagian halaman untuk navigasi dan penanda gulir. */
export const sections = [
	{ id: 'atas', label: 'Beranda' },
	{ id: 'tentang', label: 'Tentang' },
	{ id: 'galeri', label: 'Galeri' },
	{ id: 'jejak', label: 'Pengalaman' },
	{ id: 'kontak', label: 'Kontak' }
];
