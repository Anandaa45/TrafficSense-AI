import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, LogIn, Mail, Eye, EyeOff } from 'lucide-react';
import { api } from '../lib/api.js';
import { loginLocalUser } from '../lib/localAuth.js';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    try {
      setLoading(true);
      let result;

      try {
        result = await api.post('/auth/login', form);
      } catch {
        result = loginLocalUser(form);
      }

      localStorage.setItem('trafficSense_auth', JSON.stringify(result));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login gagal. Coba lagi.');
    } finally {
      setLoading(false);
    }
  }

 return (
  <main className="app-soft-bg flex min-h-screen items-center justify-center p-6 text-slate-900">
    <form onSubmit={handleSubmit} className="glass-card w-full max-w-md rounded-3xl p-8">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
        <Activity size={28} />
      </div>

      <h1 className="text-center text-3xl font-extrabold text-slate-950">
        Selamat Datang
      </h1>

      <p className="mt-2 text-center text-slate-500">
        Masuk ke akun TrafficSense Anda
      </p>

      <label className="mt-8 block">
        <span className="text-sm font-bold text-slate-600">
          EMAIL
        </span>

        <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-xl focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-400/10">
          <input
            className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
            placeholder="nama@example.com"
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            required
          />

          <Mail size={18} className="text-slate-400" />
        </div>
      </label>

      <label className="mt-5 block">
        <span className="text-sm font-bold text-slate-600">
          PASSWORD
        </span>

        <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-xl focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-400/10">
          <input
            className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-slate-400 hover:text-cyan-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </label>

      {error ? (
        <p className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-4 font-extrabold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.01]"
      >
        <LogIn size={18} />
        {loading ? 'Memproses...' : 'Masuk'}
      </button>

      <p className="mt-6 text-center text-sm text-slate-500">
        Belum punya akun?{" "}
        <Link to="/register" className="font-bold text-cyan-600 hover:text-blue-600">
          Daftar sekarang
        </Link>
      </p>
    </form>
  </main>
);
}
