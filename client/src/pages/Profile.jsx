import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Edit3,
  LogOut,
  Mail,
  MapPin,
  Save,
  Shield,
  X,
} from 'lucide-react';
import { useTheme } from '../Context/ThemeContext.jsx';

const USER_KEY = 'trafficSense_user';

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
  } catch {
    return null;
  }
}

function normalizeUser(user) {
  const safeUser = user || {};

  return {
    id: safeUser.id || Date.now(),
    username: safeUser.username || safeUser.name || safeUser.email?.split('@')?.[0] || 'User',
    name: safeUser.name || safeUser.username || safeUser.email?.split('@')?.[0] || 'User',
    role: safeUser.role || 'User',
    email: safeUser.email || '-',
    country: safeUser.country || safeUser.location || 'Indonesia',
    org: safeUser.org || safeUser.company || 'TrafficSense Platform',
    joinedAt: safeUser.joinedAt || new Date().toISOString(),
  };
}

function getInitials(name) {
  return String(name || 'User')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export default function Profile() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(() => normalizeUser(getStoredUser()));

  const initials = useMemo(() => getInitials(form.name), [form.name]);

  const cardClass = isDark
    ? 'bg-[#0b1228] border border-slate-700 text-white'
    : 'bg-white/95 border border-slate-300 text-slate-900 shadow-lg shadow-slate-200/70';

  const innerBox = isDark
    ? 'bg-slate-800/70 border border-slate-700'
    : 'bg-white border border-slate-300 shadow-md shadow-slate-200/60';

  const titleText = isDark ? 'text-white' : 'text-slate-950';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-600';

  const inputClass = isDark
    ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500'
    : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400';

  const avatarBorder = isDark
    ? 'border-[#0b1228]'
    : 'border-white shadow-lg shadow-slate-300/70';

  function saveProfile() {
    const updatedUser = {
      id: form.id,
      username: form.username || form.name,
      name: form.name,
      role: form.role,
      email: form.email,
      location: form.country,
      country: form.country,
      company: form.org,
      org: form.org,
      joinedAt: form.joinedAt,
    };

    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    setForm(normalizeUser(updatedUser));
    setEditing(false);
  }

  function logout() {
    localStorage.removeItem('trafficSense_auth');
    localStorage.removeItem('trafficSense_token');
    localStorage.removeItem('trafficSense_isLoggedIn');

    navigate('/login');
  }

  function formatJoinedAt(value) {
    return new Date(value).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }

  const activities = [
    `Login sebagai ${form.name}`,
    'Membuka halaman profil pengguna',
    'Mengakses dashboard TrafficSense',
  ];

  return (
    <div className="space-y-6">
      <section className={`overflow-hidden rounded-2xl transition-colors ${cardClass}`}>
        <div className={`h-20 ${isDark ? 'bg-cyan-500/20' : 'bg-gradient-to-r from-cyan-100 via-sky-100 to-blue-100'}`} />

        <div className="relative p-5 md:p-6">
          <div className={`absolute -top-12 left-6 flex h-24 w-24 items-center justify-center rounded-full border-4 bg-cyan-500 text-4xl font-extrabold text-slate-950 ${avatarBorder}`}>
            {initials}
          </div>

          <div className="ml-0 pt-16 md:ml-32 md:pt-0">
            {editing ? (
              <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                <div className="grid gap-3 md:grid-cols-2">
                  <Input value={form.name} onChange={(name) => setForm({ ...form, name })} className={inputClass} placeholder="Nama" />
                  <Input value={form.role} onChange={(role) => setForm({ ...form, role })} className={inputClass} placeholder="Role" />
                  <Input value={form.email} onChange={(email) => setForm({ ...form, email })} className={inputClass} placeholder="Email" />
                  <Input value={form.country} onChange={(country) => setForm({ ...form, country })} className={inputClass} placeholder="Negara" />
                  <Input value={form.org} onChange={(org) => setForm({ ...form, org })} className={inputClass} placeholder="Organisasi" />
                </div>

                <div className="flex flex-wrap gap-3">
                  <button onClick={saveProfile} className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-bold text-white transition-colors hover:bg-cyan-600">
                    <Save size={16} />
                    Simpan
                  </button>

                  <button
                    onClick={() => {
                      setForm(normalizeUser(getStoredUser()));
                      setEditing(false);
                    }}
                    className={`flex items-center gap-2 rounded-xl border px-6 py-3 font-bold transition-colors ${
                      isDark ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <X size={16} />
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <h3 className={`text-3xl font-extrabold ${titleText}`}>
                    {form.name}
                  </h3>

                  <p className="mt-1 font-bold text-cyan-500">
                    {form.role}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <Pill icon={<MapPin size={14} />} text={form.country} isDark={isDark} />
                    <Pill icon={<Building2 size={14} />} text={form.org} isDark={isDark} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setEditing(true)} className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-bold text-white transition-colors hover:bg-cyan-600">
                    <Edit3 size={16} />
                    Edit Profil
                  </button>

                  <button
                    onClick={logout}
                    className={`flex items-center gap-2 rounded-xl border px-5 py-3 font-bold transition-colors ${
                      isDark ? 'border-rose-500/40 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20' : 'border-rose-300 bg-rose-50 text-rose-600 hover:bg-rose-100'
                    }`}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <section className={`rounded-2xl p-5 transition-colors ${cardClass}`}>
          <h3 className={`mb-5 flex items-center gap-2 text-xl font-extrabold ${titleText}`}>
            <Shield size={18} className="text-cyan-400" />
            Informasi Pribadi
          </h3>

          <Info label="Username" value={form.username} mutedText={mutedText} titleText={titleText} />
          <Info label="Email" value={form.email} icon={<Mail size={16} />} extra="Verifikasi" mutedText={mutedText} titleText={titleText} />
          <Info label="Jabatan / Role" value={form.role} mutedText={mutedText} titleText={titleText} />
          <Info label="Bergabung Sejak" value={formatJoinedAt(form.joinedAt)} mutedText={mutedText} titleText={titleText} />
        </section>

        <section className={`rounded-2xl p-5 transition-colors ${cardClass}`}>
          <h3 className={`mb-5 text-xl font-extrabold ${titleText}`}>
            Aktivitas Terakhir
          </h3>

          {activities.map((activity, index) => (
            <div key={activity} className={`mb-4 rounded-xl p-4 transition-colors ${innerBox}`}>
              <p className={`font-semibold ${titleText}`}>{activity}</p>
              <p className={`mt-1 text-sm ${mutedText}`}>
                {index === 0 ? 'Baru saja' : index === 1 ? '1 menit yang lalu' : '5 menit yang lalu'} • IP: 127.0.0.1
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

function Input({ value, onChange, className, placeholder }) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`rounded-xl border px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-cyan-400 ${className}`}
    />
  );
}

function Pill({ icon, text, isDark }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${isDark ? 'border-slate-700 text-slate-300' : 'border-slate-300 bg-white text-slate-700 shadow-sm'}`}>
      {icon}
      {text}
    </span>
  );
}

function Info({ label, value, icon, extra, mutedText, titleText }) {
  return (
    <div className="mb-5">
      <p className={`text-sm ${mutedText}`}>{label}</p>
      <div className="mt-1 flex items-center justify-between">
        <p className={`font-bold ${titleText}`}>{value || '-'}</p>
        {extra ? (
          <span className="flex items-center gap-1 text-sm font-semibold text-cyan-500">
            {icon}
            {extra}
          </span>
        ) : null}
      </div>
    </div>
  );
}