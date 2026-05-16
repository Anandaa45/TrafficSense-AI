import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
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
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = navIcons.map((n) => ({ ...n, label: t.nav[n.key] }));
  const [title, subtitle] = t.subtitle[location.pathname] || t.subtitle['/dashboard'];

 return (
  <div className="app-soft-bg min-h-screen text-slate-900">
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[255px] border-r border-slate-200/70 bg-white/55 backdrop-blur-2xl lg:block">
      <div className="flex h-[72px] items-center gap-3 px-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
          <Activity size={20} />
        </div>
        <div>
          <h1 className="text-base font-extrabold text-slate-950">TrafficSense</h1>
          <p className="text-sm font-semibold text-cyan-600">AI Platform</p>
        </div>
      </div>

        <div className="px-3 py-4">
        <div className="mb-4 rounded-xl border border-white/70 bg-white/60 px-4 py-2 text-xs font-extrabold text-cyan-700 shadow-sm backdrop-blur-xl">
          {t.adminAccess}
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "border-cyan-300 bg-cyan-500/15 text-cyan-700 shadow-sm"
                      : "border-transparent text-slate-500 hover:border-white/70 hover:bg-white/60 hover:text-slate-950"
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-6 left-3 right-3 rounded-2xl border border-cyan-200/80 bg-white/60 p-4 shadow-sm backdrop-blur-xl">
        <div className="flex items-center gap-2 font-bold text-cyan-700">
          <Activity size={16} />
          {t.aiEngine}
        </div>

        <div className="mt-3 h-2 rounded-full bg-slate-200">
          <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600" />
        </div>

        <p className="mt-2 text-xs text-slate-500">Model: YOLOv8 • v2.4.1</p>
      </div>
    </aside>

    <div className="lg:pl-[255px]">
      <header className="sticky top-0 z-20 flex min-h-[72px] items-center justify-between border-b border-slate-200/70 bg-white/55 px-4 shadow-sm backdrop-blur-2xl md:px-8">
        <div className="flex items-center gap-5">
          <button className="rounded-lg p-2 text-slate-500 hover:bg-white/70 hover:text-slate-950">
            <Menu size={20} />
          </button>

          <div>
            <h2 className="text-2xl font-extrabold text-slate-950">{title}</h2>
            <p className="text-sm text-slate-500">{subtitle}</p>
          </div>
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <span className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {t.live}
            <Wifi size={14} />
          </span>

          <span className="rounded-xl border border-white/70 bg-white/60 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur-xl">
            00.28.10
          </span>

          <label className="flex items-center gap-2 rounded-xl border border-white/70 bg-white/60 px-4 py-2 text-slate-500 shadow-sm backdrop-blur-xl">
            <Search size={16} />
            <input
              className="bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              placeholder={t.searchPlaceholder}
            />
          </label>

          <button className="rounded-xl border border-white/70 bg-white/60 p-2 text-slate-500 shadow-sm backdrop-blur-xl hover:text-slate-950">
            <RefreshCw size={18} />
          </button>

          <div className="relative rounded-xl border border-white/70 bg-white/60 p-2 shadow-sm backdrop-blur-xl">
            <Bell size={18} className="text-slate-600" />
            <span className="absolute -right-2 -top-2 rounded-full bg-rose-500 px-1.5 text-[10px] font-bold text-white">
              2
            </span>
          </div>

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