import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useLanguage } from '../Context/LanguageContext.jsx';
import { useTheme } from '../Context/ThemeContext.jsx';
import { useTimezone } from '../Context/TimezoneContext.jsx';
import { useDateFormat } from '../Context/DateFormatContext.jsx';
import { Activity, BarChart3, FileText, LayoutDashboard, Menu, Monitor, Settings, Clock , CalendarDays } from 'lucide-react';

const navIcons = [
  { to: '/dashboard', key: 'dashboard', icon: LayoutDashboard },
  { to: '/monitor',   key: 'monitor',   icon: Monitor },
  { to: '/analytics', key: 'analytics', icon: BarChart3 },
  { to: '/reports',   key: 'reports',   icon: FileText },
  { to: '/settings',  key: 'settings',  icon: Settings },
];

export default function AppLayout() {
  const location  = useLocation();
  const { t, lang } = useLanguage();
  const { isDark } = useTheme();
  const { currentTZ } = useTimezone();
  const { dateFormat } = useDateFormat();

  // ── Jam realtime ──────────────────────────────────────────────────────────
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Format jam sesuai zona waktu yang dipilih
  const timeString = now.toLocaleTimeString('id-ID', {
    timeZone: currentTZ.iana,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const dateString = formatAppDate(now, currentTZ.iana, dateFormat);
  const dayString = new Intl.DateTimeFormat(
    lang === 'id' ? 'id-ID' : 'en-US',
    {weekday: 'long', timeZone: currentTZ.iana, }
).format(now);

  const navItems = navIcons.map((n) => ({ ...n, label: t.nav[n.key] }));
  const [title] = t.subtitle[location.pathname] || t.subtitle['/dashboard'];

  // ── Theme tokens ──────────────────────────────────────────────────────────
  const bg       = isDark ? 'bg-[#060d1f]'                                 : 'app-soft-bg';
  const sidebar  = isDark ? 'bg-[#0b1228]/90 border-slate-700/60'           : 'bg-white/55 border-slate-200/70';
  const header   = isDark ? 'bg-[#0b1228]/80 border-slate-700/60'           : 'bg-white/55 border-slate-200/70';
  const logo1    = isDark ? 'text-white'                                    : 'text-slate-950';
  const adminBadge = isDark
    ? 'border-cyan-800/60 bg-cyan-900/30 text-cyan-400'
    : 'border-white/70 bg-white/60 text-cyan-700';
  const navActive = isDark
    ? 'border-cyan-700/60 bg-cyan-500/15 text-cyan-300'
    : 'border-cyan-300 bg-cyan-500/15 text-cyan-700';
  const navInactive = isDark
    ? 'border-transparent text-slate-400 hover:border-slate-700 hover:bg-slate-800/60 hover:text-white'
    : 'border-transparent text-slate-500 hover:border-white/70 hover:bg-white/60 hover:text-slate-950';
  const aiBox    = isDark ? 'border-cyan-800/50 bg-slate-800/60 text-cyan-400' : 'border-cyan-200/80 bg-white/60 text-cyan-700';
  const aiBar    = isDark ? 'bg-slate-700'                                   : 'bg-slate-200';
  const aiSub    = isDark ? 'text-slate-500'                                 : 'text-slate-500';
  const titleClr = isDark ? 'text-white'                                    : 'text-slate-950';
  const iconBtn  = isDark ? 'text-slate-400 hover:text-white'               : 'text-slate-500 hover:text-slate-950';


  // -- Tanggal Format
  function formatAppDate(date, timeZone, format) {
    const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  const get = (type) => parts.find((p) => p.type === type)?.value;

  const day = get('day');
  const month = get('month');
  const year = get('year');

  if (format === 'MM/DD/YYYY') return `${month}/${day}/${year}`;
  if (format === 'YYYY-MM-DD') return `${year}-${month}-${day}`;

  return `${day}/${month}/${year}`;
}

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#060d1f] text-white' : 'text-slate-900'} ${!isDark ? 'app-soft-bg' : ''}`}>
      {/* ── Sidebar ── */}
      <aside className={`fixed left-0 top-0 z-30 hidden h-screen w-[255px] border-r backdrop-blur-2xl lg:block transition-colors duration-300 ${sidebar}`}>
        {/* Logo */}
        <div className="flex h-[72px] items-center gap-3 px-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
            <Activity size={20} />
          </div>
          <div>
            <h1 className={`text-base font-extrabold ${logo1}`}>TrafficSense</h1>
            <p className="text-sm font-semibold text-cyan-500">AI Platform</p>
          </div>
        </div>

        {/* Nav */}
        <div className="px-3 py-4">
          <div className={`mb-4 rounded-xl border px-4 py-2 text-xs font-extrabold shadow-sm backdrop-blur-xl ${adminBadge}`}>
            {t.adminAccess}
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink key={item.to} to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors duration-200 ${isActive ? navActive : navInactive}`
                  }
                >
                  <Icon size={18} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* AI Engine box */}
        <div className={`absolute bottom-6 left-3 right-3 rounded-2xl border p-4 shadow-sm backdrop-blur-xl transition-colors duration-300 ${aiBox}`}>
          <div className="flex items-center gap-2 font-bold">
            <Activity size={16} />
            {t.aiEngine}
          </div>
          <div className={`mt-3 h-2 rounded-full ${aiBar}`}>
            <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600" />
          </div>
          <p className={`mt-2 text-xs ${aiSub}`}>Model: YOLOv8 • v2.4.1</p>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="lg:pl-[255px]">
        {/* Header */}
       {/* Header */}
<header className={`sticky top-0 z-20 flex min-h-[72px] items-center justify-between border-b px-4 shadow-sm backdrop-blur-2xl md:px-8 transition-colors duration-300 ${header}`}>
  <div className="flex items-center gap-5">
    <button className={`rounded-lg p-2 transition-colors ${iconBtn} hover:bg-white/10`}>
      <Menu size={20} />
    </button>

    <div>
      <h2 className={`text-2xl font-extrabold ${titleClr}`}>{title}</h2>
    </div>
  </div>

  <div className="hidden items-center gap-3 xl:flex">
    {/* ── Jam Realtime + Label Sistem ── */}
    <div className={`flex items-center gap-3 rounded-xl border px-4 py-2 transition-colors ${isDark ? 'border-cyan-800/50 bg-slate-800/60' : 'border-cyan-200/80 bg-white/60'}`}>
      {/* Label sistem */}
      <div className="text-right">
        <p className={`text-[10px] font-semibold uppercase tracking-widest leading-tight ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {t.systemLabel1}
        </p>
        <p className={`text-[10px] font-semibold uppercase tracking-widest leading-tight ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {t.systemLabel2}
        </p>
      </div>
      {/* Divider */}
      <div className={`h-8 w-px ${isDark ? 'bg-slate-600' : 'bg-slate-300'}`} />
      {/* Jam */}
      <div className="flex items-center gap-2"> 
        {/* Tanggal */}
<div className="flex items-center gap-2">
  <CalendarDays size={14} className="text-cyan-400 flex-shrink-0" />
  <div>
    <p className={`font-mono text-base font-extrabold leading-tight tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
      {dateString}
    </p>
    <p className="text-[10px] font-bold uppercase text-cyan-400 leading-tight">
      {dayString}
    </p>
  </div>
</div>

<div className={`h-8 w-px ${isDark ? 'bg-slate-600' : 'bg-slate-300'}`} />
        <Clock size={14} className="text-cyan-400 flex-shrink-0" />
        <div>
          <p className={`font-mono text-base font-extrabold leading-tight tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {timeString}
          </p>
          <p className={`text-[10px] font-bold text-cyan-400 leading-tight`}>
            {currentTZ.value} UTC+{currentTZ.offsetHours}
          </p>
        </div>
      </div>
    </div>

    {/* Avatar */}
    <NavLink
      to="/profile"
      className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 font-bold text-white shadow-lg shadow-cyan-500/20"
    >
      L
    </NavLink>
  </div>
</header>

        <main className="relative z-10 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}