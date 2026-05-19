import { useLanguage } from '../Context/LanguageContext.jsx';
import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useTheme } from '../Context/ThemeContext.jsx';

const trafficTrendData = [
  { time: '02:00', lancar: 40, padat: 18, macet: 8 },
  { time: '04:00', lancar: 38, padat: 12, macet: 5 },
  { time: '06:00', lancar: 45, padat: 10, macet: 4 },
  { time: '08:00', lancar: 72, padat: 35, macet: 28 },
  { time: '10:00', lancar: 48, padat: 66, macet: 14 },
  { time: '12:00', lancar: 60, padat: 52, macet: 22 },
  { time: '14:00', lancar: 58, padat: 57, macet: 12 },
  { time: '16:00', lancar: 70, padat: 45, macet: 30 },
  { time: '18:00', lancar: 36, padat: 78, macet: 42 },
  { time: '20:00', lancar: 30, padat: 48, macet: 15 },
  { time: '22:00', lancar: 80, padat: 25, macet: 8 },
];

export default function Dashboard() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const d = t.dashboardPage;

  const trafficStatusData = [
  { name: d.smooth, value: 42, color: '#22c55e' },
  { name: d.dense, value: 35, color: '#f59e0b' },
  { name: d.jammed, value: 23, color: '#ef4444' },
];

  const cardClass = isDark
    ? 'bg-[#0b1228] border border-slate-700 text-white'
    : 'bg-white border border-slate-200 text-slate-900 shadow-sm';

  const chartBoxClass = isDark
    ? 'bg-slate-900/40 border border-slate-700'
    : 'bg-slate-50 border border-slate-200';

  const titleText = isDark ? 'text-white' : 'text-slate-900';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-500';
  const bodyText = isDark ? 'text-slate-300' : 'text-slate-700';

  const chartGrid = isDark ? '#334155' : '#cbd5e1';
  const chartAxis = isDark ? '#94a3b8' : '#64748b';
  const tooltipBg = isDark ? '#0f172a' : '#ffffff';
  const tooltipBorder = isDark ? '#334155' : '#e2e8f0';
  const tooltipText = isDark ? '#e2e8f0' : '#0f172a';

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
      {/* Tren Kepadatan */}
      <section className={`rounded-3xl p-5 transition-colors xl:col-span-2 ${cardClass}`}>
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className={`text-xl font-bold ${titleText}`}>
              {d.trafficTrendTitle}
            </h3>

            <p className={`mt-1 text-sm ${mutedText}`}>
              {d.trafficTrendSub}
            </p>
          </div>

          <button
            className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
              isDark
                ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {d.dataset}
          </button>
        </div>

        <div className="mb-4 flex flex-wrap gap-4 text-sm font-medium">
          <LegendDot color="bg-green-500" label={d.smooth} textClass={bodyText} />
          <LegendDot color="bg-amber-500" label={d.dense} textClass={bodyText} />
          <LegendDot color="bg-red-500" label={d.jammed} textClass={bodyText} />
        </div>

        <div className={`h-[340px] rounded-2xl p-4 ${chartBoxClass}`}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trafficTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
              <XAxis
                dataKey="time"
                stroke={chartAxis}
                tick={{ fill: chartAxis, fontSize: 12 }}
              />
              <YAxis
                stroke={chartAxis}
                tick={{ fill: chartAxis, fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  border: `1px solid ${tooltipBorder}`,
                  borderRadius: '12px',
                  color: tooltipText,
                }}
                labelStyle={{ color: tooltipText }}
              />
              <Line
                type="monotone"
                dataKey="lancar"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="padat"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="macet"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Distribusi Status */}
      <section className={`rounded-3xl p-5 transition-colors ${cardClass}`}>
        <div className="mb-4">
          <h3 className={`text-xl font-bold ${titleText}`}>
            {d.statusDistribution}
          </h3>

          <p className={`mt-1 text-sm ${mutedText}`}>
            {d.currentAllPoints}
          </p>
        </div>

        <div className={`h-[240px] rounded-2xl p-3 ${chartBoxClass}`}>
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

              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  border: `1px solid ${tooltipBorder}`,
                  borderRadius: '12px',
                  color: tooltipText,
                }}
                labelStyle={{ color: tooltipText }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 space-y-3">
          {trafficStatusData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className={`flex items-center gap-2 text-sm ${bodyText}`}>
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}
              </div>

              <span className={`text-sm font-bold ${titleText}`}>
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function LegendDot({ color, label, textClass }) {
  return (
    <div className={`flex items-center gap-2 ${textClass}`}>
      <span className={`h-3 w-3 rounded-full ${color}`} />
      {label}
    </div>
  );
}