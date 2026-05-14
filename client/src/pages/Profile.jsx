import { useEffect, useState } from 'react';
import { MapPin, Building2, Mail, ShieldCheck, Smartphone } from 'lucide-react';
import { api } from '../lib/api.js';

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get('/profile').then(setProfile);
  }, []);

  if (!profile) return <div className="panel p-6 text-slate-300">Memuat profil...</div>;

  return (
    <div className="space-y-5">
      <div className="panel overflow-hidden">
        <div className="h-14 bg-cyan-500/15" />
        <div className="relative px-6 pb-6">
          <div className="absolute -top-12 left-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#06102d] bg-gradient-to-br from-cyan-400 to-blue-500 text-5xl font-extrabold">LO</div>
          <div className="flex flex-col gap-4 pl-0 pt-6 md:flex-row md:items-start md:justify-between md:pl-32">
            <div>
              <h3 className="text-[42px] font-extrabold">{profile.name}</h3>
              <p className="text-xl font-semibold text-cyan-300">{profile.role}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Pill icon={<MapPin size={14} />} text={profile.country} />
                <Pill icon={<Building2 size={14} />} text={profile.organization} />
              </div>
            </div>
            <button className="rounded-[18px] bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-3 font-bold">Edit Profil</button>
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <Card title="Informasi Pribadi">
            <Info label="Username" value={profile.username} />
            <Info label="Email" value={profile.email} secondary="Verifikasi" icon={<Mail size={16} />} />
            <Info label="Jabatan / Role" value={profile.role} />
            <Info label="Bergabung Sejak" value={profile.joined_at} />
          </Card>

          <Card title="Keamanan Akun">
            <div className="flex items-center justify-between gap-4 rounded-[20px] bg-white/4 p-4">
              <div>
                <p className="font-bold">Verifikasi Perangkat Baru</p>
                <p className="mt-1 text-sm text-slate-400">Perangkat baru wajib verifikasi via Gmail</p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-bold text-emerald-300">Aktif</span>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-[20px] bg-white/4 p-4">
              <div>
                <p className="font-bold">Password</p>
                <p className="mt-1 text-sm text-slate-400">Terakhir diubah Hari ini</p>
              </div>
              <button className="font-bold text-cyan-300">Ubah</button>
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card title="Aktivitas Terakhir">
            <div className="space-y-4">
              {profile.activities.map((activity) => (
                <div key={activity.title} className="rounded-[20px] border border-white/10 bg-white/4 px-5 py-4">
                  <div className="mb-2 flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                    <div>
                      <p className="text-lg font-semibold">{activity.title}</p>
                      <p className="mt-2 text-sm text-slate-400">{activity.time} &nbsp; • &nbsp; IP: {activity.ip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Sesi Perangkat">
            <div className="rounded-[20px] bg-white/4 px-5 py-4 text-slate-300">
              <p><span className="font-bold text-cyan-300">Perangkat Terpercaya</span> adalah perangkat yang sudah diverifikasi via Gmail sebelumnya.</p>
            </div>
            <div className="mt-4 rounded-[20px] border border-white/10 bg-white/4 p-4">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-300"><Smartphone size={20} /></div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <p className="text-lg font-semibold">Perangkat Ini</p>
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">Terpercaya</span>
                  </div>
                  <p className="text-sm text-slate-400">ID: {profile.device.id}</p>
                  <p className="mt-1 text-sm text-slate-400">Chrome • IP: {profile.device.ip} • Sesi aktif</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="panel p-5 md:p-6">
      <div className="mb-5 flex items-center gap-3">
        <ShieldCheck className="text-cyan-300" size={18} />
        <h3 className="text-[34px] font-extrabold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Info({ label, value, secondary, icon }) {
  return (
    <div className="mb-5">
      <p className="text-sm text-slate-400">{label}</p>
      <div className="mt-2 flex items-center justify-between gap-4">
        <p className="text-xl font-semibold">{value}</p>
        {secondary ? <span className="flex items-center gap-1 text-cyan-300">{icon}{secondary}</span> : null}
      </div>
    </div>
  );
}

function Pill({ icon, text }) {
  return <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">{icon}{text}</span>;
}
