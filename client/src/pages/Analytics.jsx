import React, { useMemo } from 'react';
import { BarChart3, Activity, Gauge, FileVideo, Car, Bike, Bus, Truck } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext.jsx';
import { useLanguage } from '../Context/LanguageContext.jsx';

const LATEST_KEY = 'trafficSense_latest_analysis';
const HISTORY_KEY = 'trafficSense_analysis_history';

export default function Analytics() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const a = t.analyticsPage || {};

  const latestAnalysis = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem(LATEST_KEY) || 'null');
    } catch {
      return null;
    }
  }, []);

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

  const innerBox = isDark
    ? 'bg-slate-800/80 border border-slate-700'
    : 'bg-white border border-slate-300 shadow-sm';

  const titleText = isDark ? 'text-white' : 'text-slate-950';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-600';
  const bodyText = isDark ? 'text-slate-300' : 'text-slate-800';
  const progressBg = isDark ? 'bg-slate-700' : 'bg-slate-300';

  const vehicleTypes = latestAnalysis
    ? [
        ['Motor', latestAnalysis.vehicleTypes?.motor || 0, 'bg-cyan-400', Bike],
        ['Mobil', latestAnalysis.vehicleTypes?.car || 0, 'bg-emerald-400', Car],
        ['Bus', latestAnalysis.vehicleTypes?.bus || 0, 'bg-amber-400', Bus],
        ['Truk', latestAnalysis.vehicleTypes?.truck || 0, 'bg-violet-400', Truck],
      ]
    : [];

  const totalVehicles = latestAnalysis?.totalVehicles || 0;

  function formatDate(value) {
    if (!value) return '-';

    return new Date(value).toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }

  function statusClass(status) {
    if (status === 'macet') return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    if (status === 'padat') return 'text-amber-300 bg-amber-500/10 border-amber-500/30';
    return 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30';
  }

  if (!latestAnalysis) {
    return (
      <div className={`rounded-3xl p-10 text-center ${cardClass}`}>
        <Activity size={52} className="mx-auto text-cyan-400" />
        <h2 className={`mt-4 text-2xl font-extrabold ${titleText}`}>
          Belum Ada Data Analisis
        </h2>
        <p className={`mt-2 ${mutedText}`}>
          Upload foto atau video di halaman Traffic Monitor, lalu klik Analisis AI.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={<Car size={22} />}
          label="Total Kendaraan"
          value={totalVehicles}
          cardClass={cardClass}
          mutedText={mutedText}
          titleText={titleText}
        />

        <SummaryCard
          icon={<Gauge size={22} />}
          label="Status Lalu Lintas"
          value={latestAnalysis.status?.toUpperCase() || '-'}
          cardClass={cardClass}
          mutedText={mutedText}
          titleText={titleText}
          badgeClass={statusClass(latestAnalysis.status)}
        />

        <SummaryCard
          icon={<Activity size={22} />}
          label="Confidence"
          value={`${latestAnalysis.confidence || 0}%`}
          cardClass={cardClass}
          mutedText={mutedText}
          titleText={titleText}
        />

        <SummaryCard
          icon={<FileVideo size={22} />}
          label="Media Dianalisis"
          value={history.length}
          cardClass={cardClass}
          mutedText={mutedText}
          titleText={titleText}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className={`rounded-2xl p-6 transition-colors ${cardClass}`}>
          <h3 className={`text-xl font-extrabold ${titleText}`}>
            {a.vehicleTypesTitle || 'Distribusi Kendaraan'}
          </h3>

          <p className={`mt-1 text-sm ${mutedText}`}>
            Hasil analisis dari media terakhir yang di-upload.
          </p>

          <div className="mt-8 space-y-5">
            {vehicleTypes.map(([name, value, color, Icon]) => {
              const percent = totalVehicles > 0 ? Math.round((value / totalVehicles) * 100) : 0;

              return (
                <div key={name}>
                  <div className="mb-2 flex justify-between">
                    <span className={`flex items-center gap-2 font-medium ${bodyText}`}>
                      <Icon size={17} className="text-cyan-400" />
                      {name}
                    </span>

                    <b className={titleText}>
                      {value} <span className={mutedText}>({percent}%)</span>
                    </b>
                  </div>

                  <div className={`h-2 rounded-full ${progressBg}`}>
                    <div
                      className={`h-2 rounded-full ${color}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className={`rounded-2xl p-6 transition-colors ${cardClass}`}>
          <h3 className={`text-xl font-extrabold ${titleText}`}>
            Detail Media Terakhir
          </h3>

          <p className={`mt-1 text-sm ${mutedText}`}>
            Informasi file yang terakhir dianalisis.
          </p>

          <div className="mt-6 space-y-4">
            <InfoRow label="Nama File" value={latestAnalysis.fileName} innerBox={innerBox} titleText={titleText} mutedText={mutedText} />
            <InfoRow label="Tipe Media" value={latestAnalysis.mediaType === 'video' ? 'Video' : 'Foto'} innerBox={innerBox} titleText={titleText} mutedText={mutedText} />
            <InfoRow label="Waktu Analisis" value={formatDate(latestAnalysis.analyzedAt)} innerBox={innerBox} titleText={titleText} mutedText={mutedText} />

            <div className={`rounded-xl p-4 ${innerBox}`}>
              <p className={`text-sm ${mutedText}`}>Status</p>
              <span className={`mt-2 inline-flex rounded-full border px-4 py-2 text-sm font-extrabold uppercase ${statusClass(latestAnalysis.status)}`}>
                {latestAnalysis.status}
              </span>
            </div>
          </div>
        </section>

        <section className={`rounded-2xl p-6 transition-colors xl:col-span-2 ${cardClass}`}>
          <h3 className={`flex items-center gap-2 text-xl font-extrabold ${titleText}`}>
            <BarChart3 size={18} className="text-cyan-400" />
            Riwayat Analisis
          </h3>

          <p className={`mt-1 text-sm ${mutedText}`}>
            Riwayat upload dan hasil analisis terakhir.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className={mutedText}>
                <tr>
                  <th className="py-3 font-bold">Tanggal</th>
                  <th className="font-bold">File</th>
                  <th className="font-bold">Tipe</th>
                  <th className="font-bold">Total</th>
                  <th className="font-bold">Confidence</th>
                  <th className="font-bold">Status</th>
                </tr>
              </thead>

              <tbody>
                {history.map((item) => (
                  <tr key={item.id} className="border-t border-white/10">
                    <td className={`py-4 ${bodyText}`}>
                      {formatDate(item.analyzedAt)}
                    </td>
                    <td className={`max-w-[240px] truncate font-semibold ${titleText}`}>
                      {item.fileName}
                    </td>
                    <td className={bodyText}>
                      {item.mediaType === 'video' ? 'Video' : 'Foto'}
                    </td>
                    <td className={bodyText}>
                      {item.totalVehicles}
                    </td>
                    <td className={bodyText}>
                      {item.confidence}%
                    </td>
                    <td>
                      <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${statusClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {history.length === 0 && (
                  <tr>
                    <td colSpan="6" className={`py-8 text-center ${mutedText}`}>
                      Belum ada riwayat analisis.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

function SummaryCard({ icon, label, value, cardClass, mutedText, titleText, badgeClass }) {
  return (
    <section className={`rounded-2xl p-5 ${cardClass}`}>
      <div className="flex items-center gap-2 text-cyan-400">
        {icon}
        <p className="font-bold">{label}</p>
      </div>

      {badgeClass ? (
        <span className={`mt-5 inline-flex rounded-full border px-4 py-2 text-lg font-extrabold ${badgeClass}`}>
          {value}
        </span>
      ) : (
        <p className={`mt-5 text-4xl font-extrabold ${titleText}`}>
          {value}
        </p>
      )}

      <p className={`mt-2 text-sm ${mutedText}`}>
        Berdasarkan hasil analisis terakhir
      </p>
    </section>
  );
}

function InfoRow({ label, value, innerBox, titleText, mutedText }) {
  return (
    <div className={`rounded-xl p-4 ${innerBox}`}>
      <p className={`text-sm ${mutedText}`}>{label}</p>
      <p className={`mt-1 break-all font-bold ${titleText}`}>{value}</p>
    </div>
  );
}