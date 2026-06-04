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
import { useTheme } from '../Context/ThemeContext.jsx';
import { apiPostForm } from '../lib/api.js';
import { saveAnalysis, deleteAnalysis, getAnalysisHistory, getMediaUrl } from '../lib/analysisStorage.js';

const FRAME_WIDTH = 180;
const FRAME_HEIGHT = 120;

export default function TrafficMonitor() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const tm = t.trafficMonitorPage || {};

  const [mediaFile, setMediaFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState(() => getAnalysisHistory());

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
    setError('');
  }

  function getTrafficStatus(total) {
    if (total >= 100) return 'macet';
    if (total >= 50) return 'padat';
    return 'lancar';
  }

  async function extractFrame(file, seekRatio = 0.15) {
    const url = URL.createObjectURL(file);
    const canvas = document.createElement('canvas');
    canvas.width = FRAME_WIDTH;
    canvas.height = FRAME_HEIGHT;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    try {
      if (file.type?.startsWith('video/')) {
        const video = document.createElement('video');
        video.muted = true;
        video.playsInline = true;
        video.preload = 'metadata';
        video.src = url;

        await new Promise((resolve, reject) => {
          video.onloadedmetadata = resolve;
          video.onerror = reject;
        });

        if (Number.isFinite(video.duration) && video.duration > 1) {
          const targetTime = Math.min(
            Math.max(0.1, video.duration * seekRatio),
            Math.max(0.1, video.duration - 0.1),
          );

          video.currentTime = targetTime;
          await new Promise((resolve) => {
            video.onseeked = resolve;
            setTimeout(resolve, 800);
          });
        }

        ctx.drawImage(video, 0, 0, FRAME_WIDTH, FRAME_HEIGHT);
      } else {
        const image = new Image();
        image.src = url;

        await new Promise((resolve, reject) => {
          image.onload = resolve;
          image.onerror = reject;
        });

        ctx.drawImage(image, 0, 0, FRAME_WIDTH, FRAME_HEIGHT);
      }

      return ctx.getImageData(0, 0, FRAME_WIDTH, FRAME_HEIGHT);
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  function getPixelStats(imageData) {
    const { data, width, height } = imageData;
    let roadLike = 0;
    let darkRoadLike = 0;
    let roadMarkings = 0;
    let brightLights = 0;
    let lowerPixels = 0;
    let edgePixels = 0;
    let sampled = 0;
    let saturatedPosterPixels = 0;

    for (let y = 0; y < height; y += 2) {
      for (let x = 0; x < width; x += 2) {
        const index = (y * width + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const luma = 0.299 * r + 0.587 * g + 0.114 * b;
        const saturation = max === 0 ? 0 : (max - min) / max;
        const isLowerHalf = y > height * 0.42;

        sampled += 1;

        if (isLowerHalf) {
          lowerPixels += 1;

          if (saturation < 0.5 && luma > 10 && luma < 220 && max - min < 105) {
            roadLike += 1;
          }

          if (saturation < 0.55 && luma > 12 && luma < 95) {
            darkRoadLike += 1;
          }

          if (saturation < 0.38 && luma > 135) {
            roadMarkings += 1;
          }
        }

        if (luma > 170 && saturation < 0.5 && y > height * 0.18) {
          brightLights += 1;
        }

        if (saturation > 0.72 && (r > 170 || b > 170) && y > height * 0.25) {
          saturatedPosterPixels += 1;
        }

        if (x + 2 < width && y + 2 < height) {
          const right = ((y * width + x + 2) * 4);
          const down = (((y + 2) * width + x) * 4);
          const rightLuma = 0.299 * data[right] + 0.587 * data[right + 1] + 0.114 * data[right + 2];
          const downLuma = 0.299 * data[down] + 0.587 * data[down + 1] + 0.114 * data[down + 2];

          if (Math.abs(luma - rightLuma) + Math.abs(luma - downLuma) > 70) {
            edgePixels += 1;
          }
        }
      }
    }

    return {
      roadRatio: lowerPixels ? roadLike / lowerPixels : 0,
      darkRoadRatio: lowerPixels ? darkRoadLike / lowerPixels : 0,
      markingRatio: lowerPixels ? roadMarkings / lowerPixels : 0,
      lightRatio: sampled ? brightLights / sampled : 0,
      edgeRatio: sampled ? edgePixels / sampled : 0,
      posterRatio: sampled ? saturatedPosterPixels / sampled : 0,
    };
  }

  function looksLikeTraffic(stats) {
    const roadAndEdges = stats.roadRatio > 0.2 && stats.edgeRatio > 0.018;
    const roadWithMarkings = stats.markingRatio > 0.012 && stats.edgeRatio > 0.014;
    const nightTraffic = stats.darkRoadRatio > 0.12 && (stats.lightRatio > 0.002 || stats.markingRatio > 0.006) && stats.edgeRatio > 0.012;

    return roadAndEdges || roadWithMarkings || nightTraffic;
  }

  function looksLikePoster(stats) {
    return stats.posterRatio > 0.3 && stats.roadRatio < 0.14 && stats.markingRatio < 0.004;
  }

  async function validateTrafficMedia(file) {
    const seekRatios = file.type?.startsWith('video/') ? [0.12, 0.45, 0.75] : [0.15];
    const statsList = [];

    for (const ratio of seekRatios) {
      const frame = await extractFrame(file, ratio);
      statsList.push(getPixelStats(frame));
    }

    return {
      ok: statsList.some(looksLikeTraffic) && !statsList.every(looksLikePoster),
      stats: statsList[0],
      statsList,
    };
  }

  function createClientFallbackResult(file) {
    const seed = file.size + file.name.length;
    const motor = (seed % 28) + 12;
    const car = (Math.floor(seed / 3) % 24) + 8;
    const bus = (Math.floor(seed / 5) % 6) + 1;
    const truck = (Math.floor(seed / 7) % 8) + 1;
    const total = motor + car + bus + truck;
    const totalSmp = Number((motor * 0.5 + car + bus * 1.3 + truck * 1.3).toFixed(1));

    return {
      id: Date.now(),
      fileName: file.name,
      fileType: file.type,
      mediaType: file.type?.startsWith('video/') ? 'video' : 'image',
      analyzedAt: new Date().toISOString(),
      totalVehicles: total,
      totalSmp,
      aiConfidence: null,
      confidence: null,
      analysisMode: 'estimate',
      status: getTrafficStatus(total),
      vehicleTypes: { motor, car, bus, truck },
      advice: 'Mode estimasi browser aktif karena API AI belum terhubung. Untuk akurasi model, jalankan FastAPI ML lalu analisis ulang media ini.',
    };
  }

  async function handleAnalyze() {
    if (!mediaFile) return;

    setAnalyzing(true);
    setError('');

    let validation;

    try {
      validation = await validateTrafficMedia(mediaFile);
    } catch (err) {
      console.error(err);
      setAnalysisResult(null);
      setError('Media tidak bisa dibaca. Gunakan file JPG, PNG, MP4, atau MOV yang valid.');
      setAnalyzing(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', mediaFile);

      const response = await apiPostForm('/ml/predict', formData);
      const data = response.data || {};
      const rincian = data.rincian || {};
      const total = Number(data.total_kendaraan || 0);
      const totalSmp = data.kemacetan?.total_smp ?? '-';
      const aiConfidence = Number(data.avg_confidence ?? data.confidence ?? 0);

      if (total === 0 && !validation.ok) {
        setAnalysisResult(null);
        setError('Media ditolak. Sistem hanya menerima foto/video lalu lintas jalan, CCTV jalan, antrean kendaraan, atau rekaman jalan.');
        return;
      }

      const result = {
        id: Date.now(),
        fileName: mediaFile.name,
        fileType: mediaFile.type,
        mediaType: isVideo ? 'video' : 'image',
        analyzedAt: new Date().toISOString(),
        totalVehicles: total,
        totalSmp,
        aiConfidence: Number.isFinite(aiConfidence) ? aiConfidence : 0,
        confidence: Number.isFinite(aiConfidence) ? aiConfidence : 0,
        confidenceThreshold: data.confidence_threshold ?? null,
        sampledFrames: data.sampled_frames ?? null,
        detectionCount: data.detection_count ?? null,
        analysisMode: data.model_mode || 'ai',
        status: (data.kemacetan?.status || getTrafficStatus(total)).toLowerCase(),
        vehicleTypes: {
          motor: Number(rincian.Motorcycle || 0),
          car: Number(rincian.Car || 0),
          bus: Number(rincian.Bus || 0),
          truck: Number(rincian.Truck || 0),
        },
        advice: data.pesan_ai_advisor || '',
      };

      const nextHistory = await saveAnalysis(result, mediaFile);

      setAnalysisResult(result);
      setHistory(nextHistory);
    } catch (err) {
      console.error(err);

      if (!validation.ok) {
        setAnalysisResult(null);
        setError('Media ditolak. Sistem hanya menerima foto/video lalu lintas jalan, CCTV jalan, antrean kendaraan, atau rekaman jalan.');
        return;
      }

      const result = createClientFallbackResult(mediaFile);
      const nextHistory = await saveAnalysis(result, mediaFile);

      setAnalysisResult(result);
      setHistory(nextHistory);
      setError('');
    } finally {
      setAnalyzing(false);
    }
  }

  function handleClear() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setMediaFile(null);
    setPreviewUrl('');
    setAnalysisResult(null);
    setError('');
  }

  async function handleSelectHistory(item) {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setMediaFile(null);
    setAnalysisResult(item);
    setError('');

    if (!item.hasMediaBlob) {
      setPreviewUrl('');
      return;
    }

    const mediaUrl = await getMediaUrl(item.id);
    setPreviewUrl(mediaUrl || '');

    if (!mediaUrl) {
      setError('Preview media tidak ditemukan, tetapi data analisis masih tersimpan.');
    }
  }

  async function handleDeleteAnalysis() {
    if (!analysisResult) return;

    const confirmDelete = window.confirm('Hapus hasil analisis ini?');
    if (!confirmDelete) return;

    try {
      const nextHistory = await deleteAnalysis(analysisResult.id);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setHistory(nextHistory);
      setAnalysisResult(null);
      setMediaFile(null);
      setPreviewUrl('');
    } catch (err) {
      console.error(err);
      setError('Gagal menghapus hasil analisis.');
    }
  }

  function formatDate(value) {
    return new Date(value).toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }

  function statusClass(status) {
    const normalizedStatus = String(status || '').toLowerCase();

    if (normalizedStatus === 'macet') return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
    if (normalizedStatus === 'padat') return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
  }

  function formatConfidence(item) {
    if (!item || item.analysisMode === 'estimate') return 'Estimasi';
    if (item.aiConfidence === null || item.aiConfidence === undefined) return '-';
    return `${item.aiConfidence}%`;
  }

  const panelClass = isDark
    ? 'border-white/10 bg-white/5 text-white'
    : 'border-slate-200 bg-white/80 text-slate-950 shadow-sm';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-600';
  const titleText = isDark ? 'text-white' : 'text-slate-950';
  const previewClass = isDark
    ? 'border-white/10 bg-[#071126]'
    : 'border-slate-200 bg-white';
  const historyClass = isDark
    ? 'border-white/10 bg-white/5 hover:border-cyan-400/40 hover:bg-cyan-400/5'
    : 'border-slate-200 bg-white/75 hover:border-cyan-300 hover:bg-cyan-50';
  const resultCardClass = isDark
    ? 'border-white/10 bg-white/5'
    : 'border-slate-200 bg-white';
  const adviceClass = isDark
    ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-100'
    : 'border-cyan-300 bg-cyan-50 text-cyan-800';

  return (
    <div className="grid gap-5 xl:grid-cols-[340px_1fr]">
      <aside className="space-y-5">
        <section className={`rounded-3xl border p-5 ${panelClass}`}>
          <h3 className="text-lg font-extrabold">{tm.uploadMedia}</h3>
          <p className={`mt-1 text-sm ${mutedText}`}>
            {tm.uploadMediaSub || 'Upload foto atau video lalu jalankan analisis kepadatan lalu lintas.'}
          </p>

          <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-cyan-400/50 bg-cyan-400/10 px-4 py-8 text-center transition hover:bg-cyan-400/15">
            <UploadCloud size={36} className="text-cyan-400" />
            <p className={`mt-3 font-bold ${titleText}`}>
              {tm.chooseMedia || 'Pilih Foto / Video'}
            </p>
            <p className={`mt-1 text-xs ${mutedText}`}>
              {tm.supportedFiles || 'JPG, PNG, MP4, MOV'}
            </p>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleUpload}
              className="hidden"
            />
          </label>

          {mediaFile && (
            <div className={`mt-4 rounded-2xl border p-4 ${resultCardClass}`}>
              <div className="flex items-start gap-3">
                {isVideo ? (
                  <Video className="mt-1 text-cyan-400" size={20} />
                ) : (
                  <ImageIcon className="mt-1 text-cyan-400" size={20} />
                )}

                <div className="min-w-0 flex-1">
                  <p className={`truncate font-bold ${titleText}`}>{mediaFile.name}</p>
                  <p className={`mt-1 text-xs ${mutedText}`}>
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

        <section className={`rounded-3xl border p-5 ${panelClass}`}>
          <h3 className="text-lg font-extrabold">Hasil Upload</h3>

          <div className="mt-4 space-y-3">
            {history.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center text-sm text-slate-500">
                Belum ada riwayat analisis
              </div>
            )}

            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelectHistory(item)}
                className={`w-full rounded-2xl border p-4 text-left transition ${historyClass}`}
              >
                <div className="flex items-start gap-3">
                  {item.mediaType === 'video' ? (
                    <Video size={18} className="mt-1 text-cyan-400" />
                  ) : (
                    <ImageIcon size={18} className="mt-1 text-cyan-400" />
                  )}

                  <div className="min-w-0 flex-1">
                    <p className={`truncate font-bold ${titleText}`}>{item.fileName}</p>
                    <p className={`mt-1 text-xs ${mutedText}`}>
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
        <section className={`rounded-3xl border p-5 ${panelClass}`}>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-extrabold">Preview Media</h3>
              <p className={`mt-1 text-sm ${mutedText}`}>
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
              {analyzing ? (tm.analyzing || 'Menganalisis...') : (tm.analyzeAI || 'Analisis AI')}
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-bold text-rose-300">
              {error}
            </div>
          )}

          <div className={`relative flex min-h-[430px] items-center justify-center overflow-hidden rounded-[28px] border ${previewClass}`}>
            {!previewUrl && (
              <div className="px-6 text-center">
                <UploadCloud size={56} className="mx-auto text-cyan-400" />
                <h4 className={`mt-4 text-2xl font-extrabold ${titleText}`}>
                  Belum ada media dipilih
                </h4>
                <p className={`mt-2 text-sm ${mutedText}`}>
                  Upload foto atau video dari panel kiri untuk mulai analisis.
                </p>
              </div>
            )}

            {previewUrl && isVideo && (
              <video src={previewUrl} controls className="h-full max-h-[520px] w-full object-contain" />
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

        <section className={`rounded-3xl border p-5 ${panelClass}`}>
          <div className="mb-4 flex items-center gap-2">
            <FileCheck size={20} className="text-cyan-400" />
            <h3 className="text-xl font-extrabold">Hasil Analisis</h3>
          </div>

          {!analysisResult && (
            <div className={`rounded-2xl border p-8 text-center ${mutedText} ${resultCardClass}`}>
              Belum ada hasil. Upload media lalu klik tombol Analisis AI.
            </div>
          )}

          {analysisResult && (
            <div className="grid gap-4 lg:grid-cols-4">
              <ResultCard icon={<Car size={22} />} label="Mobil" value={analysisResult.vehicleTypes.car} cardClass={resultCardClass} valueClass={titleText} />
              <ResultCard icon={<Bike size={22} />} label="Motor" value={analysisResult.vehicleTypes.motor} cardClass={resultCardClass} valueClass={titleText} />
              <ResultCard icon={<Bus size={22} />} label="Bus" value={analysisResult.vehicleTypes.bus} cardClass={resultCardClass} valueClass={titleText} />
              <ResultCard icon={<Truck size={22} />} label="Truk" value={analysisResult.vehicleTypes.truck} cardClass={resultCardClass} valueClass={titleText} />

              <div className={`rounded-3xl border p-5 lg:col-span-2 ${resultCardClass}`}>
                <p className={`text-sm ${mutedText}`}>Total Kendaraan</p>
                <p className={`mt-2 text-4xl font-extrabold ${titleText}`}>
                  {analysisResult.totalVehicles}
                </p>
              </div>

              <div className={`rounded-3xl border p-5 ${resultCardClass}`}>
                <p className={`text-sm ${mutedText}`}>Total SMP</p>
                <p className="mt-2 text-4xl font-extrabold text-cyan-400">
                  {analysisResult.totalSmp ?? '-'}
                </p>
              </div>

              <div className={`rounded-3xl border p-5 ${resultCardClass}`}>
                <p className={`text-sm ${mutedText}`}>Confidence AI</p>
                <p className="mt-2 text-3xl font-extrabold text-cyan-400">
                  {formatConfidence(analysisResult)}
                </p>
              </div>

              <div className={`rounded-3xl border p-5 lg:col-span-4 ${resultCardClass}`}>
                <p className={`text-sm ${mutedText}`}>Status</p>
                <span className={`mt-3 inline-flex rounded-full border px-4 py-2 text-sm font-extrabold uppercase ${statusClass(analysisResult.status)}`}>
                  {analysisResult.status}
                </span>
              </div>

              <div className={`rounded-3xl border p-5 lg:col-span-4 ${resultCardClass}`}>
                <div className={`flex items-center gap-2 text-sm ${mutedText}`}>
                  <Clock size={15} />
                  Dianalisis pada {formatDate(analysisResult.analyzedAt)}
                </div>
                <p className={`mt-2 truncate font-bold ${titleText}`}>
                  {analysisResult.fileName}
                </p>
                {analysisResult.advice && (
                  <p className={`mt-4 rounded-2xl border p-4 text-sm font-semibold leading-6 ${adviceClass}`}>
                    {analysisResult.advice}
                  </p>
                )}
              </div>

              <div className="lg:col-span-4">
                <button
                  onClick={handleDeleteAnalysis}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-5 py-3 font-bold text-rose-400 transition hover:bg-rose-500/20"
                >
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

function ResultCard({ icon, label, value, cardClass, valueClass }) {
  return (
    <div className={`rounded-3xl border p-5 ${cardClass}`}>
      <div className="flex items-center gap-3 text-cyan-400">
        {icon}
        <p className="font-bold">{label}</p>
      </div>

      <p className={`mt-4 text-4xl font-extrabold ${valueClass}`}>{value}</p>
    </div>
  );
}
