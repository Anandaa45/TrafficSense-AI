import { useLanguage } from '../Context/LanguageContext.jsx';
import React from 'react';
import {
  AlertTriangle,
  ChevronRight,
  Download,
  Search,
} from 'lucide-react';
import { useTheme } from '../Context/ThemeContext.jsx';

export default function Reports() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const r = t.reportsPage || {};

  const cardClass = isDark
    ? 'bg-[#0b1228] border border-slate-700 text-white'
    : 'bg-white border border-slate-200 text-slate-900 shadow-sm';

  const titleText = isDark ? 'text-white' : 'text-slate-900';
  const bodyText = isDark ? 'text-slate-300' : 'text-slate-700';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-500';
  const lineClass = isDark ? 'border-slate-800' : 'border-slate-200';

  const searchBox = isDark
    ? 'bg-slate-800 border-slate-700 text-slate-300'
    : 'bg-white border-slate-200 text-slate-700 shadow-sm';

  const inputText = isDark
    ? 'placeholder:text-slate-500 text-white'
    : 'placeholder:text-slate-400 text-slate-900';

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
      {/* Insiden Hari Ini */}
      <section className={`overflow-hidden rounded-2xl transition-colors ${cardClass}`}>
        <div className={`flex items-center justify-between border-b p-5 ${lineClass}`}>
          <h3 className={`flex items-center gap-2 text-xl font-extrabold ${titleText}`}>
            <AlertTriangle size={18} className="text-rose-500" />
            {r.todayIncidents}
          </h3>

          <span className={`text-sm ${mutedText}`}>
            18 Mei 2025
          </span>
        </div>

        {incidents.map(([loc, type, dur, veh, time, status]) => (
          <div
            key={loc}
            className={`flex items-center justify-between border-b p-5 last:border-0 ${lineClass}`}
          >
            <div className="flex items-start gap-4">
              <span
                className={`mt-1 h-3 w-3 rounded-full ${
                  status === 'Aktif' ? 'bg-rose-500' : 'bg-emerald-400'
                }`}
              />

              <div>
                <p className={`font-extrabold ${titleText}`}>
                  {loc}
                </p>

                <p className={`mt-1 text-sm ${mutedText}`}>
                  Tipe: {type} &nbsp; Durasi: {dur} &nbsp; {veh} kendaraan
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-right">
              <div>
                <p className={`text-sm ${mutedText}`}>
                  {time}
                </p>

                <p
                  className={`font-semibold ${
                    status === 'Aktif' ? 'text-rose-500' : 'text-emerald-500'
                  }`}
                >
                  {status}
                </p>
              </div>

              <ChevronRight
                size={18}
                className={isDark ? 'text-slate-500' : 'text-slate-400'}
              />
            </div>
          </div>
        ))}
      </section>

      {/* Daftar Laporan */}
      <section className={`rounded-2xl p-5 transition-colors ${cardClass}`}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h3 className={`text-xl font-extrabold ${titleText}`}>
            Daftar Laporan
          </h3>

          <label className={`flex items-center gap-2 rounded-xl border px-4 py-2 ${searchBox}`}>
            <Search size={16} className="opacity-70" />

            <input
              className={`bg-transparent outline-none ${inputText}`}
              placeholder="Cari laporan..."
            />
          </label>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className={mutedText}>
              <tr>
                <th className="py-3 font-bold">ID</th>
                <th className="font-bold">Judul</th>
                <th className="font-bold">Tipe</th>
                <th className="font-bold">Ukuran</th>
                <th className="font-bold">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {reports.map(([id, title, type, size]) => (
                <tr key={id} className={`border-t ${lineClass}`}>
                  <td className={`py-4 ${bodyText}`}>
                    {id}
                  </td>

                  <td className={`font-semibold ${titleText}`}>
                    {title}
                  </td>

                  <td>
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
                        isDark
                          ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300'
                          : 'border-cyan-200 bg-cyan-50 text-cyan-600'
                      }`}
                    >
                      {type}
                    </span>
                  </td>

                  <td className={mutedText}>
                    {size}
                  </td>

                  <td>
                    <button className="inline-flex items-center gap-2 font-semibold text-cyan-500 hover:text-cyan-600">
                      <Download size={15} />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}