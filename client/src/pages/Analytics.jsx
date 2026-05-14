import React from 'react';
import { BarChart3, Clock3, Eye } from 'lucide-react';

export default function Analytics() {
  const vehicleTypes = [
    ['Motor', 48, 'bg-cyan-400'],
    ['Mobil Pribadi', 35, 'bg-emerald-400'],
    ['Bus', 8, 'bg-amber-400'],
    ['Truk', 6, 'bg-violet-400'],
    ['Lainnya', 3, 'bg-slate-400'],
  ];
  const peak = [
    ['Jl. Sudirman', '07:30 - 09:00', '1,842', '2,156'],
    ['Bundaran HI', '08:00 - 09:30', '1,654', '1,985'],
    ['Jl. TB Simatupang', '07:00 - 08:30', '1,523', '1,876'],
    ['Jl. Gatot Subroto', '17:00 - 18:30', '1,388', '1,690'],
  ];
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <div className="card-dark p-5">
        <h3 className="text-xl font-extrabold">Jenis Kendaraan</h3>
        <p className="mt-1 text-sm text-slate-400">Distribusi tipe kendaraan terdeteksi</p>
        <div className="mt-8 space-y-5">
          {vehicleTypes.map(([name, value, color]) => <div key={name}><div className="mb-2 flex justify-between"><span className="flex items-center gap-2 text-slate-300"><i className={`h-3 w-3 rounded-full ${color}`}/>{name}</span><b>{value}%</b></div><div className="h-2 rounded-full bg-slate-700"><div className={`h-2 rounded-full ${color}`} style={{ width: `${value}%` }} /></div></div>)}
        </div>
      </div>

      <div className="card-dark p-5">
        <h3 className="text-xl font-extrabold">Jam Puncak per Lokasi</h3>
        <p className="mt-1 text-sm text-slate-400">Rata-rata volume kendaraan tertinggi</p>
        <div className="mt-6 space-y-4">
          {peak.map(([name, time, avg, max]) => <div key={name} className="rounded-xl bg-slate-800/80 p-4"><div className="flex items-center justify-between"><div><p className="font-extrabold">{name}</p><span className="mt-3 inline-block rounded bg-amber-400/10 px-2 py-1 text-xs font-bold text-amber-300">{time}</span></div><div className="text-right text-sm text-slate-300"><p>Avg: <b className="text-white">{avg}</b></p><p>Maks: <b className="text-rose-400">{max}</b></p></div></div></div>)}
        </div>
      </div>

      <div className="card-dark p-5 xl:col-span-2">
        <h3 className="flex items-center gap-2 text-xl font-extrabold"><BarChart3 size={18} className="text-cyan-300"/> Volume Kendaraan Bulanan</h3>
        <div className="mt-6 flex h-48 items-end gap-4 border-b border-slate-700 px-4">
          {[280, 315, 300, 345, 385, 398, 420, 392, 438, 454, 441, 470].map((v, i) => <div key={i} className="flex flex-1 flex-col items-center gap-2"><div className="w-full max-w-5 rounded-t bg-cyan-400" style={{ height: `${(v / 500) * 160}px` }} /><span className="text-xs text-slate-400">{['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'][i]}</span></div>)}
        </div>
      </div>
    </div>
  );
}
