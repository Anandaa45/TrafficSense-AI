import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  Activity,
  BarChart3,
  Bell,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Monitor,
  Search,
  Settings,
  X,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dasbor', icon: LayoutDashboard },
  { to: '/monitor', label: 'Monitor Lalu Lintas', icon: Monitor },
  { to: '/analytics', label: 'Analitik', icon: BarChart3 },
  { to: '/reports', label: 'Laporan', icon: FileText },
  { to: '/settings', label: 'Pengaturan', icon: Settings },
];

const titles = {
  '/dashboard': {
    title: 'Dashboard',
    subtitle: 'Pantau kepadatan lalu lintas secara real-time',
  },
  '/monitor': {
    title: 'Monitor Lalu Lintas',
    subtitle: 'Pantau kondisi lalu lintas dari berbagai lokasi',
  },
  '/analytics': {
    title: 'Analitik',
    subtitle: 'Analisis data lalu lintas dan performa AI',
  },
  '/reports': {
    title: 'Laporan',
    subtitle: 'Ringkasan laporan lalu lintas dan insiden',
  },
  '/settings': {
    title: 'Pengaturan',
    subtitle: 'Kelola akun, tampilan, dan preferensi aplikasi',
  },
};

export default function AppLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentPage = titles[location.pathname] || titles['/dashboard'];

  return (
    <div className="min-h-screen bg-[#060b1d] text-white">
      {/* Overlay saat sidebar dibuka di mobile */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Tutup sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-800 bg-[#080f26] transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500 shadow-lg shadow-cyan-500/30">
              <Activity size={26} />
            </div>

            <div>
              <h1 className="text-lg font-extrabold">TrafficSense</h1>
              <p className="text-sm font-bold text-cyan-400">AI Platform</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        <div className="mx-3 mt-3 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-3 text-sm font-bold text-cyan-400">
          ADMIN ACCESS
        </div>

        {/* Menu */}
        <nav className="mt-4 flex-1 space-y-2 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setSidebarOpen(false);
                  }
                }}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-xl border px-4 py-4 text-sm font-bold transition
                  ${
                    isActive
                      ? 'border-cyan-500/50 bg-cyan-500/20 text-cyan-300'
                      : 'border-transparent text-slate-400 hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300'
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* AI Engine */}
        <div className="m-3 rounded-2xl border border-cyan-500/30 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm font-extrabold text-cyan-400">
            <Activity size={18} />
            AI Engine Aktif
          </div>

          <div className="mt-4 h-2 rounded-full bg-slate-700">
            <div className="h-2 w-[78%] rounded-full bg-blue-500" />
          </div>

          <p className="mt-3 text-xs text-slate-500">Model: YOLOv8 • v2.4.1</p>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`min-h-screen transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-20 flex h-[77px] items-center justify-between border-b border-slate-800 bg-[#080f26]/95 px-5 backdrop-blur">
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-xl p-2 text-slate-300 transition hover:bg-white/10 hover:text-cyan-300"
            >
              <Menu size={24} />
            </button>

            <div>
              <h2 className="text-2xl font-extrabold md:text-3xl">
                {currentPage.title}
              </h2>
              <p className="mt-1 hidden text-sm text-slate-400 md:block">
                {currentPage.subtitle}
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-cyan-300">
              <Search size={20} />
            </button>

            <button className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-cyan-300">
              <Bell size={20} />
            </button>

            <button className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-red-400">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Isi halaman */}
        <section className="p-5 md:p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
}