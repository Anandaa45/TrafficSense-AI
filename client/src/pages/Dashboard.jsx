import React from 'react';
import { Activity, AlertTriangle, BarChart3, Camera, Car, CheckCircle, Cpu, MapPin } from 'lucide-react';

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

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Metric icon={<Car />} label="Total Kendaraan" value="12.853" sub="Hari ini" color="text-cyan-300" />
        <Metric icon={<AlertTriangle />} label="Titik Kemacetan" value="7" sub="Dari 24 lokasi" color="text-rose-400" />
        <Metric icon={<CheckCircle />} label="Akurasi Model AI" value="96.4%" sub="YOLOv8 Detection" color="text-emerald-400" />
        <Metric icon={<Camera />} label="Kamera Aktif" value="18/24" sub="6 kamera offline" color="text-violet-400" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card title="Distribusi Status" subtitle="Saat ini — semua titik">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
            <div className="h-36 w-36 rounded-full" style={{ background: 'conic-gradient(#00f58d 0 42%, #ffb000 42% 77%, #ff4b63 77% 100%)' }}><div className="relative left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0b1228]" /></div>
            <div className="w-full space-y-3 text-sm"><Legend color="bg-emerald-400" label="Lancar" value="42%"/><Legend color="bg-amber-400" label="Padat" value="35%"/><Legend color="bg-rose-400" label="Macet" value="23%"/></div>
          </div>
        </Card>
        <Card title="Volume Kendaraan/Jam" subtitle="" action="Dataset">
          <div className="mt-4 flex h-44 items-end gap-4 border-b border-slate-700/60 px-4">
            {[880, 1400, 1850, 1320, 970, 860, 1080, 930, 870, 1010, 1460, 1940, 1760].map((v, i) => <div key={i} className="flex flex-1 flex-col items-center gap-2"><div className="w-full max-w-4 rounded-t bg-cyan-400" style={{ height: `${(v / 2000) * 150}px` }} /><span className="text-[10px] text-slate-400">{String(i + 6).padStart(2, '0')}</span></div>)}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card title="Status per Lokasi" icon={<MapPin size={18}/>}> 
          <div className="space-y-4">
            {locations.map(([name, count, status, color]) => <div key={name}><div className="mb-2 flex justify-between text-sm"><span>{name}</span><span className="text-slate-400">{count} kend. <Badge status={status}/></span></div><div className="h-2 rounded-full bg-slate-700"><div className={`h-2 rounded-full ${color}`} style={{ width: `${Math.min(count / 4, 92)}%` }} /></div></div>)}
          </div>
        </Card>
        <Card title="Deteksi Terbaru" icon={<Activity size={18}/>}>
          <div className="space-y-3">
            {detections.map(([name, count, conf, time, status]) => <div key={name} className="flex items-center justify-between rounded-xl bg-slate-800/70 p-4"><div className="flex items-start gap-3"><span className={`mt-1 h-2.5 w-2.5 rounded-full ${status === 'macet' ? 'bg-rose-500' : status === 'padat' ? 'bg-amber-400' : 'bg-emerald-400'}`} /><div><p className="font-bold">{name}</p><p className="text-sm text-slate-400">{count} kendaraan • {conf} conf</p></div></div><span className="text-sm text-slate-400">{time}</span></div>)}
          </div>
        </Card>
      </section>

      <Card title="Performa Model AI" icon={<Cpu size={18}/>} subtitle="YOLOv8 • Deep Learning">
        <div className="grid gap-5 md:grid-cols-4">
          {[['96.4%', 'Precision', 'cyan'], ['94.8%', 'Recall', 'emerald'], ['95.6%', 'F1-Score', 'violet'], ['93.2%', 'mAP@50', 'amber']].map(([value, label, color]) => <Ring key={label} value={value} label={label} color={color} />)}
        </div>
      </Card>
    </div>
  );
}

function Metric({ icon, label, value, sub, color }) { return <div className="card-dark p-5"><div className={color}>{icon}</div><p className="mt-4 text-sm text-slate-400">{label}</p><h3 className={`mt-2 text-3xl font-extrabold ${color}`}>{value}</h3><p className="text-sm text-slate-400">{sub}</p></div>; }
function Card({ title, subtitle, icon, action, children }) { return <div className="card-dark p-5"><div className="mb-4 flex items-start justify-between gap-4"><div><h3 className="flex items-center gap-2 text-xl font-extrabold text-white">{icon}<span>{title}</span></h3>{subtitle ? <p className="mt-1 text-sm text-slate-400">{subtitle}</p> : null}</div>{action ? <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300">{action}</button> : null}</div>{children}</div>; }
function Legend({ color, label, value }) { return <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-slate-300"><i className={`h-3 w-3 rounded-full ${color}`}/>{label}</span><b>{value}</b></div>; }
function Badge({ status }) { const c = status === 'macet' ? 'border-rose-500/40 bg-rose-500/10 text-rose-400' : status === 'padat' ? 'border-amber-400/40 bg-amber-400/10 text-amber-300' : 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300'; return <span className={`ml-2 status-pill ${c}`}>{status}</span>; }
function Ring({ value, label, color }) { const classes = { cyan: 'border-cyan-400 text-cyan-300', emerald: 'border-emerald-400 text-emerald-300', violet: 'border-violet-400 text-violet-300', amber: 'border-amber-400 text-amber-300' }; return <div className="text-center"><div className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full border-[7px] ${classes[color]} text-xl font-extrabold`}>{value}</div><p className="mt-3 text-sm text-slate-400">{label}</p></div>; }
