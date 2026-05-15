import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  Activity,
  BarChart3,
  Bell,
  Database,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Monitor,
  RefreshCw,
  Search,
  Settings,
  Wifi,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/monitor', label: 'Traffic Monitor', icon: Monitor },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/settings', label: 'Settings', icon: Settings },
];
export default function AppLayout() {
  const location = useLocation();
  const [title, subtitle] = titles[location.pathname] || titles['/dashboard'];

  return (
    <div className="min-h-screen bg-[#060b1d] text-white">
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[255px] border-r border-slate-800 bg-[#081126] lg:block">
        <div className="flex h-[72px] items-center gap-3 px-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500 text-white">
            <Activity size={20} />
          </div>
          <div>
            <h1 className="text-base font-extrabold">TrafficSense</h1>
            <p className="text-sm font-semibold text-cyan-300">AI Platform</p>
          </div>
        </div>

        <div className="px-3 py-4">
          <div className="mb-4 rounded-xl bg-slate-800/80 px-4 py-2 text-xs font-extrabold text-cyan-300">ADMIN ACCESS</div>
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
                        ? 'border-cyan-500/50 bg-cyan-500/15 text-cyan-300'
                        : 'border-transparent text-slate-400 hover:bg-slate-800 hover:text-white'
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

        <div className="absolute bottom-6 left-3 right-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-4">
          <div className="flex items-center gap-2 font-bold text-cyan-300"><Activity size={16} /> AI Engine Active</div>
          <div className="mt-3 h-2 rounded-full bg-slate-700"><div className="h-2 w-4/5 rounded-full bg-blue-500" /></div>
          <p className="mt-2 text-xs text-slate-300">Model: YOLOv8 • v2.4.1</p>
        </div>
      </aside>

      <div className="lg:pl-[255px]">
        <header className="sticky top-0 z-20 flex min-h-[72px] items-center justify-between border-b border-slate-800 bg-[#081126]/95 px-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-5">
            <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-800"><Menu size={20} /></button>
            <div>
              <h2 className="text-2xl font-extrabold">{title}</h2>
              <p className="text-sm text-slate-400">{subtitle}</p>
            </div>
          </div>
          <div className="hidden items-center gap-3 xl:flex">
            <span className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-400"><span className="h-2 w-2 rounded-full bg-emerald-400" /> LIVE <Wifi size={14}/></span>
            <span className="rounded-xl bg-slate-800 px-4 py-2 text-sm text-slate-300">00.28.10</span>
            <label className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-slate-400">
              <Search size={16}/><input className="bg-transparent text-sm outline-none placeholder:text-slate-500" placeholder="Cari lokasi..." />
            </label>
            <RefreshCw className="text-slate-400" size={18}/>
            <div className="relative"><Bell size={18} className="text-slate-300"/><span className="absolute -right-2 -top-2 rounded-full bg-rose-500 px-1.5 text-[10px] font-bold">2</span></div>
            <NavLink to="/profile" className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 font-bold">L</NavLink>
          </div>
        </header>

        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
