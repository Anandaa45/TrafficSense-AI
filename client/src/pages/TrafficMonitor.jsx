import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { RefreshCcw, Search, Volume2, Expand, MapPin, Plus, Trash2, X, Check } from 'lucide-react';
import { api } from '../lib/api.js';

// Daftar kamera tambahan yang bisa ditambahkan user
const AVAILABLE_CAMERAS = [
  { id: 'add-1', name: 'Jl. MH Thamrin', location: 'Jakarta Pusat', camera_code: 'CAM-006', status: 'lancar', network_status: 'Online', vehicles_detected: 312, confidence: 91, image_url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80', time: '08:15', boxes: [] },
  { id: 'add-2', name: 'Jl. Kuningan',   location: 'Jakarta Selatan', camera_code: 'CAM-007', status: 'padat', network_status: 'Online', vehicles_detected: 540, confidence: 88, image_url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80', time: '08:20', boxes: [] },
  { id: 'add-3', name: 'Jl. Casablanca', location: 'Jakarta Selatan', camera_code: 'CAM-008', status: 'macet',  network_status: 'Online', vehicles_detected: 890, confidence: 94, image_url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&q=80', time: '08:22', boxes: [] },
  { id: 'add-4', name: 'Jl. Rasuna Said', location: 'Jakarta Selatan', camera_code: 'CAM-009', status: 'padat', network_status: 'Online', vehicles_detected: 620, confidence: 90, image_url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80', time: '08:18', boxes: [] },
  { id: 'add-5', name: 'Jl. Kemang Raya', location: 'Jakarta Selatan', camera_code: 'CAM-010', status: 'lancar', network_status: 'Online', vehicles_detected: 198, confidence: 95, image_url: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=600&q=80', time: '08:25', boxes: [] },
  { id: 'add-6', name: 'Jl. Fatmawati',  location: 'Jakarta Selatan', camera_code: 'CAM-011', status: 'macet',  network_status: 'Offline', vehicles_detected: 740, confidence: 86, image_url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80', time: '08:10', boxes: [] },
  { id: 'add-7', name: 'Jl. TB Simatupang', location: 'Jakarta Selatan', camera_code: 'CAM-012', status: 'padat', network_status: 'Online', vehicles_detected: 480, confidence: 92, image_url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&q=80', time: '08:30', boxes: [] },
];

export default function TrafficMonitor() {
  const [cameras,      setCameras]      = useState([]);
  const [activeCamera, setActiveCamera] = useState(null);
  const [query,        setQuery]        = useState('');
  const [deletingId,   setDeletingId]   = useState(null); // camera id yang sedang konfirmasi hapus
  const [showAddModal, setShowAddModal] = useState(false);
  const [addedIds,     setAddedIds]     = useState(new Set()); // id kamera yang sudah ditambahkan

  useEffect(() => {
    api.get('/monitor/cameras').then((data) => {
      setCameras(data);
      setActiveCamera(data[0] || null);
    });
  }, []);

  const filtered = useMemo(() =>
    cameras.filter((c) =>
      `${c.name} ${c.location}`.toLowerCase().includes(query.toLowerCase())
    ), [cameras, query]);

  const onlineCount = cameras.filter((c) => c.network_status === 'Online').length;

  // ── Hapus kamera ──────────────────────────────────────────────────────────
  function handleDelete(cam) {
    const next = cameras.filter((c) => c.id !== cam.id);
    setCameras(next);
    setDeletingId(null);
    if (activeCamera?.id === cam.id) setActiveCamera(next[0] || null);
  }

  // ── Tambah kamera ─────────────────────────────────────────────────────────
  function handleAdd(cam) {
    setCameras((prev) => [...prev, cam]);
    setAddedIds((prev) => new Set([...prev, cam.id]));
    if (!activeCamera) setActiveCamera(cam);
  }

  // ── Refresh ───────────────────────────────────────────────────────────────
  function handleRefresh() {
    api.get('/monitor/cameras').then((data) => {
      setCameras(data);
      setActiveCamera(data[0] || null);
      setAddedIds(new Set());
    });
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
      {/* ── Panel kiri ── */}
      <div className="space-y-4">
        <div className="panel p-4">
          {/* Search */}
          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-400">
            <Search size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent outline-none placeholder:text-slate-500"
              placeholder="Cari lokasi, kamera, ID..."
            />
          </label>

          {/* Status bar + tombol */}
          <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
            <span>{onlineCount}/{cameras.length} Kamera Online</span>
            <div className="flex items-center gap-3">
              {/* Tambah kamera */}
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1 rounded-xl bg-cyan-500/15 px-3 py-1.5 text-cyan-400 hover:bg-cyan-500/25 transition-colors"
                title="Tambah kamera"
              >
                <Plus size={15} />
              </button>
              {/* Refresh */}
              <button onClick={handleRefresh} className="hover:text-white transition-colors" title="Refresh">
                <RefreshCcw size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Daftar kamera */}
        <div className="max-h-[680px] space-y-4 overflow-y-auto pr-1">
          {filtered.map((camera) => (
            <div key={camera.id} className="relative">
              <button
                onClick={() => setActiveCamera(camera)}
                className={`panel w-full p-3 text-left transition ${
                  activeCamera?.id === camera.id
                    ? 'border-cyan-500/60 shadow-[0_0_0_1px_rgba(34,211,238,0.16)]'
                    : ''
                }`}
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden rounded-[20px]">
                  <img src={camera.image_url} alt={camera.name} className="h-28 w-full object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-1 text-xs font-bold text-emerald-400">
                    ● LIVE
                  </span>
                  <span className={`absolute bottom-3 right-3 h-3 w-3 rounded-full ${
                    camera.status === 'macet' ? 'bg-rose-500' : camera.status === 'padat' ? 'bg-amber-400' : 'bg-emerald-400'
                  }`} />
                </div>

                {/* Info */}
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-extrabold">{camera.name}</p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                      <MapPin size={14} />{camera.location}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                    camera.status === 'macet' ? 'bg-rose-500/10 text-rose-400'
                    : camera.status === 'padat' ? 'bg-amber-500/10 text-amber-300'
                    : 'bg-emerald-500/10 text-emerald-300'
                  }`}>
                    {camera.status}
                  </span>
                </div>

                {/* Tombol delete */}
                {deletingId === camera.id ? (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="flex-1 text-xs text-slate-400">Hapus kamera ini?</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(camera); }}
                      className="flex items-center gap-1 rounded-lg bg-rose-500/20 px-3 py-1.5 text-xs font-bold text-rose-400 hover:bg-rose-500/30 transition-colors"
                    >
                      <Check size={12} /> Ya
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setDeletingId(null); }}
                      className="flex items-center gap-1 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      <X size={12} /> Batal
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeletingId(camera.id); }}
                    className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-rose-500/20 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 size={13} /> Hapus Kamera
                  </button>
                )}
              </button>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-500">
              Tidak ada kamera ditemukan
            </div>
          )}
        </div>
      </div>

      {/* ── Panel kanan (detail kamera aktif) ── */}
      {activeCamera ? (
        <div className="panel overflow-hidden p-4 md:p-5">
          <div className="relative overflow-hidden rounded-[28px]">
            <CameraStream camera={activeCamera} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06102d] via-transparent to-transparent pointer-events-none" />

            <div className="absolute left-4 top-4 flex items-center gap-3">
              <span className="rounded-full bg-black/60 px-3 py-2 text-sm font-bold text-emerald-400">
                ● LIVE • {activeCamera.time}
              </span>
              <span className="rounded-xl bg-black/55 px-3 py-2 text-sm">30 FPS</span>
            </div>

            <div className="absolute right-4 top-4 flex items-center gap-3">
              <button className="rounded-full bg-black/55 p-3 text-white"><Volume2 size={18} /></button>
              <button className="rounded-full bg-black/55 p-3 text-white"><Expand size={18} /></button>
            </div>

            {(activeCamera.boxes || []).map((box, i) => (
              <div key={i} className="absolute rounded-md border-2 border-cyan-300"
                style={{ left: `${box.x}%`, top: `${box.y}%`, width: `${box.w}%`, height: `${box.h}%` }}>
                <span className="absolute -top-5 left-0 rounded bg-cyan-300 px-1.5 py-0.5 text-[10px] font-bold text-[#06102d]">
                  car {box.score}
                </span>
              </div>
            ))}

            <div className="absolute bottom-5 left-5">
              <h3 className="text-4xl font-extrabold">{activeCamera.name}</h3>
              <p className="mt-2 text-lg text-slate-200">{activeCamera.location}</p>
            </div>

            <div className="absolute bottom-5 right-5 text-right">
              <span className={`rounded-full px-4 py-2 text-sm font-extrabold ${
                activeCamera.status === 'macet' ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {activeCamera.status.toUpperCase()}
              </span>
              <p className="mt-3 text-lg text-slate-100">{activeCamera.vehicles_detected} kendaraan terdeteksi</p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-4">
            <Stat label="ID Kamera"       value={activeCamera.camera_code} />
            <Stat label="Kendaraan"       value={activeCamera.vehicles_detected} />
            <Stat label="Confidence"      value={`${activeCamera.confidence}%`} />
            <Stat label="Status Jaringan" value={activeCamera.network_status}
              tone={activeCamera.network_status === 'Online' ? 'text-emerald-400' : 'text-rose-400'} />
          </div>
        </div>
      ) : (
        <div className="panel flex items-center justify-center p-10 text-slate-500">
          Pilih kamera dari daftar
        </div>
      )}

      {/* ── Modal Tambah Kamera ── */}
      {showAddModal && (
        <AddCameraModal
          available={AVAILABLE_CAMERAS}
          addedIds={addedIds}
          onAdd={handleAdd}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}

// ── Modal Tambah Kamera ──────────────────────────────────────────────────────
function AddCameraModal({ available, addedIds, onAdd, onClose }) {
  const [search, setSearch] = useState('');

  const filtered = available.filter((c) =>
    `${c.name} ${c.location}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b1228] p-5 shadow-2xl">
        {/* Header modal */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-white">Tambah Kamera</h3>
          <button onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Search */}
        <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-400 mb-4">
          <Search size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500 text-white"
            placeholder="Cari lokasi atau nama jalan..."
            autoFocus
          />
        </label>

        {/* Daftar kamera tersedia */}
        <div className="max-h-[380px] space-y-3 overflow-y-auto pr-1">
          {filtered.map((cam) => {
            const sudahDitambah = addedIds.has(cam.id);
            return (
              <div key={cam.id} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 p-3">
                <img src={cam.image_url} alt={cam.name} className="h-14 w-20 flex-shrink-0 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white truncate">{cam.name}</p>
                  <p className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                    <MapPin size={11} />{cam.location}
                  </p>
                  <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    cam.status === 'macet' ? 'bg-rose-500/15 text-rose-400'
                    : cam.status === 'padat' ? 'bg-amber-500/15 text-amber-300'
                    : 'bg-emerald-500/15 text-emerald-300'
                  }`}>
                    {cam.status}
                  </span>
                </div>
                <button
                  onClick={() => !sudahDitambah && onAdd(cam)}
                  disabled={sudahDitambah}
                  className={`flex-shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-colors ${
                    sudahDitambah
                      ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                      : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
                  }`}
                >
                  {sudahDitambah ? <Check size={14} /> : <Plus size={14} />}
                </button>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="py-10 text-center text-slate-500 text-sm">
              Tidak ada kamera ditemukan
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 py-3 font-bold text-white hover:opacity-90 transition-opacity"
        >
          Selesai
        </button>
      </div>
    </div>
  );
}

// ── Sub-komponen ─────────────────────────────────────────────────────────────
function CameraStream({ camera }) {
  if (!camera?.stream_url) {
    return <img src={camera.image_url} alt={camera.name} className="h-[390px] w-full object-cover brightness-90 md:h-[470px]" />;
  }
  if (camera.stream_type === 'iframe') {
    return (
      <div className="flex h-[390px] w-full flex-col items-center justify-center rounded-[28px] bg-black/60 text-center md:h-[470px]">
        <p className="text-lg font-bold text-white">Live CCTV tersedia di sumber resmi</p>
        <p className="mt-2 text-sm text-slate-400">Klik tombol di bawah untuk membuka kamera.</p>
        <a href={camera.stream_url} target="_blank" rel="noreferrer"
          className="mt-5 rounded-2xl bg-cyan-500 px-5 py-3 font-bold text-white">
          Buka CCTV Resmi
        </a>
      </div>
    );
  }
  return <img src={camera.stream_url || camera.image_url} alt={camera.name} className="h-[390px] w-full object-cover brightness-90 md:h-[470px]" />;
}

function Stat({ label, value, tone = 'text-white' }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-[#08122f] p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className={`mt-2 text-[30px] font-extrabold ${tone}`}>{value}</p>
    </div>
  );
}