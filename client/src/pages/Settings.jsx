import React from 'react';
import { useEffect, useState } from 'react';
import { Monitor, Moon, Sun, Globe, Clock3 } from 'lucide-react';
import { api } from '../lib/api.js';

const tabs = ['Akun', 'Model AI', 'Kamera', 'Notifikasi', 'Sistem', 'Database'];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Akun');
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    api.get('/settings').then(setSettings);
  }, []);

  if (!settings) return <div className="panel p-6 text-slate-300">Memuat settings...</div>;

  return (
    <div className="space-y-5">
      <div className="inline-flex flex-wrap gap-2 rounded-[24px] border border-white/10 bg-[#06102d] p-1.5">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-[18px] px-5 py-3 text-base font-bold ${activeTab === tab ? 'bg-cyan-500/12 text-cyan-300 border border-cyan-500/25' : 'text-slate-300'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="panel p-5 md:p-6">
        <div className="mb-8 flex items-center gap-3 text-cyan-300">
          <Monitor size={20} />
          <h3 className="text-[36px] font-extrabold text-white">Tampilan & Preferensi</h3>
        </div>

        <p className="mb-4 text-sm text-slate-400">Tema Aplikasi</p>
        <div className="grid gap-4 md:grid-cols-3">
          <ThemeCard icon={<Moon size={24} />} title="Dark" subtitle="Mode gelap" active={settings.theme === 'Dark'} />
          <ThemeCard icon={<Sun size={24} />} title="Light" subtitle="Mode terang" active={settings.theme === 'Light'} />
          <ThemeCard icon={<Monitor size={24} />} title="System" subtitle="Otomatis" active={settings.theme === 'System'} highlight />
        </div>

        <div className="mt-5 rounded-[24px] bg-cyan-500/8 px-5 py-4 text-slate-300">
          <p><span className="font-bold text-cyan-300">Mode System:</span> Tema akan otomatis berubah mengikuti waktu.</p>
          <p className="mt-2 text-sm text-slate-400">☀️ Light (06:00 - 18:00) • 🌙 Dark (18:00 - 06:00)</p>
          <p className="mt-2 font-bold text-cyan-300">Tema aktif sekarang: Dark</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <SettingField icon={<Globe size={18} />} label="Bahasa (Language)" value={settings.language} />
          <SettingField icon={<Clock3 size={18} />} label="Zona Waktu (Timezone)" value={settings.timezone} />
        </div>
      </div>
    </div>
  );
}

function ThemeCard({ icon, title, subtitle, active, highlight = false }) {
  return (
    <div className={`rounded-[24px] border p-6 text-center ${active || highlight ? 'border-cyan-500/35 bg-white/6 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.12)]' : 'border-white/10 bg-white/4'}`}>
      <div className="mb-4 flex justify-center text-slate-300">{icon}</div>
      <p className={`text-2xl font-extrabold ${highlight ? 'text-cyan-300' : ''}`}>{title}</p>
      <p className="mt-2 text-slate-400">{subtitle}</p>
    </div>
  );
}

function SettingField({ icon, label, value }) {
  return (
    <div>
      <p className="mb-3 flex items-center gap-2 text-sm text-slate-400">{icon}{label}</p>
      <div className="rounded-[18px] border border-white/10 bg-white/5 px-4 py-4 font-semibold">{value}</div>
    </div>
  );
}

