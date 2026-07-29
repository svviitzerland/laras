/**
 * Semua isi situs ada di file ini, jadi cukup ubah teks dan foto di sini.
 *
 * Isinya disusun dari profil resmi Larasati. Angka angka yang dipakai juga
 * diambil apa adanya dari sana, bukan karangan, supaya tetap bisa
 * dipertanggungjawabkan kalau ada yang bertanya.
 *
 * Foto galeri disimpan di `static/gallery/` lalu ditulis sebagai
 * `/gallery/nama-berkas.jpg` pada properti `src`.
 */

export const profile = {
	name: 'Larasati Putri Maharani',
	shortName: 'Larasati',
	/** dipakai sebagai monogram di navigasi */
	initials: 'Laras',
	role: 'Mahasiswa Teknologi Informasi dan Master of Ceremony',
	location: 'Bandung, Jawa Barat',
	intro:
		'Saya belajar Teknologi Informasi di Telkom University, mengajar algoritma pemrograman sebagai asisten dosen, dan berdiri di depan mikrofon ketika himpunan punya acara. Ketiganya menuntut hal yang sama, persiapan yang rapi dan kemampuan membaca ruangan.',
	bio: [
		'Sejak Januari 2025 saya menjadi asisten dosen Algoritma Pemrograman di Universitas Telkom, mendampingi lebih dari empat puluh mahasiswa setiap semester. Sebelumnya saya asisten praktikum untuk mata kuliah yang sama, menemani mereka membedah logika dan menelusuri kesalahan kode baris demi baris.',
		'Di Himpunan Mahasiswa Teknologi Informasi saya bekerja di Divisi Hubungan Masyarakat. Dari sana saya memimpin program Bina Desa yang melibatkan sekitar seratus lima puluh peserta, menjadi Sekretaris I kaderisasi PROXIMITI untuk dua ratus mahasiswa, dan membawakan sekitar lima acara resmi sebagai pembawa acara.',
		'Kebiasaan berdiri di depan orang banyak sudah dimulai jauh sebelum kuliah, dari Ketua OSIS di SMKN 1 Abang sampai Forum Genre Provinsi Bali. Latar multimedia dan pengalaman sebagai desainer grafis membuat saya terbiasa memikirkan dua hal sekaligus, isi acaranya dan bagaimana ia terlihat.'
	],
	email: 'larasati.puan@gmail.com',
	socials: [
		{ label: 'Instagram', href: 'https://www.instagram.com/larasati.puan/' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/larasatimaharani' },
		{ label: 'GitHub', href: 'https://github.com/larasatiPuan' }
	]
};

export const stats = [
	{ value: 40, suffix: '+', label: 'Mahasiswa dibimbing tiap semester' },
	{ value: 200, suffix: '', label: 'Peserta kaderisasi PROXIMITI' },
	{ value: 150, suffix: '', label: 'Peserta program Bina Desa' },
	{ value: 5, suffix: '', label: 'Acara resmi dibawakan' }
];

export const tickerWords = [
	'Master of Ceremony',
	'Asisten Dosen',
	'Algoritma Pemrograman',
	'Java',
	'Public Relations',
	'Pengembangan Web',
	'Desain Grafis',
	'Public Speaking'
];

/** Dua sisi profesi yang ditampilkan berdampingan. */
export const facets = [
	{
		no: '01',
		title: 'Di Balik Layar',
		subtitle: 'Teknologi',
		text: 'Mengajarkan logika pemrograman kepada mahasiswa, menelusuri kesalahan kode bersama mereka, dan menilai hasil praktikum. Di luar kelas, saya belajar pengembangan web dan sistem tertanam.',
		skills: [
			'Java',
			'Algoritma dan Struktur Data',
			'Pengembangan Web',
			'Sistem Tertanam',
			'Desain Grafis',
			'Multimedia'
		]
	},
	{
		no: '02',
		title: 'Di Atas Panggung',
		subtitle: 'Panggung dan Suara',
		text: 'Membawakan acara resmi himpunan, memimpin program pengabdian di desa, dan mengurus kaderisasi ratusan mahasiswa baru. Semuanya berawal dari satu kebiasaan, berani memegang mikrofon.',
		skills: [
			'Master of Ceremony',
			'Public Speaking',
			'Hubungan Masyarakat',
			'Manajemen Acara',
			'Kaderisasi',
			'Liaison Officer'
		]
	}
];

/**
 * Kumpulan kalimat untuk bagian sorot bergaya koran. Kalimat kalimat ini
 * diacak lalu diganti dengan tempo cepat sebagai latar, sementara nama
 * Laras di tengah layar tetap diam.
 */
export const paperLines = [
	'Empat puluh mahasiswa duduk menunggu sesi responsi dimulai pada sore itu.',
	'Logika pemrograman dibedah pelan pelan sampai semua orang paham alurnya.',
	'Kesalahan kode ditelusuri baris demi baris hingga penyebabnya ketemu.',
	'Empat belas jurnal praktikum diperiksa satu per satu sebelum tenggat.',
	'Seratus lima puluh peserta hadir dalam program Bina Desa di Pasir Endah.',
	'Dua ratus mahasiswa baru dikawal melewati rangkaian kaderisasi.',
	'Mikrofon dinyalakan, susunan acara dibaca ulang, lalu ruangan menyimak.',
	'Rundown berubah di menit terakhir dan tidak ada tamu yang menyadarinya.',
	'Divisi hubungan masyarakat menyiapkan setiap detail acara resmi himpunan.',
	'Antarmuka yang rapi lahir dari persiapan yang sama telitinya dengan rundown.',
	'Java dipakai untuk menjelaskan konsep yang tadinya terasa berat.',
	'Desain poster dikerjakan malam hari, presentasi dibawakan keesokan paginya.',
	'Ketua OSIS belajar berbicara di depan ratusan siswa sejak bangku sekolah.',
	'Forum Genre mengajarkan cara menyampaikan pesan agar benar benar sampai.',
	'Sistem tertanam dipelajari bersama teman teman satu kelompok studi.',
	'Kesan pertama dibangun dalam tiga puluh detik yang pertama.',
	'Setiap ruangan punya karakter sendiri dan harus dibaca lebih dulu.',
	'Pembukaan yang ringkas ternyata lebih diingat daripada sambutan panjang.',
	'Bandung menjadi tempat semua kebiasaan itu bertemu dalam satu jadwal.',
	'Acara berjalan sesuai rencana karena setiap kemungkinan sudah disiapkan.'
];

/**
 * Kalimat yang memuat nama Laras. Salah satunya dipilih untuk baris tengah,
 * lalu barisnya digeser sampai nama itu jatuh tepat di titik tengah layar.
 *
 * Syaratnya satu, tiap kalimat harus memuat kata Laras persis sekali.
 */
export const paperNameLines = [
	'Empat puluh mahasiswa tiap semester belajar algoritma bersama Laras di kelas responsi.',
	'Himpunan menyerahkan mikrofon kepada Laras ketika acara resmi harus dibuka.',
	'Program Bina Desa dengan seratus lima puluh peserta dipimpin oleh Laras sebagai ketua.',
	'Dua ratus mahasiswa baru dikawal Laras melewati rangkaian kaderisasi PROXIMITI.',
	'Di daftar asisten dosen Algoritma Pemrograman, nama Laras sudah tercatat sejak 2025.'
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
		title: 'Merajut Asa Teknologi',
		event: 'Bina Desa, HMTI Telkom University',
		role: 'Ketua Pelaksana',
		venue: 'Kelurahan Pasir Endah, Bandung',
		year: '2025',
		audience: '150 peserta',
		note: 'Memimpin program pengabdian yang membawa pengenalan teknologi langsung ke warga desa, dari penyusunan konsep sampai hari pelaksanaan.',
		src: '/gallery/01.svg',
		shape: 'portrait'
	},
	{
		id: 'g2',
		no: 'II',
		title: 'Kaderisasi Dua Ratus Wajah Baru',
		event: 'PROXIMITI 2025',
		role: 'Sekretaris I',
		venue: 'Telkom University',
		year: '2025',
		audience: '200 mahasiswa',
		note: 'Menyusun administrasi dan alur kaderisasi untuk mahasiswa angkatan 2024, sekaligus menjaga rangkaian acaranya tetap berjalan sesuai rencana.',
		src: '/gallery/02.svg',
		shape: 'landscape'
	},
	{
		id: 'g3',
		no: 'III',
		title: 'Di Depan Mikrofon Himpunan',
		event: 'Acara Resmi HMTI Telkom University',
		role: 'Master of Ceremony',
		venue: 'Telkom University',
		year: '2025',
		audience: '5 acara resmi',
		note: 'Membawakan acara resmi himpunan sekaligus mewakili organisasi, dari pembukaan program sampai sesi penutupan.',
		src: '/gallery/03.svg',
		shape: 'portrait'
	},
	{
		id: 'g4',
		no: 'IV',
		title: 'Kelas Responsi Sore Hari',
		event: 'Asisten Dosen Algoritma Pemrograman',
		role: 'Asisten Dosen',
		venue: 'Universitas Telkom',
		year: '2025',
		audience: '40+ mahasiswa',
		note: 'Menemani mahasiswa memahami logika pemrograman lewat sesi responsi tambahan, lalu memeriksa tugas dan hasil praktikum mereka.',
		src: '/gallery/04.svg',
		shape: 'square'
	},
	{
		id: 'g5',
		no: 'V',
		title: 'Menelusuri Kesalahan Kode',
		event: 'Praktikum Algoritma Pemrograman',
		role: 'Asisten Praktikum',
		venue: 'Informatics Laboratory',
		year: '2024',
		audience: '14 modul jurnal',
		note: 'Mendampingi lebih dari empat puluh mahasiswa menyelesaikan modul terbimbing dan membantu mencari sumber kesalahan di setiap sesi.',
		src: '/gallery/05.svg',
		shape: 'landscape'
	},
	{
		id: 'g6',
		no: 'VI',
		title: 'Penyambut Mahasiswa Baru',
		event: 'PKKMB X Megabit 7.0',
		role: 'Liaison Officer',
		venue: 'Telkom University',
		year: '2024',
		audience: 'Mahasiswa baru',
		note: 'Menjadi penghubung antara panitia dan peserta selama rangkaian pengenalan kampus berlangsung.',
		src: '/gallery/06.svg',
		shape: 'portrait'
	},
	{
		id: 'g7',
		no: 'VII',
		title: 'Belajar Membangun Halaman',
		event: 'GDSC Mini Bootcamp Website Development',
		role: 'Peserta',
		venue: 'GDSC Telkom University',
		year: '2024',
		audience: 'Pelatihan intensif',
		note: 'Mendalami dasar pengembangan web, praktik merancang antarmuka, dan penerapan teknologi frontend masa kini.',
		src: '/gallery/07.svg',
		shape: 'square'
	},
	{
		id: 'g8',
		no: 'VIII',
		title: 'Suara dari Bali',
		event: 'Forum Genre Provinsi Bali',
		role: 'Divisi Komunikasi dan Informasi',
		venue: 'Bali',
		year: '2021',
		audience: '2 tahun',
		note: 'Menyusun dan menyampaikan pesan edukasi untuk remaja, kebiasaan awal yang kemudian terbawa sampai ke panggung kampus.',
		src: '/gallery/08.svg',
		shape: 'landscape'
	}
];

export const timeline = [
	{
		year: '2025',
		title: 'Asisten Dosen Algoritma Pemrograman',
		text: 'Universitas Telkom. Membimbing lebih dari empat puluh mahasiswa tiap semester lewat kelas responsi, lalu menilai tugas dan hasil praktikum mereka.'
	},
	{
		year: '2025',
		title: 'Divisi Hubungan Masyarakat HMTI',
		text: 'Ketua pelaksana Bina Desa untuk seratus lima puluh peserta, Sekretaris I PROXIMITI untuk dua ratus mahasiswa, sekaligus pembawa acara di lima acara resmi.'
	},
	{
		year: '2024',
		title: 'Asisten Praktikum dan Liaison Officer',
		text: 'Mendampingi praktikum Algoritma Pemrograman di Informatics Laboratory, dan menjadi penghubung peserta pada PKKMB X Megabit 7.0.'
	},
	{
		year: '2024',
		title: 'Kelompok Studi Hardware and Embedded System',
		text: 'Mendalami sistem tertanam bersama kelompok studi, melengkapi sisi perangkat keras dari ilmu yang dipelajari di kelas.'
	},
	{
		year: '2023',
		title: 'Mulai kuliah dan bergabung dengan GDSC',
		text: 'Masuk Teknologi Informasi Telkom University, lalu mengikuti bootcamp pengembangan web di Google Developer Student Club.'
	},
	{
		year: '2022',
		title: 'Ketua OSIS SMKN 1 Abang',
		text: 'Memimpin organisasi siswa selama satu tahun setelah sebelumnya menjadi wakil ketua, sambil bekerja sebagai desainer grafis di Oka Print.'
	},
	{
		year: '2021',
		title: 'Forum Genre Bali dan PIK-R',
		text: 'Mengurus komunikasi, informasi, dan edukasi untuk remaja di tingkat kabupaten dan provinsi selama dua tahun.'
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
