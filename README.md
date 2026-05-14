# TrafficSense AI - Fullstack Web App

Project ini berisi frontend + backend + database PostgreSQL untuk tema **TrafficSense AI Dashboard**.

## Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Express.js
- Database: PostgreSQL
- Migration: node-pg-migrate

## Struktur Folder

```txt
trafficsense-ai-fullstack/
├─ client/   # Frontend React
└─ server/   # Backend Express + PostgreSQL
```

---

## 1. Setup Database PostgreSQL

Buat database di PostgreSQL:

```sql
CREATE DATABASE trafficsense_ai;
```

---

## 2. Setup Backend

Masuk ke folder server:

```bash
cd server
npm install
```

Copy env:

```bash
cp .env.example .env
```

Isi `.env` sesuai database kamu:

```env
PORT=5000
PGUSER=postgres
PGPASSWORD=password_kamu
PGDATABASE=trafficsense_ai
PGHOST=localhost
PGPORT=5432
```

Jalankan migration:

```bash
npm run migrate:up
```

Jalankan backend:

```bash
npm run dev
```

Backend berjalan di:

```txt
http://localhost:5000
```

---

## 3. Setup Frontend

Buka terminal baru, masuk folder client:

```bash
cd client
npm install
```

Copy env:

```bash
cp .env.example .env
```

Jalankan frontend:

```bash
npm run dev
```

Frontend berjalan di:

```txt
http://localhost:5173
```

---

## Endpoint Backend

```txt
GET  /api/health
GET  /api/metrics
GET  /api/intersections
GET  /api/incidents
POST /api/incidents
GET  /api/ai/recommendations
GET  /api/sessions
POST /api/sessions
```

---

## Hosting Rekomendasi

- Frontend: Vercel
- Backend: Render / Railway
- Database: Supabase / Neon / Railway PostgreSQL

Setelah backend di-hosting, ubah `VITE_API_BASE_URL` di frontend menjadi URL backend kamu.
