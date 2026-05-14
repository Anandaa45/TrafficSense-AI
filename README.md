# TrafficSense AI Fullstack

Project ini dibuat berdasarkan referensi desain Figma/screenshot yang kamu kirim, dengan stack:

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Express.js
- **Database:** PostgreSQL
- **Migration:** node-pg-migrate

## Fitur halaman

- Welcome / landing page
- Register
- Login
- Dashboard
- Traffic Monitor
- Analytics
- Reports
- Settings
- Profile

## Cara menjalankan

### 1) Buat database PostgreSQL

```sql
CREATE DATABASE trafficsense_ai;
```

### 2) Jalankan backend

```bash
cd server
npm install
cp .env.example .env
npm run migrate:up
npm run dev
```

### 3) Jalankan frontend

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Frontend default berjalan di:

```text
http://localhost:5173
```

Backend default berjalan di:

```text
http://localhost:5000
```

## Akun demo

Setelah migration berhasil, akun demo yang tersedia:

```text
Email    : admin@gmail.com
Password : admin12345
```

## Endpoint utama

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/overview`
- `GET /api/monitor/cameras`
- `GET /api/analytics`
- `GET /api/reports`
- `GET /api/settings`
- `GET /api/profile`

## Catatan

Project ini sudah disesuaikan dengan nuansa desain dark dashboard pada screenshot yang kamu kirim. Kalau kamu mau, langkah berikutnya saya bisa bantu lagi untuk:

1. menambahkan **JWT authentication**,
2. membuat **CRUD kamera / laporan / user**,
3. menghubungkan **upload PDF laporan**,
4. menambahkan **grafik real dengan chart library**,
5. deploy ke **hosting + domain**.
