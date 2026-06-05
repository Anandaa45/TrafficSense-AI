# TrafficSense AI Fullstack

TrafficSense AI adalah aplikasi web untuk memantau dan menganalisis kepadatan lalu lintas dari foto atau video. Project ini terdiri dari frontend React, backend Express, dan API machine learning berbasis FastAPI + YOLO.

## Link Penting

- Model AI: https://drive.google.com/drive/folders/1SwJ7wD70DkZzTqvpyJOEea84xB5eGbrF?usp=sharing
- Google Colab training: https://colab.research.google.com/drive/17hbYTey8cLutHYigzfAVLZlX3e4TQVO?usp=sharing

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Express.js
- ML API: FastAPI, Ultralytics YOLO, OpenCV
- Database: PostgreSQL
- Migration: node-pg-migrate

## Struktur Project

```txt
trafficsense-ai-fullstack/
+-- client/    # Frontend React
+-- server/    # Backend Express + PostgreSQL
+-- ml-api/    # FastAPI untuk deteksi kendaraan
```

## Setup Model AI

Download model dari link Google Drive di atas, lalu letakkan file model ke folder:

```txt
ml-api/models/
```

Model utama yang digunakan aplikasi:

```txt
ml-api/models/best.pt
```

## Setup Backend

Masuk ke folder backend:

```bash
cd server
npm install
```

Buat file `.env`:

```env
PORT=5000
PGUSER=postgres
PGPASSWORD=password_kamu
PGDATABASE=trafficsense_ai
PGHOST=localhost
PGPORT=5432
ML_API_URL=http://127.0.0.1:5001
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

## Setup ML API

Masuk ke folder ML API:

```bash
cd ml-api
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Jalankan FastAPI:

```bash
python -m uvicorn main:app --host 127.0.0.1 --port 5001
```

ML API berjalan di:

```txt
http://127.0.0.1:5001
```

Endpoint analisis:

```txt
POST /api/v1/analyze
```

## Setup Frontend

Masuk ke folder frontend:

```bash
cd client
npm install
```

Buat file `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Jalankan frontend:

```bash
npm run dev
```

Frontend berjalan di:

```txt
http://localhost:5173
```

## Cara Menjalankan Semua Service

Gunakan tiga terminal berbeda:

```bash
cd ml-api
venv\Scripts\activate
python -m uvicorn main:app --host 127.0.0.1 --port 5001
```

```bash
cd server
npm run dev
```

```bash
cd client
npm run dev
```

## Catatan Deployment

- Frontend dapat di-deploy ke Vercel.
- Backend dapat di-deploy ke Render, Railway, atau VPS.
- Database dapat memakai Supabase, Neon, Railway PostgreSQL, atau PostgreSQL lokal.
- ML API membutuhkan environment Python dan file model `best.pt`.
- Setelah backend online, ubah `VITE_API_BASE_URL` di frontend ke URL backend production.

## Fitur Utama

- Upload foto atau video lalu lintas.
- Deteksi kendaraan berdasarkan kelas Motor, Mobil, Bus, dan Truk.
- Analisis status lalu lintas: Lancar, Padat, atau Macet.
- Riwayat hasil analisis.
- Preview media hasil analisis.
- Dashboard dan halaman analitik.
