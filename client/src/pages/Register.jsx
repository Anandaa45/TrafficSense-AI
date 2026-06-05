import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Activity,
  BriefcaseBusiness,
  Eye,
  EyeOff,
  Mail,
  User,
} from 'lucide-react';
import { api } from '../lib/api.js';
import { registerLocalUser } from '../lib/localAuth.js';

const initialForm = {
  username: '',
  email: '',
  role: '',
  password: '',
  confirmPassword: '',
};

function buildUserProfile(user) {
  return {
    id: user.id || Date.now(),
    username: user.username || 'User',
    name: user.username || 'User',
    email: user.email || '-',
    role: user.role || 'User',
    location: 'Indonesia',
    country: 'Indonesia',
    company: 'TrafficSense Platform',
    org: 'TrafficSense Platform',
    joinedAt: new Date().toISOString(),
  };
}

export default function Register() {
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Konfirmasi password belum sama.');
      return;
    }

    try {
      setLoading(true);

      const payload = {
        username: form.username,
        email: form.email,
        role: form.role,
        password: form.password,
      };

      let result;

      try {
        result = await api.post('/auth/register', payload);
      } catch {
        result = registerLocalUser(payload);
      }

      const user = result?.data?.user || result?.user || payload;
      const profile = buildUserProfile(user);

      localStorage.setItem('trafficSense_registered_user', JSON.stringify(profile));

      navigate('/login');
    } catch (err) {
      setError(err.message || 'Register gagal. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-cyan-50 via-slate-100 to-blue-50 px-4 py-10 text-slate-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-2xl shadow-slate-300/50 backdrop-blur-xl"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/30">
          <Activity size={30} />
        </div>

        <h1 className="text-center text-3xl font-extrabold text-slate-950">
          Buat Akun Baru
        </h1>

        <p className="mt-2 text-center text-sm text-slate-500">
          Bergabung dengan TrafficSense AI Platform
        </p>

        <div className="mt-8 space-y-5">
          <InputField label="USERNAME" icon={<User size={18} />} placeholder="john_doe" value={form.username} onChange={(value) => handleChange('username', value)} required />
          <InputField label="EMAIL INSTANSI" icon={<Mail size={18} />} type="email" placeholder="nama@dishub.go.id" value={form.email} onChange={(value) => handleChange('email', value)} required />
          <InputField label="JABATAN / ROLE (OPSIONAL)" icon={<BriefcaseBusiness size={18} />} placeholder="Operator Lalu Lintas" value={form.role} onChange={(value) => handleChange('role', value)} />

          <PasswordField label="PASSWORD" placeholder="Min. 8 karakter" value={form.password} onChange={(value) => handleChange('password', value)} show={showPassword} onToggle={() => setShowPassword((prev) => !prev)} />

          <PasswordField label="KONFIRMASI PASSWORD" placeholder="Ulangi password" value={form.confirmPassword} onChange={(value) => handleChange('confirmPassword', value)} show={showConfirmPassword} onToggle={() => setShowConfirmPassword((prev) => !prev)} />

          {error ? (
            <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-4 text-lg font-extrabold text-white shadow-lg shadow-cyan-500/25 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Memproses...' : 'Daftar Akun'}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Sudah punya akun?{' '}
          <Link to="/login" className="font-bold text-cyan-600 transition hover:text-cyan-500">
            Masuk sekarang
          </Link>
        </p>
      </form>
    </main>
  );
}

function InputField({ label, icon, type = 'text', placeholder, value, onChange, required = false }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold uppercase tracking-wide text-slate-600">{label}</span>
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-500 shadow-sm transition focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-100">
        <input type={type} required={required} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400" />
        <span className="text-slate-400">{icon}</span>
      </div>
    </label>
  );
}

function PasswordField({ label, placeholder, value, onChange, show, onToggle }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold uppercase tracking-wide text-slate-600">{label}</span>
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-500 shadow-sm transition focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-100">
        <input type={show ? 'text' : 'password'} required minLength={8} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400" />
        <button type="button" onClick={onToggle} className="text-slate-400 transition hover:text-cyan-500">
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </label>
  );
}