USE dbcompro_2388010020;

-- Users
CREATE TABLE IF NOT EXISTS users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(150)  NOT NULL UNIQUE,
  password   VARCHAR(255)  NOT NULL,
  role       ENUM('admin','editor') NOT NULL DEFAULT 'editor',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Articles
CREATE TABLE IF NOT EXISTS articles (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  title      VARCHAR(250)  NOT NULL,
  slug       VARCHAR(270)  NOT NULL UNIQUE,
  excerpt    VARCHAR(400)  NOT NULL,
  body       TEXT          NOT NULL,
  category   VARCHAR(80)   NOT NULL DEFAULT 'Umum',
  author_id  INT           NOT NULL,
  published  TINYINT(1)    NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Seed: password = "password123"
INSERT INTO users (name, email, password, role) VALUES
  ('Admin Redaksi', 'admin@redaksi.id', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQyCgKCFw.9e8KCsZj.WaJJoa', 'admin'),
  ('Faqih Editor',  'faqih@redaksi.id', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQyCgKCFw.9e8KCsZj.WaJJoa', 'editor');

INSERT INTO articles (title, slug, excerpt, body, category, author_id) VALUES
(
  'Mengenal Docker Compose untuk Orkestrasi Container',
  'mengenal-docker-compose',
  'Docker Compose memungkinkan kita mendefinisikan dan menjalankan aplikasi multi-container dalam satu file YAML yang terstruktur.',
  'Docker Compose adalah tool untuk mendefinisikan dan menjalankan aplikasi Docker multi-container. Dengan file docker-compose.yml, semua service, network, dan volume dikonfigurasi dalam satu tempat.\n\nKeuntungan utamanya adalah kemudahan mengelola dependensi antar service. Kita dapat memastikan database siap sebelum aplikasi berjalan menggunakan healthcheck dan depends_on.\n\nDalam konteks deployment ke AWS EC2, Docker Compose mempermudah reproduksi environment yang identik antara lokal dan production.',
  'DevOps',
  1
),
(
  'CI/CD dengan GitHub Actions: Dari Commit ke Production',
  'cicd-github-actions',
  'Implementasi pipeline CI/CD menggunakan GitHub Actions untuk otomatisasi build, push image ke Docker Hub, dan deploy ke AWS EC2.',
  'Continuous Integration dan Continuous Deployment adalah praktik terbaik dalam pengembangan software modern. GitHub Actions menyediakan platform terintegrasi langsung dengan repositori GitHub.\n\nAlur kerja pipeline: trigger git push, checkout kode, build Docker image, push ke Docker Hub, lalu SSH ke server untuk pull image terbaru dan restart container.\n\nDengan paths filter, pipeline hanya berjalan ketika file yang relevan berubah — menghemat waktu dan resource runner.',
  'DevOps',
  1
),
(
  'Next.js App Router: Server dan Client Components',
  'nextjs-app-router',
  'Memahami perbedaan Server Components dan Client Components di Next.js 14 App Router serta kapan menggunakan masing-masing.',
  'Next.js 14 App Router membawa konsep Server Components dan Client Components. Server Components dirender di server, tidak mengirim JavaScript ke client, dan dapat mengakses database langsung.\n\nClient Components ditandai directive "use client" di baris pertama file — diperlukan untuk event handler dan React hooks.\n\nPola terbaik: buat sebagian besar komponen sebagai Server Components, gunakan Client Components hanya untuk interaktivitas. Ini mengoptimalkan performa dan bundle size.',
  'Web Dev',
  2
);
