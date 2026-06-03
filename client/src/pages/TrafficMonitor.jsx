import React, { useMemo, useState } from 'react';
import {
  UploadCloud,
  Image as ImageIcon,
  Video,
  FileCheck,
  PlayCircle,
  Trash2,
  Clock,
  Car,
  Bike,
  Bus,
  Truck,
  Activity,
} from 'lucide-react';
import { useLanguage } from '../Context/LanguageContext.jsx';

const STORAGE_KEY = 'trafficSense_latest_analysis';
const HISTORY_KEY = 'trafficSense_analysis_history';

export default function TrafficMonitor() {
  const { t } = useLanguage();
  const tm = t.trafficMonitorPage || {};

  const [mediaFile, setMediaFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    } catch {
      return [];
    }
  });

  const isVideo = useMemo(() => {
    return mediaFile?.type?.startsWith('video/');
  }, [mediaFile]);

  function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setMediaFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setAnalysisResult(null);
  }

  function getTrafficStatus(total) {
    if (total >= 100) return 'macet';
    if (total >= 50) return 'padat';
    return 'lancar';
  }

async function handleAnalyze() {
  if (!mediaFile) return;

  setAnalyzing(true);

  const mediaUrl = await fileToDataUrl(mediaFile);

  setTimeout(() => {
    const motor = Math.floor(Math.random() * 45) + 20;
    const car = Math.floor(Math.random() * 35) + 15;
    const bus = Math.floor(Math.random() * 8) + 1;
    const truck = Math.floor(Math.random() * 10) + 2;
    const total = motor + car + bus + truck;

    const result = {
      id: Date.now(),
      fileName: mediaFile.name,
      fileType: mediaFile.type,
      mediaType: isVideo ? 'video' : 'image',
      mediaUrl,
      analyzedAt: new Date().toISOString(),
      totalVehicles: total,
      confidence: Number((Math.random() * 5 + 93).toFixed(1)),
      status: getTrafficStatus(total),
      vehicleTypes: { motor, car, bus, truck },
    };

    const nextHistory = [result, ...history].slice(0, 10);

    setAnalysisResult(result);
    setHistory(nextHistory);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));

    setAnalyzing(false);
  }, 1400);
}

  function handleClear() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setMediaFile(null);
    setPreviewUrl('');
    setAnalysisResult(null);
  }

   function handleDeleteAnalysis() {
    if (!analysisResult) return;
    
    const confirmDelete = window.confirm('Hapus hasil analisis ini?');
    if (!confirmDelete) return;

  const nextHistory = history.filter((item) => item.id !== analysisResult.id);

  setHistory(nextHistory);
  setAnalysisResult(null);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));

  const latest = nextHistory[0] || null;

  if (latest) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(latest));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

  function formatDate(value) {
    return new Date(value).toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }

  function statusClass(status) {
    if (status === 'macet') return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
    if (status === 'padat') return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
  }
  
  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}


  return (
    <div className="grid gap-5 xl:grid-cols-[340px_1fr]">
      <aside className="space-y-5">
        <section className="panel p-5">
          <h3 className="text-lg font-extrabold">Upload Media</h3>
          <p className="mt-1 text-sm text-slate-400">
            Upload foto atau video lalu jalankan analisis kepadatan lalu lintas.
          </p>

          <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-cyan-400/40 bg-cyan-400/5 px-4 py-8 text-center transition hover:bg-cyan-400/10">
            <UploadCloud size={36} className="text-cyan-400" />
            <p className="mt-3 font-bold text-white">Pilih Foto / Video</p>
            <p className="mt-1 text-xs text-slate-400">
              JPG, PNG, MP4, MOV
            </p>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleUpload}
              className="hidden"
            />
          </label>

          {mediaFile && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-start gap-3">
                {isVideo ? (
                  <Video className="mt-1 text-cyan-400" size={20} />
                ) : (
                  <ImageIcon className="mt-1 text-cyan-400" size={20} />
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-white">
                    {mediaFile.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {(mediaFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                onClick={handleClear}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/20 py-2 text-sm font-bold text-rose-400 hover:bg-rose-500/10"
              >
                <Trash2 size={15} />
                Hapus Media
              </button>
            </div>
          )}
        </section>

        <section className="panel p-5">
          <h3 className="text-lg font-extrabold">Riwayat Analisis</h3>

          <div className="mt-4 space-y-3">
            {history.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center text-sm text-slate-500">
                Belum ada riwayat analisis
              </div>
            )}

            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => setAnalysisResult(item)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-cyan-400/40 hover:bg-cyan-400/5"
              >
                <div className="flex items-start gap-3">
                  {item.mediaType === 'video' ? (
                    <Video size={18} className="mt-1 text-cyan-400" />
                  ) : (
                    <ImageIcon size={18} className="mt-1 text-cyan-400" />
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-white">
                      {item.fileName}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {formatDate(item.analyzedAt)}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase ${statusClass(item.status)}`}>
                        {item.status}
                      </span>
                      <span className="text-xs font-bold text-cyan-400">
                        {item.totalVehicles} kendaraan
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </aside>

      <main className="space-y-5">
        <section className="panel overflow-hidden p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-extrabold">Preview Media</h3>
              <p className="mt-1 text-sm text-slate-400">
                Media yang di-upload akan tampil di sini sebelum dianalisis.
              </p>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!mediaFile || analyzing}
              className={`flex items-center gap-2 rounded-2xl px-5 py-3 font-bold transition ${
                !mediaFile || analyzing
                  ? 'cursor-not-allowed bg-slate-700 text-slate-500'
                  : 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white hover:opacity-90'
              }`}
            >
              <PlayCircle size={18} />
              {analyzing ? 'Menganalisis...' : 'Analisis AI'}
            </button>
          </div>

          <div className="relative flex min-h-[430px] items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-[#071126]">
            {!previewUrl && (
              <div className="px-6 text-center">
                <UploadCloud size={56} className="mx-auto text-cyan-400" />
                <h4 className="mt-4 text-2xl font-extrabold text-white">
                  Belum ada media dipilih
                </h4>
                <p className="mt-2 text-sm text-slate-400">
                  Upload foto atau video dari panel kiri untuk mulai analisis.
                </p>
              </div>
            )}

            {previewUrl && isVideo && (
              <video
                src={previewUrl}
                controls
                className="h-full max-h-[520px] w-full object-contain"
              />
            )}

            {previewUrl && !isVideo && (
              <img
                src={previewUrl}
                alt={mediaFile?.name || 'preview'}
                className="h-full max-h-[520px] w-full object-contain"
              />
            )}

            {analyzing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
                <Activity size={42} className="animate-pulse text-cyan-400" />
                <p className="mt-4 text-lg font-extrabold text-white">
                  AI sedang menganalisis media...
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="panel p-5">
          <div className="mb-4 flex items-center gap-2">
            <FileCheck size={20} className="text-cyan-400" />
            <h3 className="text-xl font-extrabold">Hasil Analisis</h3>
          </div>

          {!analysisResult && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-500">
              Belum ada hasil. Upload media lalu klik tombol Analisis AI.
            </div>
          )}

          {analysisResult && (
            <div className="grid gap-4 lg:grid-cols-4">
              <ResultCard
                icon={<Car size={22} />}
                label="Mobil"
                value={analysisResult.vehicleTypes.car}
              />
              <ResultCard
                icon={<Bike size={22} />}
                label="Motor"
                value={analysisResult.vehicleTypes.motor}
              />
              <ResultCard
                icon={<Bus size={22} />}
                label="Bus"
                value={analysisResult.vehicleTypes.bus}
              />
              <ResultCard
                icon={<Truck size={22} />}
                label="Truk"
                value={analysisResult.vehicleTypes.truck}
              />

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 lg:col-span-2">
                <p className="text-sm text-slate-400">Total Kendaraan</p>
                <p className="mt-2 text-4xl font-extrabold text-white">
                  {analysisResult.totalVehicles}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">Confidence</p>
                <p className="mt-2 text-4xl font-extrabold text-cyan-400">
                  {analysisResult.confidence}%
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">Status</p>
                <span className={`mt-3 inline-flex rounded-full border px-4 py-2 text-sm font-extrabold uppercase ${statusClass(analysisResult.status)}`}>
                  {analysisResult.status}
                </span>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 lg:col-span-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Clock size={15} />
                  Dianalisis pada {formatDate(analysisResult.analyzedAt)}
                </div>
                <p className="mt-2 truncate font-bold text-white">
                  {analysisResult.fileName}
                </p>
              </div>
              
              <div className="lg:col-span-4">
                <button
                 onClick={handleDeleteAnalysis}
                 className="flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-5 py-3 font-bold text-rose-400 transition hover:bg-rose-500/20" >
                  <Trash2 size={18} /> Hapus Hasil Analisis
                  </button>
              </div>
              
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function ResultCard({ icon, label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center gap-3 text-cyan-400">
        {icon}
        <p className="font-bold">{label}</p>
      </div>

      <p className="mt-4 text-4xl font-extrabold text-white">
        {value}
      </p>
    </div>
  );
}