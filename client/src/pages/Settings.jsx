import React, { useMemo, useState } from 'react';
import { Bell, Camera, Cpu, Database, Globe, Moon, RefreshCw, Save, Server, Shield, Sun, Monitor, Settings as Gear } from 'lucide-react';

const tabs = ['Akun', 'Model AI', 'Kamera', 'Notifikasi', 'Sistem', 'Database'];

export default function Settings() {
  const [tab, setTab] = useState('Akun');
  const [theme, setTheme] = useState('System');
  const autoTheme = useMemo(() => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18 ? 'Light' : 'Dark';
  }, []);

  return (
    <div className={theme === 'Light' ? 'rounded-2xl bg-white p-5 text-slate-900' : 'space-y-5'}>
      <div className="mb-5 flex flex-wrap gap-2 rounded-2xl border border-slate-700 bg-[#0b1228] p-2">
        {tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={`rounded-xl px-5 py-3 font-bold ${tab === item ? 'bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/40' : 'text-slate-400 hover:bg-slate-800'}`}>{item}</button>)}
      </div>

      {tab === 'Akun' && <Akun theme={theme} setTheme={setTheme} autoTheme={autoTheme} />}
      {tab === 'Model AI' && <ModelAI />}
      {tab === 'Kamera' && <Kamera />}
      {tab === 'Notifikasi' && <Notifikasi />}
      {tab === 'Sistem' && <Sistem />}
      {tab === 'Database' && <DatabaseTab />}
    </div>
  );
}

function Section({ title, icon, children }) {
  return <section className="card-dark p-5"><h3 className="mb-6 flex items-center gap-2 text-xl font-extrabold text-white">{icon}{title}</h3>{children}</section>;
}

function Akun({ theme, setTheme, autoTheme }) {
  return <div className="space-y-5"><Section title="Tampilan & Preferensi" icon={<Monitor size={18} className="text-cyan-300"/>}>
    <p className="mb-3 text-sm text-slate-400">Tema Aplikasi</p>
    <div className="grid gap-4 md:grid-cols-3">{[['Dark', Moon, 'Mode gelap'], ['Light', Sun, 'Mode terang'], ['System', Monitor, 'Otomatis']].map(([name, Icon, sub]) => <button key={name} onClick={() => setTheme(name)} className={`rounded-xl border p-6 text-center ${theme === name ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300' : 'border-slate-700 bg-slate-900/30 text-slate-400'}`}><Icon className="mx-auto mb-3"/><b>{name}</b><p className="mt-1 text-sm">{sub}</p></button>)}</div>
    {theme === 'System' && <div className="mt-4 rounded-xl border border-slate-700 bg-slate-800/70 p-4 text-sm text-slate-300"><b className="text-cyan-300">Mode System:</b> Tema otomatis mengikuti waktu. ☀️ Light (06:00 - 18:00) • 🌙 Dark (18:00 - 06:00)<br/><b>Tema aktif sekarang: <span className="text-cyan-300">{autoTheme}</span></b></div>}
    <div className="mt-6 grid gap-5 md:grid-cols-3"><Field icon={<Globe size={16}/>} label="Bahasa (Language)" value="Bahasa Indonesia"/><Field label="Zona Waktu (Timezone)" value="WIB (Asia/Jakarta) UTC+7"/><Field label="Format Tanggal" value="DD/MM/YYYY (12/05/2026)"/></div>
  </Section><SaveButtons /></div>;
}

function ModelAI() {
  return <div className="space-y-5"><Section title="Konfigurasi Model AI" icon={<Cpu size={18} className="text-cyan-300"/>}>
    <div className="grid gap-5 md:grid-cols-2"><Select label="Model Architecture" value="YOLOv8s (Small)"/><Select label="Inference Device" value="CUDA (GPU)"/><Slider label="Confidence Threshold" value="0.85"/><Slider label="IOU Threshold" value="0.45"/><Slider label="Target FPS" value="30"/><Slider label="Batch Size" value="16"/></div>
    <div className="mt-6 flex items-center justify-between border-t border-slate-700 pt-5"><div><p className="font-bold">Auto-Retraining</p><p className="text-sm text-slate-400">Model otomatis dilatih ulang setiap minggu</p></div><Toggle on /></div>
  </Section><Section title="Kelas Deteksi" icon={<Gear size={18} className="text-cyan-300"/>}><div className="grid gap-3 md:grid-cols-4">{['Motor','Mobil','Bus','Truk','Sepeda','Pejalan Kaki','Ambulans','Polisi'].map((x,i)=><button className={`rounded-xl border px-4 py-3 text-left ${i<4 || x==='Ambulans' ? 'border-slate-600 bg-slate-800 text-white':'border-slate-800 bg-slate-950/40 text-slate-500'}`} key={x}><span className={`mr-2 inline-block h-3 w-3 rounded-full ${['bg-cyan-400','bg-emerald-400','bg-amber-400','bg-violet-400','bg-slate-500','bg-slate-500','bg-rose-400','bg-slate-500'][i]}`}/>{x}</button>)}</div></Section><SaveButtons /></div>;
}

function Kamera(){const cams=['Jl. Sudirman Km 2','Bundaran HI','Jl. TB Simatupang','Jl. HR Rasuna Said','Jl. Gatot Subroto'];return <div className="space-y-5"><Section title="Pengaturan Kamera" icon={<Camera size={18} className="text-cyan-300"/>}><div className="space-y-4">{cams.map((c,i)=><div key={c} className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800/70 p-4"><div className="flex items-center gap-3"><span className="h-3 w-3 rounded-full bg-emerald-400"/><div><p className="font-bold">{c}</p><p className="text-sm text-slate-400">CAM-00{i+1} • 192.168.1.10{i+1}</p></div></div><div className="flex gap-2"><button className="rounded-lg border border-cyan-500/40 px-4 py-2 text-cyan-300">Edit</button><button className="rounded-lg border border-slate-700 px-4 py-2 text-slate-300">Test</button></div></div>)}</div></Section></div>}
function Notifikasi(){return <Section title="Pengaturan Notifikasi" icon={<Bell size={18} className="text-cyan-300"/>}><div className="space-y-4"><Row title="Alert Kemacetan" sub="Notifikasi saat terdeteksi kemacetan" on/><Row title="Notifikasi Email" sub="Kirim laporan via email" on/><Row title="Notifikasi SMS" sub="Kirim alert via SMS"/></div></Section>}
function Sistem(){return <Section title="Pengaturan Sistem" icon={<Server size={18} className="text-cyan-300"/>}><div className="grid gap-4 md:grid-cols-2">{[['Versi Sistem','TrafficSense AI v2.4.1'],['OS','Ubuntu Server 22.04 LTS'],['GPU','NVIDIA RTX 4090 (24GB)'],['CPU','Intel Xeon W-2295 (18 Core)'],['RAM','128 GB DDR4 ECC'],['Uptime','14 hari, 7 jam, 23 menit']].map(([a,b])=><Field key={a} label={a} value={b}/>)}</div></Section>}
function DatabaseTab(){return <Section title="Pengaturan Database" icon={<Database size={18} className="text-cyan-300"/>}><div className="grid gap-4 md:grid-cols-2">{[['Database','PostgreSQL 16.2'],['Host','db.trafficsense.local'],['Storage Digunakan','284 GB / 2 TB'],['Backup Terakhir','18/05/2025 03:00'],['Retention Policy','90 hari'],['Koneksi Aktif','24 koneksi']].map(([a,b])=><Field key={a} label={a} value={b}/>)}</div></Section>}

function Field({ label, value, icon }) { return <div><p className="mb-2 flex items-center gap-2 text-sm text-slate-400">{icon}{label}</p><div className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 font-semibold text-white">{value}</div></div> }
function Select({ label, value }) { return <label><p className="mb-2 text-sm text-slate-400">{label}</p><select className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 font-semibold outline-none"><option>{value}</option></select></label> }
function Slider({ label, value }) { return <div><p className="mb-3 text-sm text-slate-400">{label}: <b className="text-cyan-300">{value}</b></p><input type="range" className="w-full accent-cyan-400" defaultValue="55"/></div> }
function Toggle({ on=false }) { return <span className={`flex h-7 w-12 items-center rounded-full p-1 ${on?'justify-end bg-cyan-400':'justify-start bg-slate-600'}`}><i className="h-5 w-5 rounded-full bg-white"/></span> }
function Row({ title, sub, on=false }) { return <div className="flex items-center justify-between rounded-xl bg-slate-800/70 p-4"><div><p className="font-bold">{title}</p><p className="text-sm text-slate-400">{sub}</p></div><Toggle on={on}/></div> }
function SaveButtons(){return <div className="flex gap-3"><button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-3 font-bold"><Save size={16}/> Simpan Perubahan</button><button className="flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 font-bold text-slate-400"><RefreshCw size={16}/> Reset Default</button></div>}
