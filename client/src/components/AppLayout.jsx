import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import {
  Activity, 
  BarChart3, 
  Bell, 
  FileText, 
  LayoutDashboard,
  Menu, 
  Monitor, 
  RefreshCw, 
  Search, 
  Settings, 
  Wifi,
} from 'lucide-react';

const navIcons = [
  { to: '/dashboard', key: 'dashboard', icon: LayoutDashboard },
  { to: '/monitor',   key: 'monitor',   icon: Monitor },
  { to: '/analytics', key: 'analytics', icon: BarChart3 },
  { to: '/reports',   key: 'reports',   icon: FileText },
  { to: '/settings',  key: 'settings',  icon: Settings },
];

export default function AppLayout() {
  const location  = useLocation();
  const { t }     = useLanguage();
  const { isDark } = useTheme();

  const navItems = navIcons.map((n) => ({ ...n, label: t.nav[n.key] }));
  const [title, subtitle] = t.subtitle[location.pathname] || t.subtitle['/dashboard'];

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
  const subClr   = isDark ? 'text-slate-400'                                : 'text-slate-500';
  const chipBase = isDark ? 'border-slate-700/60 bg-slate-800/50 text-slate-300' : 'border-white/70 bg-white/60 text-slate-600';
  const searchCl = isDark ? 'text-slate-300 placeholder:text-slate-500'     : 'text-slate-700 placeholder:text-slate-400';
  const iconBtn  = isDark ? 'text-slate-400 hover:text-white'               : 'text-slate-500 hover:text-slate-950';
  const bellBox  = isDark ? 'border-slate-700/60 bg-slate-800/50'           : 'border-white/70 bg-white/60';

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
        <header className={`sticky top-0 z-20 flex min-h-[72px] items-center justify-between border-b px-4 shadow-sm backdrop-blur-2xl md:px-8 transition-colors duration-300 ${header}`}>
          <div className="flex items-center gap-5">
            <button className={`rounded-lg p-2 transition-colors ${iconBtn} hover:bg-white/10`}>
              <Menu size={20} />
            </button>
            <div>
              <h2 className={`text-2xl font-extrabold ${titleClr}`}>{title}</h2>
              <p className={`text-sm ${subClr}`}>{subtitle}</p>
            </div>
          </div>

          <div className="hidden items-center gap-3 xl:flex">
            <span className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {t.live}
              <Wifi size={14} />
            </span>

            <span className={`rounded-xl border px-4 py-2 text-sm shadow-sm backdrop-blur-xl ${chipBase}`}>
              00.28.10
            </span>

            <label className={`flex items-center gap-2 rounded-xl border px-4 py-2 shadow-sm backdrop-blur-xl ${chipBase}`}>
              <Search size={16} className="opacity-60" />
              <input className={`bg-transparent text-sm outline-none ${searchCl}`} placeholder={t.searchPlaceholder} />
            </label>

            <button className={`rounded-xl border p-2 shadow-sm backdrop-blur-xl transition-colors ${chipBase} ${iconBtn}`}>
              <RefreshCw size={18} />
            </button>

            <div className={`relative rounded-xl border p-2 shadow-sm backdrop-blur-xl ${bellBox}`}>
              <Bell size={18} className={isDark ? 'text-slate-400' : 'text-slate-600'} />
              <span className="absolute -right-2 -top-2 rounded-full bg-rose-500 px-1.5 text-[10px] font-bold text-white">2</span>
            </div>

            <NavLink to="/profile"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 font-bold text-white shadow-lg shadow-cyan-500/20">
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