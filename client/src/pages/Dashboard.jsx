import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import {
  Activity,
  BarChart3,
  Car,
  Bike,
  Bus,
  Truck,
  Gauge,
  FileVideo,
  TrafficCone,
} from 'lucide-react';
import { useLanguage } from '../Context/LanguageContext.jsx';
import { useTheme } from '../Context/ThemeContext.jsx';
import { getAnalysisHistory } from '../lib/analysisStorage.js';

export default function Dashboard() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const d = t.dashboardPage || {};

  const history = useMemo(() => getAnalysisHistory(), []);

  const stats = useMemo(() => {
    const totalAnalysis = history.length;

    const totalVehicles = history.reduce(
      (sum, item) => sum + Number(item.totalVehicles || 0),
      0
    );

    const confidenceValues = history
      .map((item) => Number(item.confidence))
      .filter((value) => Number.isFinite(value));

    const avgConfidence =
      confidenceValues.length > 0
        ? (
            confidenceValues.reduce((sum, value) => sum + value, 0) /
            confidenceValues.length
          ).toFixed(1)
        : 0;

    const statusCount = {
      lancar: 0,
      padat: 0,
      macet: 0,
    };

    const vehicleTypes = {
      motor: 0,
      car: 0,
      bus: 0,
      truck: 0,
    };

    history.forEach((item) => {
      const status = String(item.status || 'lancar').toLowerCase();

      if (statusCount[status] !== undefined) {
        statusCount[status] += 1;
      }

      vehicleTypes.motor += Number(item.vehicleTypes?.motor || 0);
      vehicleTypes.car += Number(item.vehicleTypes?.car || 0);
      vehicleTypes.bus += Number(item.vehicleTypes?.bus || 0);
      vehicleTypes.truck += Number(item.vehicleTypes?.truck || 0);
    });

    const dominantStatus = Object.entries(statusCount).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || 'lancar';

    return {
      totalAnalysis,
      totalVehicles,
      avgConfidence,
      statusCount,
      dominantStatus,
      vehicleTypes,
      latest: history[0] || null,
      recent: history.slice(0, 5),
    };
  }, [history]);

  const cardClass = isDark
    ? 'bg-[#0b1228] border border-slate-700 text-white'
    : 'bg-white border border-slate-200 text-slate-900 shadow-sm';

  const innerClass = isDark
    ? 'bg-white/5 border border-white/10'
    : 'bg-slate-50 border border-slate-200';

  const titleText = isDark ? 'text-white' : 'text-slate-950';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-600';
  const bodyText = isDark ? 'text-slate-300' : 'text-slate-700';
  const tooltipBg = isDark ? '#0f172a' : '#ffffff';
  const tooltipBorder = isDark ? '#334155' : '#e2e8f0';
  const tooltipText = isDark ? '#e2e8f0' : '#0f172a';

  const statusData = [
    {
      name: d.smooth || 'Lancar',
      value: stats.statusCount.lancar,
      color: '#22c55e',
    },
    {
      name: d.dense || 'Padat',
      value: stats.statusCount.padat,
      color: '#f59e0b',
    },
    {
      name: d.jammed || 'Macet',
      value: stats.statusCount.macet,
      color: '#ef4444',
    },
  ];

  const vehicleData = [
    {
      label: d.motor || 'Motor',
      value: stats.vehicleTypes.motor,
      icon: Bike,
    },
    {
      label: d.car || 'Mobil',
      value: stats.vehicleTypes.car,
      icon: Car,
    },
    {
      label: d.bus || 'Bus',
      value: stats.vehicleTypes.bus,
      icon: Bus,
    },
    {
      label: d.truck || 'Truk',
      value: stats.vehicleTypes.truck,
      icon: Truck,
    },
  ];

  const maxVehicle = Math.max(...vehicleData.map((item) => item.value), 1);

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

  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={<FileVideo size={22} />}
          label={d.totalAnalysis || 'Total Analisis'}
          value={stats.totalAnalysis}
          cardClass={cardClass}
          mutedText={mutedText}
          titleText={titleText}
        />

        <SummaryCard
          icon={<Car size={22} />}
          label={d.totalVehicles || 'Total Kendaraan'}
          value={stats.totalVehicles}
          cardClass={cardClass}
          mutedText={mutedText}
          titleText={titleText}
        />

        <SummaryCard
          icon={<Gauge size={22} />}
          label={d.avgConfidence || 'Rata-rata Confidence'}
          value={`${stats.avgConfidence}%`}
          cardClass={cardClass}
          mutedText={mutedText}
          titleText={titleText}
        />

        <SummaryCard
          icon={<TrafficCone size={22} />}
          label={d.dominantStatus || 'Status Dominan'}
          value={stats.dominantStatus.toUpperCase()}
          cardClass={cardClass}
          mutedText={mutedText}
          titleText={titleText}
          badgeClass={statusClass(stats.dominantStatus)}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className={`rounded-3xl p-6 ${cardClass}`}>
          <h3 className={`text-xl font-extrabold ${titleText}`}>
            {d.latestAnalysis || 'Analisis Terakhir'}
          </h3>

          <p className={`mt-1 text-sm ${mutedText}`}>
            {d.latestAnalysisSub || 'Ringkasan dari media terakhir yang dianalisis.'}
          </p>

          {!stats.latest ? (
            <div className={`mt-6 rounded-2xl p-8 text-center ${innerClass} ${mutedText}`}>
              {d.noAnalysis || 'Belum ada data analisis.'}
            </div>
          ) : (
            <div className={`mt-6 rounded-2xl p-5 ${innerClass}`}>
              <div className="grid gap-4 md:grid-cols-2">
                <Info label={d.file || 'File'} value={stats.latest.fileName} titleText={titleText} mutedText={mutedText} />
                <Info label={d.analysisTime || 'Waktu Analisis'} value={formatDate(stats.latest.analyzedAt)} titleText={titleText} mutedText={mutedText} />
                <Info label={d.totalVehicles || 'Total Kendaraan'} value={stats.latest.totalVehicles} titleText={titleText} mutedText={mutedText} />
                <div>
                  <p className={`text-sm ${mutedText}`}>{d.status || 'Status'}</p>
                  <span className={`mt-2 inline-flex rounded-full border px-4 py-2 text-sm font-extrabold uppercase ${statusClass(stats.latest.status)}`}>
                    {stats.latest.status}
                  </span>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className={`rounded-3xl p-6 ${cardClass}`}>
          <h3 className={`text-xl font-extrabold ${titleText}`}>
            {d.statusDistribution || 'Distribusi Status'}
          </h3>

          <p className={`mt-1 text-sm ${mutedText}`}>
            {d.statusDistributionSub || 'Berdasarkan seluruh riwayat analisis.'}
          </p>

          <div className={`mt-6 h-[230px] rounded-2xl p-3 ${innerClass}`}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    border: `1px solid ${tooltipBorder}`,
                    borderRadius: '12px',
                    color: tooltipText,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-3">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className={`flex items-center gap-2 text-sm ${bodyText}`}>
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.name}
                </div>

                <span className={`text-sm font-bold ${titleText}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className={`rounded-3xl p-6 ${cardClass}`}>
          <h3 className={`flex items-center gap-2 text-xl font-extrabold ${titleText}`}>
            <BarChart3 size={20} className="text-cyan-400" />
            {d.vehicleStatistics || 'Statistik Jenis Kendaraan'}
          </h3>

          <p className={`mt-1 text-sm ${mutedText}`}>
            {d.vehicleStatisticsSub || 'Total kendaraan berdasarkan seluruh hasil analisis.'}
          </p>

          <div className="mt-6 space-y-5">
            {vehicleData.map((item) => {
              const Icon = item.icon;
              const percent = Math.round((item.value / maxVehicle) * 100);

              return (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className={`flex items-center gap-2 font-bold ${bodyText}`}>
                      <Icon size={18} className="text-cyan-400" />
                      {item.label}
                    </div>
                    <span className={`font-extrabold ${titleText}`}>
                      {item.value}
                    </span>
                  </div>

                  <div className={`h-2 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
                    <div
                      className="h-2 rounded-full bg-cyan-400"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className={`rounded-3xl p-6 ${cardClass}`}>
          <h3 className={`flex items-center gap-2 text-xl font-extrabold ${titleText}`}>
            <Activity size={20} className="text-cyan-400" />
            {d.recentActivity || 'Aktivitas Terakhir'}
          </h3>

          <p className={`mt-1 text-sm ${mutedText}`}>
            {d.recentActivitySub || 'Lima hasil analisis terbaru.'}
          </p>

          <div className="mt-6 space-y-3">
            {stats.recent.length === 0 && (
              <div className={`rounded-2xl p-6 text-center ${innerClass} ${mutedText}`}>
                {d.noActivity || 'Belum ada aktivitas analisis.'}
              </div>
            )}

            {stats.recent.map((item) => (
              <div key={item.id} className={`rounded-2xl p-4 ${innerClass}`}>
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className={`truncate font-bold ${titleText}`}>
                      {item.fileName}
                    </p>
                    <p className={`mt-1 text-xs ${mutedText}`}>
                      {formatDate(item.analyzedAt)}
                    </p>
                  </div>

                  <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold uppercase ${statusClass(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function SummaryCard({ icon, label, value, cardClass, mutedText, titleText, badgeClass }) {
  return (
    <section className={`rounded-3xl p-5 ${cardClass}`}>
      <div className="flex items-center gap-2 text-cyan-400">
        {icon}
        <p className="font-bold">{label}</p>
      </div>

      {badgeClass ? (
        <span className={`mt-5 inline-flex rounded-full border px-4 py-2 text-lg font-extrabold ${badgeClass}`}>
          {value}
        </span>
      ) : (
        <p className={`mt-5 text-3xl font-extrabold ${titleText}`}>
          {value}
        </p>
      )}

      <p className={`mt-2 text-sm ${mutedText}`}>
        TrafficSense AI
      </p>
    </section>
  );
}

function Info({ label, value, titleText, mutedText }) {
  return (
    <div>
      <p className={`text-sm ${mutedText}`}>{label}</p>
      <p className={`mt-1 break-all font-extrabold ${titleText}`}>
        {value || '-'}
      </p>
    </div>
  );
}