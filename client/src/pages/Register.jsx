import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BriefcaseBusiness, Eye, EyeOff, LockKeyhole, Mail, User } from 'lucide-react';
import AuthShell from '../components/AuthShell.jsx';
import { api } from '../lib/api.js';

const initialForm = {
  username: '',
  email: '',
  role: '',
  password: '',
  confirmPassword: '',
};

export default function Register() {
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Konfirmasi password belum sama.');
      return;
    }

    try {
      setLoading(true);
      await api.post('/auth/register', {
        username: form.username,
        email: form.email,
        role: form.role,
        password: form.password,
      });
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full rounded-[18px] border border-white/10 bg-[#07122f] px-4 py-4 pr-11 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/60';

  return (
    <AuthShell
      title="Buat Akun Baru"
      subtitle="Bergabung dengan TrafficSense AI Platform"
      footer={<>Sudah punya akun? <Link to="/login" className="font-bold text-cyan-300">Masuk sekarang</Link></>}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="USERNAME" icon={<User size={18} />}>
          <input className={inputClass} placeholder="john_doe" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        </Field>
        <Field label="EMAIL INSTANSI" icon={<Mail size={18} />}>
          <input className={inputClass} placeholder="nama@dishub.go.id" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </Field>
        <Field label="JABATAN / ROLE (OPSIONAL)" icon={<BriefcaseBusiness size={18} />}>
          <input className={inputClass} placeholder="Operator Lalu Lintas" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
        </Field>
        <Field label="PASSWORD" icon={<Eye size={18} />}>
          <input type="text" className={inputClass} placeholder="Min. 8 karakter" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </Field>
        <Field label="KONFIRMASI PASSWORD" icon={<LockKeyhole size={18} />}>
          <input type="text" className={inputClass} placeholder="Ulangi password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
        </Field>

        {error ? <p className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p> : null}

        <button disabled={loading} className="w-full rounded-[18px] bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-4 text-lg font-extrabold text-white shadow-lg shadow-cyan-500/20 disabled:opacity-60">
          {loading ? 'Memproses...' : 'Daftar Akun'}
        </button>
      </form>
    </AuthShell>
  );
}

function Field({ label, icon, children }) {
  return (
    <label className="block">
      <span className="mb-3 block text-sm uppercase tracking-wide text-slate-300">{label}</span>
      <div className="relative text-slate-500">
        {children}
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">{icon}</span>
      </div>
    </label>
  );
}

