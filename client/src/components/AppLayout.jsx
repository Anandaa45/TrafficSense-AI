import { Outlet, NavLink, useLocation, Link } from 'react-router-dom';
import {
  Activity,
  Bell,
  ChevronLeft,
  LayoutDashboard,
  Monitor,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Search,
  RefreshCcw,
  Wifi,
  UserCircle2,
  Menu,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/monitor', label: 'Traffic Monitor', icon: Monitor },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/settings', label: 'Settings', icon: Settings },
];

const pageMeta = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Overview sistem deteksi lalu lintas real-time' },
  '/monitor': { title: 'Traffic Monitor', subtitle: 'Pemantauan live feed kamera CCTV' },
  '/analytics': { title: 'Analytics', subtitle: 'Analisis mendalam data kepadatan lalu lintas' },
  '/reports': { title: 'Reports', subtitle: 'Laporan historis dan ringkasan deteksi' },
  '/settings': { title: 'Settings', subtitle: 'Konfigurasi sistem dan model AI' },
  '/profile': { title: 'Profil Pengguna', subtitle: 'Kelola informasi akun dan akses perangkat Anda' },
};

export default function AppLayout() {
  const { pathname } = useLocation();
  const meta = pageMeta[pathname] || pageMeta['/dashboard'];

  return (
    <div className="min-h-screen bg-[#02081f] text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-[255px] shrink-0 border-r border-white/8 bg-[#06102d] lg:flex lg:flex-col">
          <div className="flex items-center gap-3 border-b border-white/8 px-4 py-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/20">
              <Activity size={18} />
            </div>
            <div>
              <p className="text-base font-extrabold leading-5">TrafficSense</p>
              <p className="text-lg font-extrabold leading-5 text-cyan-300">AI Platform</p>
            </div>
          </div>

          <div className="px-2 py-4">
            <div className="mb-3 rounded-2xl bg-white/4 px-4 py-3 text-sm font-bold text-cyan-300">ADMIN ACCESS</div>
            <nav className="space-y-1.5">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl border px-4 py-3 text-[15px] transition ${
                      isActive
                        ? 'border-cyan-500/60 bg-cyan-500/10 text-cyan-300 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.15)]'
                        : 'border-transparent text-slate-300 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="mx-3 mt-auto rounded-[20px] border border-cyan-500/20 bg-cyan-500/8 p-4">
            <div className="mb-3 flex items-center gap-2 text-cyan-300">
              <Activity size={16} />
              <span className="font-bold">AI Engine Active</span>
            </div>
            <div className="mb-2 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
            </div>
            <p className="text-sm text-slate-300">Model: YOLOv8 • v2.4.1</p>
          </div>

          <div className="border-t border-white/8 px-2 py-4">
            <Link to="/welcome" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white">
              <LogOut size={18} />
              Logout
            </Link>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-white/8 bg-[#06102d]/95 backdrop-blur">
            <div className="flex items-center justify-between gap-4 px-4 py-5 lg:px-6">
              <div className="flex items-start gap-4">
                <button className="rounded-xl border border-white/10 p-2 text-slate-300 lg:hidden">
                  <Menu size={18} />
                </button>
                <button className="hidden rounded-xl p-2 text-slate-300 hover:bg-white/5 lg:block">
                  <ChevronLeft size={18} />
                </button>
                <div>
                  <h1 className="text-2xl font-extrabold md:text-[38px] md:leading-none">{meta.title}</h1>
                  <p className="mt-2 text-sm text-slate-400">{meta.subtitle}</p>
                </div>
              </div>

              <div className="hidden items-center gap-3 xl:flex">
                <div className="flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  LIVE
                  <Wifi size={14} />
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">18.07.40</div>
                <label className="flex min-w-[240px] items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-slate-400">
                  <Search size={16} />
                  <input className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500" placeholder="Cari lokasi..." />
                </label>
                <button className="rounded-xl p-2 text-slate-300 hover:bg-white/5"><RefreshCcw size={18} /></button>
                <button className="relative rounded-xl p-2 text-slate-300 hover:bg-white/5">
                  <Bell size={18} />
                  <span className="absolute right-1 top-0 inline-flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">2</span>
                </button>
                <NavLink to="/profile" className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 font-bold text-white">
                  L
                </NavLink>
              </div>
            </div>
          </header>

          <main className="grid-pattern min-h-[calc(100vh-92px)] p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
