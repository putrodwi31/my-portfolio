# Putro Dwi Mulyo Portfolio

Portfolio pribadi berbasis `Next.js`, `Prisma`, dan `SQLite`.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- SQLite

## Development

```bash
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

## Production Dengan Docker Compose

1. Copy file environment:

```bash
cp .env.production.example .env.production
```

2. Isi nilai secret dan kredensial admin di `.env.production`.

3. Jalankan container:

```bash
docker compose --env-file .env.production up -d --build
```

Aplikasi akan:

- menerima trafik publik langsung ke service `app`
- menyimpan database SQLite di volume Docker `/app/data`
- menyimpan upload file di volume Docker `/app/public/uploads`
- menjalankan `prisma db push` otomatis saat container start
- bisa menjalankan seed satu kali saat deploy awal (`RUN_DB_SEED_ONCE=true`)
- bisa menjalankan seed paksa tiap start jika `RUN_DB_SEED=true` (tidak disarankan untuk production)

Catatan:

- `RUN_DB_SEED` default `false` karena seed saat ini bersifat destruktif untuk sebagian data konten.
- Jangan commit `.env.production` atau file `.db` ke Git.

## GitHub Actions Deployment

Workflow ada di `.github/workflows/deploy.yml` dan akan deploy saat push ke branch `main` atau saat dijalankan manual.

Secrets yang harus dibuat di GitHub repository:

- `SERVER_HOST`
- `SERVER_PORT`
- `SERVER_USER`
- `SERVER_SSH_KEY`
- `SERVER_APP_DIR`
- `PRODUCTION_ENV_FILE`

Isi `PRODUCTION_ENV_FILE` adalah isi penuh file `.env.production`, contoh:

```env
DATABASE_URL="file:/app/data/prod.db"
JWT_SECRET="replace-with-a-long-random-secret"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="change-this-admin-password"
NEXT_PUBLIC_TURNSTILE_SITE_KEY="your-turnstile-site-key"
TURNSTILE_SECRET_KEY="your-turnstile-secret-key"
CONTACT_FORM_ENDPOINT="https://formspree.io/f/xkovdzvp"
APP_BIND=0.0.0.0
APP_PORT=3000
RUN_DB_PUSH_ON_START=true
RUN_DB_SEED_ONCE=true
RUN_DB_SEED=false
```

`APP_BIND=0.0.0.0` membuat port aplikasi terbuka dari luar server.

`RUN_DB_SEED_ONCE=true` akan seed hanya sekali per volume database. Marker file default ada di `/app/data/.seeded`.

Captcha contact form memakai Cloudflare Turnstile. Isi `NEXT_PUBLIC_TURNSTILE_SITE_KEY` dan `TURNSTILE_SECRET_KEY` agar proteksi spam aktif.

Security headers default (diatur di Next.js):

- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Resource-Policy: same-site`

Prasyarat di server:

- Docker Engine terpasang
- Docker Compose plugin tersedia (`docker compose`)
- user SSH punya izin menjalankan Docker
- folder target untuk `SERVER_APP_DIR` bisa ditulis

## Struktur Penting

```text
app/                  # Next.js app router
components/           # komponen UI
lib/                  # auth, prisma, helpers
prisma/               # schema dan seed
scripts/              # entrypoint container dan deploy helper
docker-compose.yml    # runtime production
Dockerfile            # image build
```
