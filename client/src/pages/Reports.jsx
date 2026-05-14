import React from 'react';
import { AlertTriangle, ChevronRight, Download, FileText, Search } from 'lucide-react';

export default function Reports() {
  const incidents = [
    ['Jl. Sudirman', 'macet', '2j 18m', 48, '07:42', 'Resolved'],
    ['Bundaran HI', 'kecelakaan', '45m', 32, '09:15', 'Resolved'],
    ['Jl. TB Simatupang', 'macet', '1j 32m', 51, '17:30', 'Aktif'],
    ['Jl. Gatot Subroto', 'macet', '55m', 38, '18:05', 'Aktif'],
  ];
  const reports = [
    ['RPT-2026-001', 'Laporan Harian — 14 Mei 2026', 'Harian', '2.8 MB'],
    ['RPT-2026-W01', 'Laporan Mingguan — Minggu ke-1', 'Mingguan', '8.5 MB'],
    ['RPT-2026-05', 'Laporan Bulanan — Mei 2026', 'Bulanan', '25.1 MB'],
  ];
  return (
    <div className="space-y-6">
      <section className="card-dark overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-700 p-5"><h3 className="flex items-center gap-2 text-xl font-extrabold"><AlertTriangle size={18} className="text-rose-400"/> Insiden Hari Ini</h3><span className="text-sm text-slate-400">18 Mei 2025</span></div>
        {incidents.map(([loc, type, dur, veh, time, status]) => <div key={loc} className="flex items-center justify-between border-b border-slate-800 p-5 last:border-0"><div className="flex items-start gap-4"><span className={`mt-1 h-3 w-3 rounded-full ${status === 'Aktif' ? 'bg-rose-500' : 'bg-emerald-400'}`}/><div><p className="font-extrabold">{loc}</p><p className="mt-1 text-sm text-slate-400">Tipe: {type} &nbsp; Durasi: {dur} &nbsp; {veh} kendaraan</p></div></div><div className="flex items-center gap-4 text-right"><div><p className="text-sm text-slate-400">{time}</p><p className={status === 'Aktif' ? 'text-rose-400' : 'text-emerald-400'}>{status}</p></div><ChevronRight size={18} className="text-slate-500"/></div></div>)}
      </section>

      <section className="card-dark p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><h3 className="text-xl font-extrabold">Daftar Laporan</h3><label className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-slate-400"><Search size={16}/><input className="bg-transparent outline-none" placeholder="Cari laporan..."/></label></div>
        <div className="mt-5 overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="text-slate-400"><tr><th className="py-3">ID</th><th>Judul</th><th>Tipe</th><th>Ukuran</th><th>Aksi</th></tr></thead><tbody>{reports.map(([id,title,type,size]) => <tr key={id} className="border-t border-slate-800"><td className="py-4 text-slate-300">{id}</td><td className="font-semibold">{title}</td><td><span className="status-pill border-cyan-400/40 bg-cyan-400/10 text-cyan-300">{type}</span></td><td className="text-slate-400">{size}</td><td><button className="inline-flex items-center gap-2 text-cyan-300"><Download size={15}/> PDF</button></td></tr>)}</tbody></table></div>
      </section>
    </div>
  );
}
