import React from 'react';
import { useEffect, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { api } from '../lib/api.js';

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/analytics').then(setData);
  }, []);

  if (!data) {
    return <div className="panel p-6 text-slate-300">Memuat data analytics...</div>;
  }

  const maxWeekly = Math.max(...data.weekly.flatMap((item) => [item.lancar, item.padat, item.macet]));
  const maxMonthly = Math.max(...data.monthly.map((item) => item.total));

  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-2">
        <div className="panel p-5 md:p-6">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-[34px] font-extrabold">Tren Mingguan Kepadatan</h3>
              <p className="mt-2 text-sm text-slate-400">Distribusi status lalu lintas per hari (7 hari terakhir)</p>
              <div className="mt-4 flex flex-wrap gap-5 text-sm font-bold">
                <Legend color="bg-emerald-400" label="Lancar" />
                <Legend color="bg-amber-400" label="Padat" />
                <Legend color="bg-rose-400" label="Macet" />
              </div>
            </div>
            <button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 inline-flex items-center gap-2"><SlidersHorizontal size={16} /> Dataset</button>
          </div>

          <div className="grid grid-cols-7 gap-4 pt-4">
            {data.weekly.map((item) => (
              <div key={item.day} className="flex flex-col items-center gap-3">
                <div className="flex h-[210px] items-end gap-2">
                  <Bar value={item.lancar} max={maxWeekly} color="bg-emerald-400" />
                  <Bar value={item.padat} max={maxWeekly} color="bg-amber-400" />
                  <Bar value={item.macet} max={maxWeekly} color="bg-rose-400" />
                </div>
                <p className="text-sm text-slate-400">{item.day}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-5 md:p-6">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-[34px] font-extrabold">Volume Kendaraan Bulanan</h3>
              <p className="mt-2 text-sm text-slate-400">Total kendaraan terdeteksi — pilih dataset untuk perbandingan</p>
              <p className="mt-5 text-cyan-300">● Total 2025</p>
            </div>
            <button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 inline-flex items-center gap-2"><SlidersHorizontal size={16} /> Dataset</button>
          </div>
          <div className="overflow-x-auto">
            <svg viewBox="0 0 720 300" className="min-w-[680px]">
              {[0, 150, 300, 450, 600].map((value, index) => {
                const y = 250 - (value / maxMonthly) * 200;
                return (
                  <g key={value}>
                    <line x1="50" x2="680" y1={y} y2={y} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 6" />
                    <text x="8" y={y + 4} fill="#7183b5" fontSize="12">{value}K</text>
                  </g>
                );
              })}
              <polyline
                fill="none"
                stroke="#12c9ff"
                strokeWidth="4"
                points={data.monthly.map((item, index) => `${60 + index * 55},${250 - (item.total / maxMonthly) * 200}`).join(' ')}
              />
              {data.monthly.map((item, index) => {
                const x = 60 + index * 55;
                const y = 250 - (item.total / maxMonthly) * 200;
                return (
                  <g key={item.month}>
                    <circle cx={x} cy={y} r="5" fill="#12c9ff" />
                    <text x={x - 10} y="280" fill="#7183b5" fontSize="12">{item.month}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Card title="Perbandingan Model" subtitle="YOLOv8 vs Manual">
          <Metric label="Akurasi" value="96.4%" />
          <Metric label="Precision" value="94.8%" />
          <Metric label="Recall" value="93.1%" />
        </Card>
        <Card title="Jenis Kendaraan" subtitle="Distribusi tipe kendaraan terdeteksi">
          {data.vehicleTypes.map((item) => (
            <Progress key={item.name} label={item.name} value={item.value} />
          ))}
        </Card>
        <Card title="Jam Puncak per Lokasi" subtitle="Rata-rata volume kendaraan tertinggi">
          {data.peakHours.map((item) => (
            <div key={item.location} className="mb-4 rounded-2xl bg-white/4 px-4 py-3">
              <div className="flex items-center justify-between gap-4">
                <p className="font-bold">{item.location}</p>
                <p className="text-cyan-300">{item.hour}</p>
              </div>
              <p className="mt-1 text-sm text-slate-400">{item.count.toLocaleString('id-ID')} kendaraan</p>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

function Legend({ color, label }) {
  return <div className="flex items-center gap-2 text-slate-200"><span className={`h-2.5 w-2.5 rounded-full ${color}`} />{label}</div>;
}

function Bar({ value, max, color }) {
  return <div className={`w-4 rounded-full ${color}`} style={{ height: `${(value / max) * 190}px` }} />;
}

function Card({ title, subtitle, children }) {
  return (
    <div className="panel p-5 md:p-6">
      <h3 className="text-[32px] font-extrabold">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
      <div className="mt-6 space-y-4">{children}</div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/4 px-4 py-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-cyan-300">{value}</p>
    </div>
  );
}

function Progress({ label, value }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm"><span>{label}</span><span className="font-bold">{value}%</span></div>
      <div className="h-3 rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${value}%` }} /></div>
    </div>
  );
}

