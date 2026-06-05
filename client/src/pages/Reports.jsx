import React, { useState } from 'react';
import {
  AlertTriangle,
  ChevronRight,
  X,
  MapPin,
  Clock,
  Car,
  Activity,
  CheckCircle2,
  Route,
} from 'lucide-react';
import { useTheme } from '../Context/ThemeContext.jsx';

const incidents = [
  {
    id: 1,
    road: 'Jl. Sudirman',
    type: 'Macet',
    duration: '2j18m',
    vehicles: 48,
    time: '07:42',
    date: '18 Mei 2025',
    status: 'Resolved',
    level: 'Sedang',
    color: 'green',
    description:
      'Kepadatan lalu lintas terjadi pada jam berangkat kerja. Arus kendaraan sudah kembali normal setelah dilakukan pengalihan ringan.',
    recommendation:
      'Tetap pantau arus kendaraan pada jam 07:00 - 09:00 karena lokasi ini berpotensi padat saat hari kerja.',
  },
  {
    id: 2,
    road: 'Bundaran HI',
    type: 'Kecelakaan',
    duration: '45m',
    vehicles: 32,
    time: '09:15',
    date: '18 Mei 2025',
    status: 'Resolved',
    level: 'Rendah',
    color: 'green',
    description:
      'Terjadi kecelakaan ringan yang menyebabkan perlambatan arus lalu lintas sementara di sekitar Bundaran HI.',
    recommendation:
      'Area sudah kembali lancar, tetapi sistem tetap menyarankan pemantauan kamera selama 30 menit setelah insiden.',
  },
  {
    id: 3,
    road: 'Jl. TB Simatupang',
    type: 'Macet',
    duration: '1j32m',
    vehicles: 51,
    time: '17:30',
    date: '18 Mei 2025',
    status: 'Aktif',
    level: 'Tinggi',
    color: 'pink',
    description:
      'Kepadatan tinggi terdeteksi pada jam pulang kerja. Volume kendaraan meningkat dan kecepatan rata-rata menurun.',
    recommendation:
      'Disarankan pengalihan rute sementara dan peningkatan pemantauan pada titik masuk persimpangan.',
  },
  {
    id: 4,
    road: 'Jl. Gatot Subroto',
    type: 'Macet',
    duration: '55m',
    vehicles: 38,
    time: '18:05',
    date: '18 Mei 2025',
    status: 'Aktif',
    level: 'Tinggi',
    color: 'pink',
    description:
      'Kemacetan aktif terjadi karena peningkatan volume kendaraan pada sore hari.',
    recommendation:
      'Sistem menyarankan monitoring lanjutan dan memberi peringatan kepada pengguna untuk memilih rute alternatif.',
  },
];

export default function Reports() {
  const { isDark } = useTheme();
  const [selectedIncident, setSelectedIncident] = useState(null);

  const pageCard = isDark
    ? 'border-slate-700/70 bg-[#0b1228]/95 text-white'
    : 'border-white/80 bg-white/75 text-slate-950';

  const rowBorder = isDark ? 'border-slate-700/50' : 'border-slate-200/80';

  const rowHover = isDark
    ? 'hover:bg-white/[0.04]'
    : 'hover:bg-cyan-50/80';

  const mutedText = isDark ? 'text-slate-400' : 'text-slate-500';

  const panelBg = isDark
    ? 'border-slate-700 bg-[#080f26] text-white'
    : 'border-slate-200 bg-white text-slate-950';

  const panelCard = isDark
    ? 'border-slate-700 bg-white/5'
    : 'border-slate-200 bg-slate-50';

  return (
    <div className="relative">
      <section
        className={`overflow-hidden rounded-2xl border shadow-xl backdrop-blur-xl transition-colors duration-300 ${pageCard}`}
      >
        <div className={`flex items-center justify-between border-b px-5 py-5 ${rowBorder}`}>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500/10 text-pink-500">
              <AlertTriangle size={18} />
            </div>

            <div>
              <h2 className="text-lg font-extrabold">Insiden Hari Ini</h2>
              <p className={`text-xs ${mutedText}`}>
                Ringkasan kondisi lalu lintas terbaru
              </p>
            </div>
          </div>

          <p className={`text-sm font-medium ${mutedText}`}>18 Mei 2025</p>
        </div>

        <div>
          {incidents.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedIncident(item)}
              className={`group flex w-full items-center justify-between border-b px-5 py-5 text-left transition-colors duration-200 last:border-b-0 ${rowBorder} ${rowHover}`}
            >
              <div className="flex min-w-0 items-start gap-4">
                <span
                  className={`mt-1.5 h-3 w-3 flex-shrink-0 rounded-full shadow-lg ${
                    item.color === 'green'
                      ? 'bg-emerald-400 shadow-emerald-400/40'
                      : 'bg-pink-500 shadow-pink-500/40'
                  }`}
                />

                <div className="min-w-0">
                  <h3 className="truncate font-extrabold">
                    {item.road}
                  </h3>

                  <p className={`mt-2 text-sm ${mutedText}`}>
                    Tipe: {item.type}
                    <span className="mx-2">•</span>
                    Durasi: {item.duration}
                    <span className="mx-2">•</span>
                    {item.vehicles} kendaraan
                  </p>
                </div>
              </div>

              <div className="ml-4 flex items-center gap-5">
                <div className="text-right">
                  <p className={`text-sm ${mutedText}`}>{item.time}</p>

                  <p
                    className={`font-extrabold ${
                      item.status === 'Resolved'
                        ? 'text-emerald-400'
                        : 'text-pink-500'
                    }`}
                  >
                    {item.status}
                  </p>
                </div>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                    isDark
                      ? 'text-slate-500 group-hover:bg-cyan-500/10 group-hover:text-cyan-400'
                      : 'text-slate-400 group-hover:bg-cyan-100 group-hover:text-cyan-600'
                  }`}
                >
                  <ChevronRight size={22} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {selectedIncident && (
        <button
          type="button"
          aria-label="Tutup detail insiden"
          onClick={() => setSelectedIncident(null)}
          className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm"
        />
      )}

      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-md border-l shadow-2xl transition-transform duration-300 ${
          selectedIncident ? 'translate-x-0' : 'translate-x-full'
        } ${panelBg}`}
      >
        {selectedIncident && (
          <div className="flex h-full flex-col">
            <div className={`flex items-center justify-between border-b px-6 py-5 ${rowBorder}`}>
              <div>
                <p className="text-sm font-extrabold text-cyan-400">
                  Side Information
                </p>
                <h2 className="mt-1 text-2xl font-extrabold">
                  {selectedIncident.road}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedIncident(null)}
                className={`rounded-xl p-2 transition ${
                  isDark
                    ? 'text-slate-400 hover:bg-white/10 hover:text-white'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-950'
                }`}
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-6">
              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
                <div className="flex items-center gap-3">
                  <MapPin className="text-cyan-400" size={22} />

                  <div>
                    <p className={`text-sm ${mutedText}`}>Lokasi Jalan</p>
                    <h3 className="font-extrabold">
                      {selectedIncident.road}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InfoBox
                  icon={<Clock size={22} />}
                  label="Waktu"
                  value={selectedIncident.time}
                  isDark={isDark}
                />

                <InfoBox
                  icon={<Activity size={22} />}
                  label="Durasi"
                  value={selectedIncident.duration}
                  isDark={isDark}
                />

                <InfoBox
                  icon={<Car size={22} />}
                  label="Kendaraan"
                  value={`${selectedIncident.vehicles}`}
                  isDark={isDark}
                />

                <InfoBox
                  icon={<CheckCircle2 size={22} />}
                  label="Status"
                  value={selectedIncident.status}
                  isDark={isDark}
                  valueClass={
                    selectedIncident.status === 'Resolved'
                      ? 'text-emerald-400'
                      : 'text-pink-500'
                  }
                />
              </div>

              <div className={`rounded-2xl border p-5 ${panelCard}`}>
                <div className="flex items-center gap-3">
                  <Route size={22} className="text-cyan-400" />

                  <div>
                    <p className={`text-sm ${mutedText}`}>Tipe Insiden</p>
                    <h3 className="text-xl font-extrabold">
                      {selectedIncident.type}
                    </h3>
                  </div>
                </div>

                <p className={`mt-4 text-sm leading-6 ${mutedText}`}>
                  {selectedIncident.description}
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
                <p className="text-sm font-extrabold text-cyan-400">
                  Rekomendasi AI
                </p>

                <p className={`mt-3 text-sm leading-6 ${mutedText}`}>
                  {selectedIncident.recommendation}
                </p>
              </div>

              <div className={`rounded-2xl border p-5 ${panelCard}`}>
                <p className={`text-sm ${mutedText}`}>Tingkat Kepadatan</p>

                <div
                  className={`mt-3 h-3 rounded-full ${
                    isDark ? 'bg-slate-700' : 'bg-slate-200'
                  }`}
                >
                  <div
                    className={`h-3 rounded-full ${
                      selectedIncident.level === 'Tinggi'
                        ? 'w-[85%] bg-pink-500'
                        : selectedIncident.level === 'Sedang'
                        ? 'w-[60%] bg-yellow-400'
                        : 'w-[35%] bg-emerald-400'
                    }`}
                  />
                </div>

                <p className="mt-3 font-extrabold">
                  {selectedIncident.level}
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

function InfoBox({ icon, label, value, isDark, valueClass = '' }) {
  return (
    <div
      className={`rounded-2xl border p-4 transition-colors duration-300 ${
        isDark
          ? 'border-slate-700 bg-white/5'
          : 'border-slate-200 bg-slate-50'
      }`}
    >
      <div className="mb-3 text-cyan-400">{icon}</div>

      <p className={isDark ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>
        {label}
      </p>

      <h3 className={`mt-1 font-extrabold ${valueClass}`}>{value}</h3>
    </div>
  );
}