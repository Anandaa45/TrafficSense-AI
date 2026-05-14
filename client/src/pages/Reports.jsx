import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Search, Download, ChevronDown } from 'lucide-react';
import { api } from '../lib/api.js';

export default function Reports() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState('');
  const [type, setType] = useState('Semua');

  useEffect(() => {
    api.get('/reports').then(setData);
  }, []);

  const rows = useMemo(() => {
    if (!data) return [];
    return data.items.filter((item) => {
      const matchQuery = item.title.toLowerCase().includes(query.toLowerCase());
      const matchType = type === 'Semua' || item.type === type;
      return matchQuery && matchType;
    });
  }, [data, query, type]);

  if (!data) return <div className="panel p-6 text-slate-300">Memuat laporan...</div>;

  return (
    <div className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatBox label="Total Laporan" value={data.summary.totalReports} color="text-cyan-300" />
        <StatBox label="Laporan Bulan Ini" value={data.summary.monthlyReports} color="text-violet-300" />
        <StatBox label="Insiden Aktif" value={data.summary.activeIncidents} color="text-rose-400" />
        <StatBox label="Insiden Resolved" value={data.summary.resolvedIncidents} color="text-emerald-400" />
      </div>

      <div className="panel overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-white/8 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-6">
          <h3 className="text-[36px] font-extrabold">Daftar Laporan</h3>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-400">
              <Search size={16} />
              <input className="w-full bg-transparent outline-none placeholder:text-slate-500" placeholder="Cari laporan..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
              <select className="bg-transparent outline-none" value={type} onChange={(e) => setType(e.target.value)}>
                <option className="text-slate-900">Semua</option>
                <option className="text-slate-900">Harian</option>
                <option className="text-slate-900">Mingguan</option>
                <option className="text-slate-900">Bulanan</option>
              </select>
              <ChevronDown size={16} />
            </label>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/2 text-slate-400">
              <tr>
                {['ID', 'Judul', 'Tipe', 'Lokasi', 'Kendaraan', 'Insiden', 'Tanggal', 'Ukuran', 'Aksi'].map((header) => (
                  <th key={header} className="px-4 py-4 font-medium md:px-6">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr key={item.id} className="border-t border-white/8 text-slate-200">
                  <td className="px-4 py-4 md:px-6">{item.id}</td>
                  <td className="px-4 py-4 font-medium text-white md:px-6">{item.title}</td>
                  <td className="px-4 py-4 md:px-6"><TypeBadge type={item.type} /></td>
                  <td className="px-4 py-4 md:px-6">{item.locations}</td>
                  <td className="px-4 py-4 md:px-6">{item.vehicles.toLocaleString('id-ID')}</td>
                  <td className={`px-4 py-4 font-semibold md:px-6 ${item.incidents > 10 ? 'text-rose-400' : 'text-cyan-300'}`}>{item.incidents}</td>
                  <td className="px-4 py-4 md:px-6">{item.date}</td>
                  <td className="px-4 py-4 md:px-6">{item.size}</td>
                  <td className="px-4 py-4 md:px-6"><button className="inline-flex items-center gap-2 font-bold text-cyan-300"><Download size={15} /> PDF</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, color }) {
  return (
    <div className="panel p-5">
      <p className={`text-lg ${color}`}>{label}</p>
      <p className={`mt-3 text-[42px] font-extrabold ${color}`}>{value}</p>
    </div>
  );
}

function TypeBadge({ type }) {
  const styles = {
    Harian: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    Mingguan: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    Bulanan: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  };
  return <span className={`rounded-full border px-3 py-1 text-xs font-bold ${styles[type]}`}>{type}</span>;
}

