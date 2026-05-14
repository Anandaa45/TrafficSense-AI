import React from 'react';
import { useEffect, useState } from 'react';
import { AlertTriangle, Camera, CheckCircle2, CarFront, SlidersHorizontal } from 'lucide-react';
import SummaryCard from '../components/SummaryCard.jsx';
import { api } from '../lib/api.js';

const lineData = {
  lancar: [42, 38, 55, 72, 44, 60, 54, 68, 37, 30, 66, 79],
  padat: [18, 12, 10, 35, 65, 50, 58, 44, 70, 79, 46, 25],
  macet: [6, 0, 0, 8, 28, 16, 22, 13, 36, 42, 15, 8],
};

export default function Dashboard() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/overview')
      .then(setOverview)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <section className="grid gap-5 xl:grid-cols-4 md:grid-cols-2">
        <SummaryCard
          icon={<CarFront size={22} />}
          title="Total Kendaraan Terdeteksi"
          value={loading ? '...' : overview?.vehicles_today?.toLocaleString('id-ID')}
          subtitle="Hari ini"
          badge="+8.2%"
          badgeTone="emerald"
          accent="cyan"
        />
        <SummaryCard
          icon={<AlertTriangle size={22} />}
          title="Titik Kemacetan Aktif"
          value={loading ? '...' : overview?.active_jams}
          subtitle="Dari 24 lokasi"
          badge="+2"
          badgeTone="rose"
          accent="rose"
        />
        <SummaryCard
          icon={<CheckCircle2 size={22} />}
          title="Akurasi Model AI"
          value={loading ? '...' : `${overview?.ai_accuracy}%`}
          subtitle="YOLOv8 Detection"
          badge="+1.2%"
          badgeTone="emerald"
          accent="emerald"
        />
        <SummaryCard
          icon={<Camera size={22} />}
          title="Kamera Aktif"
          value={loading ? '...' : `${overview?.online_cameras}/${overview?.total_cameras}`}
          subtitle={`${overview?.offline_cameras} kamera offline`}
          badge="75%"
          badgeTone="violet"
          accent="violet"
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_335px]">
        <div className="panel p-5 md:p-6">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-[34px] font-extrabold">Tren Kepadatan Lalu Lintas</h3>
              <p className="mt-2 text-sm text-slate-400">24 jam terakhir — semua lokasi</p>
              <div className="mt-4 flex flex-wrap gap-5 text-sm font-bold">
                <Legend color="bg-emerald-400" label="Lancar" />
                <Legend color="bg-amber-400" label="Padat" />
                <Legend color="bg-rose-400" label="Macet" />
              </div>
            </div>
            <button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2"><SlidersHorizontal size={16} /> Dataset</span>
            </button>
          </div>
          <TrafficLineChart data={lineData} />
        </div>

        <div className="panel p-5 md:p-6">
          <h3 className="text-[34px] font-extrabold">Distribusi Status</h3>
          <p className="mt-2 text-sm text-slate-400">Saat ini — semua titik</p>
          <div className="mx-auto mt-8 h-56 w-56 rounded-full" style={{ background: 'conic-gradient(#12f48b 0% 42%, #ffb100 42% 75%, #ff4b63 75% 100%)' }}>
            <div className="mx-auto mt-8 flex h-40 w-40 items-center justify-center rounded-full bg-[#07122f] text-center">
              <div>
                <p className="text-sm text-slate-400">Total Titik</p>
                <p className="text-4xl font-extrabold">24</p>
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-4 text-sm">
            <StatusRow color="bg-emerald-400" label="Lancar" value="42%" />
            <StatusRow color="bg-amber-400" label="Padat" value="33%" />
            <StatusRow color="bg-rose-400" label="Macet" value="25%" />
          </div>
        </div>
      </section>
    </div>
  );
}

function Legend({ color, label }) {
  return <div className="flex items-center gap-2 text-slate-200"><span className={`h-2.5 w-2.5 rounded-full ${color}`} />{label}</div>;
}

function StatusRow({ color, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 text-slate-300"><span className={`h-3 w-3 rounded-full ${color}`} />{label}</div>
      <span className="font-bold text-white">{value}</span>
    </div>
  );
}

function TrafficLineChart({ data }) {
  const width = 820;
  const height = 360;
  const padding = 24;
  const max = 80;
  const months = ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22'];
  const colors = {
    lancar: '#12f48b',
    padat: '#ffb100',
    macet: '#ff4b63',
  };

  const makePath = (values) => values.map((value, index) => {
    const x = padding + (index * (width - padding * 2)) / (values.length - 1);
    const y = height - padding - (value / max) * (height - padding * 2);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[760px]">
        {[0, 20, 40, 60, 80].map((yValue) => {
          const y = height - padding - (yValue / max) * (height - padding * 2);
          return (
            <g key={yValue}>
              <line x1={padding} x2={width - padding} y1={y} y2={y} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 6" />
              <text x={6} y={y + 4} fill="#7183b5" fontSize="12">{yValue}</text>
            </g>
          );
        })}

        {months.map((label, index) => {
          const x = padding + (index * (width - padding * 2)) / (months.length - 1);
          return <text key={label} x={x - 8} y={height - 4} fill="#7183b5" fontSize="12">{label}</text>;
        })}

        {Object.entries(data).map(([key, values]) => (
          <path key={key} d={makePath(values)} fill="none" stroke={colors[key]} strokeWidth="3" strokeLinecap="round" />
        ))}
      </svg>
    </div>
  );
}

