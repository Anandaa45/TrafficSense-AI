import React, { useState } from 'react';
import {
  AlertTriangle,
  ChevronRight,
  Clock,
  MapPin,
  X,
  Car,
  Activity,
  CheckCircle2,
} from 'lucide-react';

const incidents = [
  {
    id: 1,
    road: 'Jl. Sudirman',
    type: 'Macet',
    duration: '2j 18m',
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
      'Terjadi insiden kecelakaan ringan yang menyebabkan perlambatan arus lalu lintas sementara.',
    recommendation:
      'Area sudah kembali lancar, tetapi sistem tetap menyarankan pemantauan kamera selama 30 menit setelah insiden.',
  },
  {
    id: 3,
    road: 'Jl. TB Simatupang',
    type: 'Macet',
    duration: '1j 32m',
    vehicles: 51,
    time: '17:30',
    date: '18 Mei 2025',
    status: 'Aktif',
    level: 'Tinggi',
    color: 'red',
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
    color: 'red',
    description:
      'Kemacetan aktif terjadi karena peningkatan volume kendaraan pada sore hari.',
    recommendation:
      'Sistem menyarankan monitoring lanjutan dan memberi peringatan kepada pengguna untuk memilih rute alternatif.',
  },
];

export default function Reports() {
  const [selectedIncident, setSelectedIncident] = useState(null);

  return (
    <div className="relative">
      <div className="rounded-2xl border border-slate-700 bg-[#0b1228]">
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-5">
          <div className="flex items-center gap-3">
            <AlertTriangle size={18} className="text-pink-500" />
            <h2 className="text-lg font-extrabold text-white">
              Insiden Hari Ini
            </h2>
          </div>

          <p className="text-sm text-slate-400">18 Mei 2025</p>
        </div>

        <div>
          {incidents.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-slate-800 px-5 py-5 last:border-b-0"
            >
              <div className="flex items-start gap-4">
                <span
                  className={`mt-1 h-3 w-3 rounded-full ${
                    item.color === 'green' ? 'bg-emerald-400' : 'bg-pink-500'
                  }`}
                />

                <div>
                  <h3 className="font-extrabold text-white">{item.road}</h3>

                  <p className="mt-2 text-sm text-slate-400">
                    Tipe: {item.type} &nbsp; Durasi: {item.duration} &nbsp;
                    {item.vehicles} kendaraan
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="text-right">
                  <p className="text-sm text-slate-400">{item.time}</p>

                  <p
                    className={`font-bold ${
                      item.status === 'Resolved'
                        ? 'text-emerald-400'
                        : 'text-pink-500'
                    }`}
                  >
                    {item.status}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedIncident(item)}
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-white/10 hover:text-cyan-300"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {selectedIncident && (
        <button
          type="button"
          aria-label="Tutup side information"
          onClick={() => setSelectedIncident(null)}
          className="fixed inset-0 z-40 bg-black/50"
        />
      )}

      {/* Side Information */}
      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-md border-l border-slate-700 bg-[#080f26] shadow-2xl transition-transform duration-300 ${
          selectedIncident ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedIncident && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
              <div>
                <p className="text-sm font-bold text-cyan-400">
                  Side Information
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-white">
                  {selectedIncident.road}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedIncident(null)}
                className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-6">
              <div className="rounded-2xl border border-slate-700 bg-white/5 p-5">
                <div className="flex items-center gap-3">
                  <MapPin className="text-cyan-400" size={22} />
                  <div>
                    <p className="text-sm text-slate-400">Lokasi Jalan</p>
                    <h3 className="font-extrabold text-white">
                      {selectedIncident.road}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-700 bg-white/5 p-4">
                  <Clock className="mb-3 text-cyan-400" size={22} />
                  <p className="text-sm text-slate-400">Waktu</p>
                  <h3 className="mt-1 font-extrabold text-white">
                    {selectedIncident.time}
                  </h3>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-white/5 p-4">
                  <Activity className="mb-3 text-cyan-400" size={22} />
                  <p className="text-sm text-slate-400">Durasi</p>
                  <h3 className="mt-1 font-extrabold text-white">
                    {selectedIncident.duration}
                  </h3>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-white/5 p-4">
                  <Car className="mb-3 text-cyan-400" size={22} />
                  <p className="text-sm text-slate-400">Kendaraan</p>
                  <h3 className="mt-1 font-extrabold text-white">
                    {selectedIncident.vehicles}
                  </h3>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-white/5 p-4">
                  <CheckCircle2
                    className={
                      selectedIncident.status === 'Resolved'
                        ? 'mb-3 text-emerald-400'
                        : 'mb-3 text-pink-500'
                    }
                    size={22}
                  />
                  <p className="text-sm text-slate-400">Status</p>
                  <h3
                    className={`mt-1 font-extrabold ${
                      selectedIncident.status === 'Resolved'
                        ? 'text-emerald-400'
                        : 'text-pink-500'
                    }`}
                  >
                    {selectedIncident.status}
                  </h3>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-white/5 p-5">
                <p className="text-sm text-slate-400">Tipe Insiden</p>
                <h3 className="mt-1 text-xl font-extrabold text-white">
                  {selectedIncident.type}
                </h3>

                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {selectedIncident.description}
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
                <p className="text-sm font-bold text-cyan-400">
                  Rekomendasi AI
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {selectedIncident.recommendation}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-white/5 p-5">
                <p className="text-sm text-slate-400">Tingkat Kepadatan</p>

                <div className="mt-3 h-3 rounded-full bg-slate-700">
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

                <p className="mt-3 font-bold text-white">
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