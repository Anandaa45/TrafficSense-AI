import React, { useMemo, useState } from 'react';
import {
  BarChart3,
  Activity,
  Search,
  X,
  Car,
  Bike,
  Bus,
  Truck,
  Gauge,
} from 'lucide-react';
import { useTheme } from '../Context/ThemeContext.jsx';
import { getMediaUrl } from '../lib/analysisStorage.js';
import { useLanguage } from '../Context/LanguageContext.jsx';

const HISTORY_KEY = 'trafficSense_analysis_history';

export default function Analytics() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const a = t.analyticsPage || {};
  const [previewItem, setPreviewItem] = useState(null);
  const [previewError, setPreviewError] = useState('');

  const history = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    } catch {
      return [];
    }
  }, []);

  const cardClass = isDark
    ? 'bg-[#0b1228] border border-slate-700 text-white'
    : 'bg-white/95 border border-slate-300 text-slate-900 shadow-md shadow-slate-200/70';

  const titleText = isDark ? 'text-white' : 'text-slate-950';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-600';
  const bodyText = isDark ? 'text-slate-300' : 'text-slate-800';

  function formatDate(value) {
    if (!value) return '-';

    return new Date(value).toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }

  function statusClass(status) {
    const normalizedStatus = String(status || '').toLowerCase();

    if (normalizedStatus === 'macet') return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    if (normalizedStatus === 'padat') return 'text-amber-300 bg-amber-500/10 border-amber-500/30';
    return 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30';
  }

  function formatConfidence(item) {
    if (!item || item.analysisMode === 'estimate') return 'Estimasi';
    if (item.aiConfidence === null || item.aiConfidence === undefined) return '-';
    return `${item.aiConfidence}%`;
  }

  async function openPreview(item) {
    setPreviewError('');

    if (!item?.mediaUrl && !item?.hasMediaBlob) {
      setPreviewError('Preview file belum tersedia. Silakan analisis ulang media dari Traffic Monitor.');
      return;
    }

    if (item.mediaUrl) {
      setPreviewItem(item);
      return;
    }

    try {
      const mediaUrl = await getMediaUrl(item.id);

      if (!mediaUrl) {
        setPreviewError('File preview tidak ditemukan. Silakan analisis ulang media dari Traffic Monitor.');
        return;
      }

      setPreviewItem({
        ...item,
        mediaUrl,
      });
    } catch (error) {
      console.error(error);
      setPreviewError('Gagal membuka preview media.');
    }
  }

  return (
    <>
      <section className={`rounded-2xl p-6 transition-colors ${cardClass}`}>
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className={`flex items-center gap-2 text-2xl font-extrabold ${titleText}`}>
              <BarChart3 size={22} className="text-cyan-400" />
              {a.analysisHistory}
            </h3>

            <p className={`mt-1 text-sm ${mutedText}`}>
              {a.analysisHistorySub}
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-right">
            <p className="text-xs font-bold uppercase text-cyan-400">
              Total Data
            </p>
            <p className={`text-2xl font-extrabold ${titleText}`}>
              {history.length}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          {previewError && (
            <div className="mb-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-bold text-rose-300">
              {previewError}
            </div>
          )}

          <table className="min-w-full text-left text-sm">
            <thead className={mutedText}>
              <tr>
                <th className="py-3 font-bold">Tanggal</th>
                <th className="font-bold">File</th>
                <th className="font-bold">Tipe</th>
                <th className="font-bold">Total</th>
                <th className="font-bold">Total SMP</th>
                <th className="font-bold">Confidence AI</th>
                <th className="font-bold">Status</th>
                <th className="font-bold">Preview</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <tr key={item.id} className="border-t border-white/10">
                  <td className={`py-4 ${bodyText}`}>
                    {formatDate(item.analyzedAt)}
                  </td>

                  <td className={`max-w-[260px] truncate font-semibold ${titleText}`}>
                    {item.fileName}
                  </td>

                  <td className={bodyText}>
                    {item.mediaType === 'video' ? 'Video' : 'Foto'}
                  </td>

                  <td className={bodyText}>
                    {item.totalVehicles}
                  </td>

                  <td className={bodyText}>
                    {item.totalSmp ?? '-'}
                  </td>

                  <td className={bodyText}>
                    {formatConfidence(item)}
                  </td>

                  <td>
                    <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${statusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={() => openPreview(item)}
                      disabled={!item.mediaUrl && !item.hasMediaBlob}
                      className="inline-flex items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 p-2 text-cyan-400 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-40"
                      title="Lihat detail analisis"
                    >
                      <Search size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {history.length === 0 && (
                <tr>
                  <td colSpan="8" className={`py-12 text-center ${mutedText}`}>
                    <Activity size={42} className="mx-auto mb-3 text-cyan-400" />
                    Belum ada riwayat analisis. Upload media dari halaman Traffic Monitor.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {previewItem && (
        <MediaPreviewModal
          item={previewItem}
          onClose={() => setPreviewItem(null)}
          statusClass={statusClass}
          isDark={isDark}
          formatConfidence={formatConfidence}
        />
      )}
    </>
  );
}

function MediaPreviewModal({ item, onClose, statusClass, isDark, formatConfidence }) {
  const vehicles = item.vehicleTypes || {};
  const modalClass = isDark
    ? 'border-white/10 bg-[#0b1228] text-white'
    : 'border-slate-200 bg-white text-slate-950 shadow-slate-400/30';
  const panelClass = isDark
    ? 'border-white/10 bg-white/5'
    : 'border-slate-200 bg-slate-50';
  const titleClass = isDark ? 'text-white' : 'text-slate-950';
  const mutedClass = isDark ? 'text-slate-400' : 'text-slate-500';
  const valueClass = isDark ? 'text-white' : 'text-slate-950';
  const closeClass = isDark
    ? 'text-slate-400 hover:bg-white/10 hover:text-white'
    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-950';

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-black/70 p-3 backdrop-blur-md sm:p-5">
      <div className={`my-4 max-h-[calc(100dvh-2rem)] w-full max-w-6xl overflow-y-auto rounded-3xl border p-4 shadow-2xl sm:p-5 ${modalClass}`}>
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h3 className={`text-lg font-extrabold ${titleClass}`}>
              Detail Hasil Analisis
            </h3>
            <p className={`mt-1 truncate text-sm ${mutedClass}`}>
              {item.fileName}
            </p>
          </div>

          <button
            onClick={onClose}
            className={`rounded-xl p-2 ${closeClass}`}
            title="Tutup"
          >
            <X size={22} />
          </button>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_360px]">
          <div className="flex min-h-[260px] items-center justify-center overflow-hidden rounded-2xl bg-black/50">
            {item.mediaType === 'video' ? (
              <video
                src={item.mediaUrl}
                controls
                className="max-h-[72dvh] w-full object-contain"
              />
            ) : (
              <img
                src={item.mediaUrl}
                alt={item.fileName}
                className="max-h-[72dvh] w-full object-contain"
              />
            )}
          </div>

          <div className="space-y-4 xl:max-h-[72dvh] xl:overflow-y-auto xl:pr-1">
            <div className={`rounded-2xl border p-4 ${panelClass}`}>
              <p className={`text-sm ${mutedClass}`}>Total Kendaraan</p>
              <p className={`mt-2 text-4xl font-extrabold ${valueClass}`}>
                {item.totalVehicles}
              </p>
            </div>

            <div className={`rounded-2xl border p-4 ${panelClass}`}>
              <p className={`text-sm ${mutedClass}`}>Total SMP</p>
              <p className={`mt-2 text-3xl font-extrabold ${valueClass}`}>
                {item.totalSmp ?? '-'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <MiniStat icon={<Car size={18} />} label="Mobil" value={vehicles.car || 0} panelClass={panelClass} valueClass={valueClass} />
              <MiniStat icon={<Bike size={18} />} label="Motor" value={vehicles.motor || 0} panelClass={panelClass} valueClass={valueClass} />
              <MiniStat icon={<Bus size={18} />} label="Bus" value={vehicles.bus || 0} panelClass={panelClass} valueClass={valueClass} />
              <MiniStat icon={<Truck size={18} />} label="Truk" value={vehicles.truck || 0} panelClass={panelClass} valueClass={valueClass} />
            </div>

            <div className={`rounded-2xl border p-4 ${panelClass}`}>
              <div className={`flex items-center gap-2 ${mutedClass}`}>
                <Gauge size={17} />
                <p className="text-sm">Confidence AI</p>
              </div>
              <p className="mt-2 text-3xl font-extrabold text-cyan-400">
                {formatConfidence(item)}
              </p>
            </div>

            <div className={`rounded-2xl border p-4 ${panelClass}`}>
              <p className={`text-sm ${mutedClass}`}>Status Lalu Lintas</p>
              <span className={`mt-3 inline-flex rounded-full border px-4 py-2 text-sm font-extrabold uppercase ${statusClass(item.status)}`}>
                {item.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ icon, label, value, panelClass, valueClass }) {
  return (
    <div className={`rounded-2xl border p-4 ${panelClass}`}>
      <div className="flex items-center gap-2 text-cyan-400">
        {icon}
        <p className="text-sm font-bold">{label}</p>
      </div>

      <p className={`mt-3 text-2xl font-extrabold ${valueClass}`}>
        {value}
      </p>
    </div>
  );
}
