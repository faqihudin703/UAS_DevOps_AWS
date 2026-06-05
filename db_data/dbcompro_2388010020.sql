USE dbcompro_2388010020;

-- ─────────────────────────────────────────
-- TABLES
-- ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(150)  NOT NULL UNIQUE,
  password   VARCHAR(255)  NOT NULL,
  role       ENUM('admin','editor') NOT NULL DEFAULT 'editor',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS articles (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  title      VARCHAR(250)  NOT NULL,
  slug       VARCHAR(270)  NOT NULL UNIQUE,
  excerpt    VARCHAR(400)  NOT NULL,
  body       TEXT          NOT NULL,
  category   VARCHAR(80)   NOT NULL DEFAULT 'Umum',
  author_id  INT           NOT NULL,
  published  TINYINT(1)    NOT NULL DEFAULT 1,
  created_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────
-- SEED USERS
-- password untuk semua akun: password123
-- ─────────────────────────────────────────

INSERT INTO users (name, email, password, role) VALUES
  ('Admin Redaksi', 'admin@redaksi.id', '$2b$12$GfDpUl.xCl9oL8J5EzgoBOQzyIKUjfeKBz./VLnyb61Ua.A6MRFxC', 'admin'),
  ('Faqih Editor',  'faqih@redaksi.id', '$2b$12$GfDpUl.xCl9oL8J5EzgoBOQzyIKUjfeKBz./VLnyb61Ua.A6MRFxC', 'editor');

-- ─────────────────────────────────────────
-- SEED ARTICLES
-- ─────────────────────────────────────────

INSERT INTO articles (title, slug, excerpt, body, category, author_id, published) VALUES
(
  'Mengenal Docker Compose untuk Orkestrasi Container',
  'mengenal-docker-compose',
  'Docker Compose memungkinkan kita mendefinisikan dan menjalankan aplikasi multi-container dalam satu file YAML yang terstruktur dan mudah direproduksi.',
  'Docker Compose adalah tool untuk mendefinisikan dan menjalankan aplikasi Docker multi-container. Dengan satu file docker-compose.yml, semua service, network, dan volume dikonfigurasi dalam satu tempat.\n\nKeuntungan utamanya adalah kemudahan mengelola dependensi antar service. Kita dapat memastikan database sudah siap sebelum aplikasi web berjalan, menggunakan kombinasi healthcheck dan depends_on.\n\nDalam konteks deployment ke AWS EC2, Docker Compose mempermudah reproduksi environment yang identik antara mesin lokal dan production — satu file, dua environment, hasil yang sama.',
  'DevOps',
  1,
  1
),
(
  'CI/CD dengan GitHub Actions: Dari Commit ke Production',
  'cicd-github-actions',
  'Implementasi pipeline CI/CD menggunakan GitHub Actions untuk otomatisasi build, push image ke Docker Hub, dan deploy langsung ke AWS EC2.',
  'Continuous Integration dan Continuous Deployment adalah praktik terbaik dalam pengembangan software modern. GitHub Actions menyediakan platform yang terintegrasi langsung dengan repositori, tanpa perlu tool pihak ketiga.\n\nAlur kerja dasar pipeline: trigger pada git push ke branch main, checkout kode, build Docker image, push ke Docker Hub, lalu SSH ke EC2 untuk pull image terbaru dan restart container.\n\nDengan paths filter, pipeline hanya berjalan ketika file yang relevan berubah. Mengubah web statis tidak akan memicu build web dinamis — efisiensi runner maksimal dan waktu deploy lebih cepat.',
  'DevOps',
  1,
  1
),
(
  'Next.js 15 App Router: Server Components dan Cara Kerjanya',
  'nextjs-15-app-router',
  'Memahami perbedaan Server Components dan Client Components di Next.js 15 App Router, serta pola yang tepat untuk masing-masing kasus.',
  'Next.js 15 App Router membawa pendekatan baru dalam membangun aplikasi React. Konsep utamanya adalah Server Components dan Client Components — dua model rendering yang melengkapi satu sama lain.\n\nServer Components dirender di server, tidak mengirim JavaScript ke browser, dan bisa mengakses database atau filesystem secara langsung tanpa API layer. Client Components ditandai dengan directive "use client" di baris pertama — diperlukan untuk interaktivitas seperti event handler, state, dan React hooks.\n\nPola terbaiknya sederhana: buat sebagian besar halaman sebagai Server Components, gunakan Client Components hanya untuk bagian yang membutuhkan interaktivitas. Ini mengoptimalkan ukuran bundle dan waktu load secara signifikan.',
  'Web Dev',
  2,
  1
),
(
  'Keamanan Aplikasi Web: Mengenal OWASP Top 10',
  'owasp-top-10-dasar',
  'Sepuluh kategori kerentanan paling umum pada aplikasi web menurut OWASP, dan bagaimana cara mengantisipasinya sejak tahap pengembangan.',
  'OWASP Top 10 adalah daftar referensi kerentanan keamanan aplikasi web yang paling sering ditemukan dan paling berbahaya. Daftar ini diperbarui secara berkala oleh komunitas keamanan global.\n\nBeberapa kategori yang perlu dipahami setiap developer: Injection (SQL, command), Broken Authentication, Sensitive Data Exposure, dan Security Misconfiguration. Masing-masing punya vektor serangan yang berbeda dan mitigasi yang spesifik.\n\nModSecurity adalah Web Application Firewall open-source yang dapat mendeteksi dan memblokir serangan berdasarkan ruleset OWASP. Mengintegrasikannya di depan aplikasi adalah lapisan pertahanan pertama yang efektif sebelum request sampai ke kode aplikasi.',
  'Security',
  1,
  1
),
(
  'Memahami Arsitektur Blockchain: Dari Node hingga Konsensus',
  'arsitektur-blockchain-dasar',
  'Penjelasan teknis tentang bagaimana jaringan blockchain bekerja — mulai dari struktur node, mekanisme konsensus, hingga cara transaksi divalidasi.',
  'Blockchain pada dasarnya adalah distributed ledger — database yang direplikasi dan disinkronkan di banyak node tanpa otoritas pusat. Setiap node menyimpan salinan penuh dari seluruh riwayat transaksi.\n\nMekanisme konsensus adalah inti dari bagaimana node-node ini sepakat tentang state jaringan. Proof of History pada Solana, misalnya, menggunakan fungsi delay kriptografis untuk membuktikan urutan waktu transaksi secara verifiable — ini yang memungkinkan throughput hingga puluhan ribu transaksi per detik.\n\nUntuk developer yang ingin membangun di atas Solana, memahami bagaimana program (smart contract) berinteraksi dengan account model adalah fondasi yang tidak bisa dilewati.',
  'Blockchain',
  2,
  1
);