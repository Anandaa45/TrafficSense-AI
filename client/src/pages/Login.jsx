import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, Mail } from 'lucide-react';
import AuthShell from '../components/AuthShell.jsx';
import { api } from '../lib/api.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      setLoading(true);
      const result = await api.post('/auth/login', { email, password });
      localStorage.setItem('trafficsense_user', JSON.stringify(result.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full rounded-[18px] border border-white/10 bg-[#07122f] px-4 py-4 pr-11 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/60';

  return (
    <AuthShell
      title="Selamat Datang"
      subtitle="Masuk ke akun TrafficSense Anda"
      footer={<>Belum punya akun? <Link to="/register" className="font-bold text-cyan-300">Daftar sekarang</Link></>}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="block">
          <span className="mb-3 block text-sm uppercase tracking-wide text-slate-300">EMAIL</span>
          <div className="relative">
            <input className={inputClass} placeholder="nama@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Mail className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          </div>
        </label>
        <label className="block">
          <div className="mb-3 flex items-center justify-between text-sm uppercase tracking-wide text-slate-300">
            <span>PASSWORD</span>
            <span className="text-cyan-300 normal-case">Lupa password?</span>
          </div>
          <div className="relative">
            <input type="password" className={inputClass} placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Eye className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          </div>
        </label>

        {error ? <p className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p> : null}

        <button disabled={loading} className="w-full rounded-[18px] bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-4 text-lg font-extrabold text-white shadow-lg shadow-cyan-500/20 disabled:opacity-60">
          {loading ? 'Memproses...' : 'Masuk'}
        </button>
      </form>
    </AuthShell>
  );
}
