import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { RefreshCcw, Search, Volume2, Expand, MapPin } from 'lucide-react';
import { api } from '../lib/api.js';

export default function TrafficMonitor() {
  const [cameras, setCameras] = useState([]);
  const [activeCamera, setActiveCamera] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    api.get('/monitor/cameras').then((data) => {
      setCameras(data);
      setActiveCamera(data[0] || null);
    });
  }, []);

  const filtered = useMemo(() => cameras.filter((camera) => {
    const text = `${camera.name} ${camera.location}`.toLowerCase();
    return text.includes(query.toLowerCase());
  }), [cameras, query]);

  const onlineCount = cameras.filter((camera) => camera.network_status === 'Online').length;

  return (
    <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
      <div className="space-y-4">
        <div className="panel p-4">
          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-400">
            <Search size={18} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-transparent outline-none placeholder:text-slate-500" placeholder="Cari lokasi, kamera, ID..." />
          </label>
          <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
            <span>{onlineCount}/{cameras.length} Kamera Online</span>
            <RefreshCcw size={16} />
          </div>
        </div>

        <div className="max-h-[680px] space-y-4 overflow-y-auto pr-1">
          {filtered.map((camera) => (
            <button key={camera.id} onClick={() => setActiveCamera(camera)} className={`panel w-full p-3 text-left transition ${activeCamera?.id === camera.id ? 'border-cyan-500/60 shadow-[0_0_0_1px_rgba(34,211,238,0.16)]' : ''}`}>
              <div className="relative overflow-hidden rounded-[20px]">
                <img src={camera.image_url} alt={camera.name} className="h-28 w-full object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-1 text-xs font-bold text-emerald-400">● LIVE</span>
                <span className={`absolute bottom-3 right-3 h-3 w-3 rounded-full ${camera.status === 'macet' ? 'bg-rose-500' : camera.status === 'padat' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-extrabold">{camera.name}</p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-slate-400"><MapPin size={14} /> {camera.location}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${camera.status === 'macet' ? 'bg-rose-500/10 text-rose-400' : camera.status === 'padat' ? 'bg-amber-500/10 text-amber-300' : 'bg-emerald-500/10 text-emerald-300'}`}>{camera.status}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeCamera ? (
        <div className="panel overflow-hidden p-4 md:p-5">
          <div className="relative overflow-hidden rounded-[28px]">
            <imgCameraStream camera={activeCamera} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06102d] via-transparent to-transparent" />
            <div className="absolute left-4 top-4 flex items-center gap-3">
              <span className="rounded-full bg-black/60 px-3 py-2 text-sm font-bold text-emerald-400">● LIVE • {activeCamera.time}</span>
              <span className="rounded-xl bg-black/55 px-3 py-2 text-sm">30 FPS</span>
            </div>
            <div className="absolute right-4 top-4 flex items-center gap-3">
              <button className="rounded-full bg-black/55 p-3 text-white"><Volume2 size={18} /></button>
              <button className="rounded-full bg-black/55 p-3 text-white"><Expand size={18} /></button>
            </div>
            {activeCamera.boxes.map((box, index) => (
              <div key={index} className="absolute rounded-md border-2 border-cyan-300" style={{ left: `${box.x}%`, top: `${box.y}%`, width: `${box.w}%`, height: `${box.h}%` }}>
                <span className="absolute -top-5 left-0 rounded bg-cyan-300 px-1.5 py-0.5 text-[10px] font-bold text-[#06102d]">car {box.score}</span>
              </div>
            ))}
            <div className="absolute bottom-5 left-5">
              <h3 className="text-4xl font-extrabold">{activeCamera.name}</h3>
              <p className="mt-2 text-lg text-slate-200">{activeCamera.location}</p>
            </div>
            <div className="absolute bottom-5 right-5 text-right">
              <span className={`rounded-full px-4 py-2 text-sm font-extrabold ${activeCamera.status === 'macet' ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'}`}>{activeCamera.status.toUpperCase()}</span>
              <p className="mt-3 text-lg text-slate-100">{activeCamera.vehicles_detected} kendaraan terdeteksi</p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-4">
            <Stat label="ID Kamera" value={activeCamera.camera_code} />
            <Stat label="Kendaraan" value={activeCamera.vehicles_detected} />
            <Stat label="Confidence" value={`${activeCamera.confidence}%`} />
            <Stat label="Status Jaringan" value={activeCamera.network_status} tone={activeCamera.network_status === 'Online' ? 'text-emerald-400' : 'text-rose-400'} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Stat({ label, value, tone = 'text-white' }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-[#08122f] p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className={`mt-2 text-[30px] font-extrabold ${tone}`}>{value}</p>
    </div>function CameraStream({ camera }) {
  if (!camera?.stream_url) {
    return (
      <img
        src={camera.image_url}
        alt={camera.name}
        className="h-[390px] w-full object-cover brightness-90 md:h-[470px]"
      />
    );
  }

  if (camera.stream_type === 'iframe') {
  return (
    <div className="flex h-[390px] w-full flex-col items-center justify-center rounded-[28px] bg-black/60 text-center md:h-[470px]">
      <p className="text-lg font-bold text-white">
        Live CCTV tersedia di sumber resmi
      </p>

      <p className="mt-2 text-sm text-slate-400">
        Klik tombol di bawah untuk membuka kamera OpenCCTV.
      </p>

      <a
        href={camera.stream_url}
        target="_blank"
        rel="noreferrer"
        className="mt-5 rounded-2xl bg-cyan-500 px-5 py-3 font-bold text-white"
      >
        Buka CCTV Resmi
      </a>
    </div>
  );
}

  if (camera.stream_type === 'image') {
    return (
      <img
        src={camera.stream_url}
        alt={camera.name}
        className="h-[390px] w-full object-cover brightness-90 md:h-[470px]"
      />
    );
  }

  return (
    <img
      src={camera.image_url}
      alt={camera.name}
      className="h-[390px] w-full object-cover brightness-90 md:h-[470px]"
    />
  );
}
  );
}

