import React from 'react';
import { Activity, AlertTriangle, BarChart3, Camera, Car, CheckCircle, Cpu, MapPin } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, } from "recharts";

const locations = [
  ['Jl. Sudirman', 342, 'macet', 'bg-rose-500'],
  ['Jl. Thamrin', 218, 'padat', 'bg-amber-400'],
  ['Jl. Gatot Subroto', 156, 'padat', 'bg-amber-400'],
  ['Jl. HR Rasuna Said', 89, 'lancar', 'bg-emerald-400'],
  ['Jl. TB Simatupang', 275, 'macet', 'bg-rose-500'],
  ['Jl. Kuningan Mulia', 112, 'lancar', 'bg-emerald-400'],
];
const detections = [
  ['Jl. Sudirman Km 2.4', 48, '97.2%', '18:42:15', 'macet'],
  ['Jl. Thamrin Bundaran HI', 32, '94.8%', '18:42:08', 'padat'],
  ['Jl. TB Simatupang', 51, '96.1%', '18:41:55', 'macet'],
  ['Jl. HR Rasuna Said', 12, '98.5%', '18:41:42', 'lancar'],
  ['Jl. Gatot Subroto', 28, '93.7%', '18:41:30', 'padat'],
];
const trafficTrendData = [
  { time: "02:00", lancar: 40, padat: 18, macet: 8 },
  { time: "04:00", lancar: 38, padat: 12, macet: 5 },
  { time: "06:00", lancar: 45, padat: 10, macet: 4 },
  { time: "08:00", lancar: 72, padat: 35, macet: 28 },
  { time: "10:00", lancar: 48, padat: 66, macet: 14 },
  { time: "12:00", lancar: 60, padat: 52, macet: 22 },
  { time: "14:00", lancar: 58, padat: 57, macet: 12 },
  { time: "16:00", lancar: 70, padat: 45, macet: 30 },
  { time: "18:00", lancar: 36, padat: 78, macet: 42 },
  { time: "20:00", lancar: 30, padat: 48, macet: 15 },
  { time: "22:00", lancar: 80, padat: 25, macet: 8 },
];

const trafficStatusData = [
  { name: "Lancar", value: 42, color: "#22c55e" },
  { name: "Padat", value: 35, color: "#f59e0b" },
  { name: "Macet", value: 23, color: "#ef4444" },
];

export default function Dashboard() {
  return (
   <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
  {/* Tren Kepadatan */}
  <div className="glass-card rounded-3xl p-5 xl:col-span-2">
    <div className="mb-4 flex items-start justify-between">
      <div>
        <h3 className="text-xl font-bold text-slate-900">
          Tren Kepadatan Lalu Lintas
        </h3>
        <p className="text-sm text-slate-500">
          24 jam terakhir — semua lokasi
        </p>
      </div>

      <button className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm font-medium text-slate-600">
        Dataset
      </button>
    </div>

    <div className="mb-4 flex flex-wrap gap-4 text-sm font-medium">
      <div className="flex items-center gap-2 text-slate-600">
        <span className="h-3 w-3 rounded-full bg-green-500"></span>
        Lancar
      </div>
      <div className="flex items-center gap-2 text-slate-600">
        <span className="h-3 w-3 rounded-full bg-amber-500"></span>
        Padat
      </div>
      <div className="flex items-center gap-2 text-slate-600">
        <span className="h-3 w-3 rounded-full bg-red-500"></span>
        Macet
      </div>
    </div>

    <div className="h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={trafficTrendData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
          <XAxis dataKey="time" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="lancar"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="padat"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="macet"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* Distribusi Status */}
  <div className="glass-card rounded-3xl p-5">
    <div className="mb-4">
      <h3 className="text-xl font-bold text-slate-900">
        Distribusi Status
      </h3>
      <p className="text-sm text-slate-500">
        Saat ini — semua titik
      </p>
    </div>

    <div className="h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={trafficStatusData}
            dataKey="value"
            nameKey="name"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
          >
            {trafficStatusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>

    <div className="mt-4 space-y-3">
      {trafficStatusData.map((item) => (
        <div key={item.name} className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.color }}
            ></span>
            {item.name}
          </div>
          <span className="text-sm font-bold text-slate-800">
            {item.value}%
          </span>
        </div>
      ))}
    </div>
  </div>
</div>
  )
}

function Metric({ icon, label, value, sub, color }) { return <div className="card-dark p-5"><div className={color}>{icon}</div><p className="mt-4 text-sm text-slate-400">{label}</p><h3 className={`mt-2 text-3xl font-extrabold ${color}`}>{value}</h3><p className="text-sm text-slate-400">{sub}</p></div>; }
function Card({ title, subtitle, icon, action, children }) { return <div className="card-dark p-5"><div className="mb-4 flex items-start justify-between gap-4"><div><h3 className="flex items-center gap-2 text-xl font-extrabold text-white">{icon}<span>{title}</span></h3>{subtitle ? <p className="mt-1 text-sm text-slate-400">{subtitle}</p> : null}</div>{action ? <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300">{action}</button> : null}</div>{children}</div>; }
function Legend({ color, label, value }) { return <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-slate-300"><i className={`h-3 w-3 rounded-full ${color}`}/>{label}</span><b>{value}</b></div>; }
function Badge({ status }) { const c = status === 'macet' ? 'border-rose-500/40 bg-rose-500/10 text-rose-400' : status === 'padat' ? 'border-amber-400/40 bg-amber-400/10 text-amber-300' : 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300'; return <span className={`ml-2 status-pill ${c}`}>{status}</span>; }
function Ring({ value, label, color }) { const classes = { cyan: 'border-cyan-400 text-cyan-300', emerald: 'border-emerald-400 text-emerald-300', violet: 'border-violet-400 text-violet-300', amber: 'border-amber-400 text-amber-300' }; return <div className="text-center"><div className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full border-[7px] ${classes[color]} text-xl font-extrabold`}>{value}</div><p className="mt-3 text-sm text-slate-400">{label}</p></div>; }
