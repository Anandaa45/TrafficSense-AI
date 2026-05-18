import React from 'react';
import { BarChart3 } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext.jsx';

export default function Analytics() {
  const { isDark } = useTheme();

  const cardClass = isDark
    ? 'bg-[#0b1228] border border-slate-700 text-white'
    : 'bg-white/95 border border-slate-300 text-slate-900 shadow-md shadow-slate-200/70';

  const innerBox = isDark
    ? 'bg-slate-800/80 border border-slate-700'
    : 'bg-white border border-slate-300 shadow-sm';

  const titleText = isDark ? 'text-white' : 'text-slate-950';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-600';
  const bodyText = isDark ? 'text-slate-300' : 'text-slate-800';

  const progressBg = isDark ? 'bg-slate-700' : 'bg-slate-300';
  const chartBorder = isDark ? 'border-slate-700' : 'border-slate-300';
  const monthText = isDark ? 'text-slate-400' : 'text-slate-600';

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

  const monthlyVolume = [
    280, 315, 300, 345, 385, 398, 420, 392, 438, 454, 441, 470,
  ];

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {/* Jenis Kendaraan */}
      <section className={`rounded-2xl p-6 transition-colors ${cardClass}`}>
        <h3 className={`text-xl font-extrabold ${titleText}`}>
          Jenis Kendaraan
        </h3>

        <p className={`mt-1 text-sm ${mutedText}`}>
          Distribusi tipe kendaraan terdeteksi
        </p>

        <div className="mt-8 space-y-5">
          {vehicleTypes.map(([name, value, color]) => (
            <div key={name}>
              <div className="mb-2 flex justify-between">
                <span className={`flex items-center gap-2 font-medium ${bodyText}`}>
                  <i className={`h-3 w-3 rounded-full ${color}`} />
                  {name}
                </span>

                <b className={titleText}>{value}%</b>
              </div>

              <div className={`h-2 rounded-full ${progressBg}`}>
                <div
                  className={`h-2 rounded-full ${color}`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Jam Puncak */}
      <section className={`rounded-2xl p-6 transition-colors ${cardClass}`}>
        <h3 className={`text-xl font-extrabold ${titleText}`}>
          Jam Puncak per Lokasi
        </h3>

        <p className={`mt-1 text-sm ${mutedText}`}>
          Rata-rata volume kendaraan tertinggi
        </p>

        <div className="mt-6 space-y-4">
          {peak.map(([name, time, avg, max]) => (
            <div
              key={name}
              className={`rounded-xl p-4 transition-colors ${innerBox}`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className={`font-extrabold ${titleText}`}>
                    {name}
                  </p>

                  <span
                    className={`mt-3 inline-block rounded-lg px-2 py-1 text-xs font-bold ${
                      isDark
                        ? 'bg-amber-400/10 text-amber-300'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {time}
                  </span>
                </div>

                <div className={`text-right text-sm ${bodyText}`}>
                  <p>
                    Avg:{' '}
                    <b className={titleText}>
                      {avg}
                    </b>
                  </p>

                  <p>
                    Maks:{' '}
                    <b className={isDark ? 'text-rose-400' : 'text-rose-600'}>
                      {max}
                    </b>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Volume Kendaraan Bulanan */}
      <section className={`rounded-2xl p-6 transition-colors xl:col-span-2 ${cardClass}`}>
        <h3 className={`flex items-center gap-2 text-xl font-extrabold ${titleText}`}>
          <BarChart3 size={18} className="text-cyan-400" />
          Volume Kendaraan Bulanan
        </h3>

        <p className={`mt-1 text-sm ${mutedText}`}>
          Ringkasan total kendaraan terdeteksi setiap bulan
        </p>

        <div className={`mt-6 flex h-52 items-end gap-4 rounded-xl border-b px-4 pb-2 ${chartBorder}`}>
          {monthlyVolume.map((value, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full max-w-6 rounded-t bg-cyan-400 transition-all hover:opacity-80"
                style={{ height: `${(value / 500) * 160}px` }}
                title={`${months[index]}: ${value}`}
              />

              <span className={`text-xs font-medium ${monthText}`}>
                {months[index]}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}