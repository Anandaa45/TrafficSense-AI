import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Edit3, LogOut, Mail, MapPin, Save, Shield, X } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: 'Loks', role: 'pers', email: 'admin@gmail.com', country: 'Indonesia', org: 'TrafficSense Platform' });
  const logout = () => {
    localStorage.removeItem('trafficsense_user');
    navigate('/login');
  };
  return (
    <div className="space-y-6">
      <section className="card-dark overflow-hidden">
        <div className="h-16 bg-cyan-500/20" />
        <div className="relative p-5 md:p-6">
          <div className="absolute -top-11 left-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#0b1228] bg-cyan-500 text-4xl font-extrabold">LO</div>
          <div className="ml-0 pt-16 md:ml-32 md:pt-0">
            {editing ? (
              <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                <div className="grid gap-3 md:grid-cols-2">
                  <Input value={form.name} onChange={(name) => setForm({ ...form, name })} />
                  <Input value={form.role} onChange={(role) => setForm({ ...form, role })} />
                </div>
                <div className="flex gap-3"><button onClick={() => setEditing(false)} className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-bold"><Save size={16}/> Simpan</button><button onClick={() => setEditing(false)} className="flex items-center gap-2 rounded-xl bg-slate-800 px-6 py-3 font-bold text-slate-400"><X size={16}/> Batal</button></div>
              </div>
            ) : (
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div><h3 className="text-3xl font-extrabold">{form.name}</h3><p className="mt-1 font-bold text-cyan-300">{form.role}</p><div className="mt-4 flex flex-wrap gap-3"><Pill icon={<MapPin size={14}/>} text={form.country}/><Pill icon={<Building2 size={14}/>} text={form.org}/></div></div>
                <div className="flex gap-3"><button onClick={() => setEditing(true)} className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-bold"><Edit3 size={16}/> Edit Profil</button><button onClick={logout} className="flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-5 py-3 font-bold text-rose-300"><LogOut size={16}/> Logout</button></div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="card-dark p-5"><h3 className="mb-5 flex items-center gap-2 text-xl font-extrabold"><Shield size={18} className="text-cyan-300"/> Informasi Pribadi</h3><Info label="Username" value={form.name}/><Info label="Email" value={form.email} icon={<Mail size={16}/>} extra="Verifikasi"/><Info label="Jabatan / Role" value={form.role}/><Info label="Bergabung Sejak" value="14 Mei 2026"/></section>
        <section className="card-dark p-5"><h3 className="mb-5 text-xl font-extrabold">Aktivitas Terakhir</h3>{['Membuat akun baru di sistem TrafficSense (Admin)','Memperbarui threshold model AI menjadi 0.85','Menambahkan kamera baru (CAM-005)'].map((x,i)=><div key={x} className="mb-4 rounded-xl border border-slate-700 bg-slate-800/70 p-4"><p className="font-semibold">{x}</p><p className="mt-1 text-sm text-slate-400">{i===0?'1 menit yang lalu':i===1?'33 menit yang lalu':'1 hari yang lalu'} • IP: 192.168.1.45</p></div>)}</section>
      </div>
    </div>
  );
}
function Input({ value, onChange }) { return <input value={value} onChange={(e)=>onChange(e.target.value)} className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 font-semibold outline-none"/> }
function Pill({ icon, text }) { return <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">{icon}{text}</span> }
function Info({ label, value, icon, extra }) { return <div className="mb-5"><p className="text-sm text-slate-400">{label}</p><div className="mt-1 flex items-center justify-between"><p className="font-bold">{value}</p>{extra ? <span className="flex items-center gap-1 text-sm text-cyan-300">{icon}{extra}</span> : null}</div></div> }
