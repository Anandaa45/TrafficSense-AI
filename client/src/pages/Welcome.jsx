import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Shield, Eye, TrendingUp, Zap } from 'lucide-react';

const featureCards = [
  {
    title: 'AI-Powered Detection',
    subtitle: 'YOLOv8 real-time object detection',
    icon: <Zap className="text-white" size={22} />,
    iconTone: 'from-amber-400 to-orange-500',
  },
  {
    title: 'Secure Access',
    subtitle: 'Role-based authentication system',
    icon: <Shield className="text-white" size={22} />,
    iconTone: 'from-sky-400 to-blue-500',
  },
  {
    title: 'Real-time Monitor',
    subtitle: '24/7 traffic surveillance',
    icon: <Eye className="text-white" size={22} />,
    iconTone: 'from-pink-400 to-fuchsia-500',
  },
  {
    title: 'Advanced Analytics',
    subtitle: 'Data-driven insights',
    icon: <TrendingUp className="text-white" size={22} />,
    iconTone: 'from-emerald-400 to-green-500',
  },
];

export default function Welcome() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#02081f] text-white">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col px-6 py-10 lg:px-10">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="relative">
            <div className="absolute left-24 top-10 h-64 w-64 rounded-full bg-cyan-500/20 blur-[100px]" />
            <div className="relative max-w-[620px]">
              <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-3 shadow-lg backdrop-blur">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/20">
                  <Activity size={18} />
                </div>
                <span className="text-lg font-extrabold">TrafficSense AI</span>
              </div>

              <h1 className="text-5xl font-extrabold leading-[1.04] tracking-tight sm:text-6xl lg:text-[76px]">
                Smart Traffic
                <span className="mt-2 block bg-gradient-to-r from-cyan-400 via-violet-300 to-emerald-400 bg-clip-text text-transparent">Monitoring</span>
              </h1>

              <p className="mt-8 max-w-[560px] text-xl leading-10 text-slate-400">
                Platform monitoring lalu lintas berbasis AI dengan analitik real-time dan deteksi otomatis.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link to="/login" className="inline-flex items-center justify-center gap-2 rounded-[18px] bg-gradient-to-r from-cyan-400 to-blue-600 px-8 py-4 text-lg font-extrabold shadow-lg shadow-cyan-500/20">
                  Masuk <ArrowRight size={20} />
                </Link>
                <Link to="/register" className="inline-flex items-center justify-center rounded-[18px] border border-white/10 bg-white/5 px-8 py-4 text-lg font-bold text-slate-100">
                  Daftar Akun
                </Link>
              </div>

              <div className="mt-14 grid max-w-[430px] grid-cols-3 gap-6">
                {[
                  ['24/7', 'Monitoring'],
                  ['96.4%', 'Akurasi AI'],
                  ['18+', 'Kamera Aktif'],
                ].map(([value, label]) => (
                  <div key={label}>
                    <p className="text-4xl font-extrabold">{value}</p>
                    <p className="mt-2 text-lg text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="relative">
            <div className="absolute right-8 top-0 h-80 w-80 rounded-full bg-sky-500/12 blur-[120px]" />
            <div className="relative grid gap-5 sm:grid-cols-2">
              {featureCards.map((card) => (
                <div key={card.title} className="panel p-6">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-[18px] bg-gradient-to-br ${card.iconTone}`}>
                    {card.icon}
                  </div>
                  <h3 className="mt-8 text-[32px] font-extrabold leading-tight">{card.title}</h3>
                  <p className="mt-3 text-lg text-slate-400">{card.subtitle}</p>
                </div>
              ))}
              <div className="panel sm:col-span-2 flex items-center justify-between gap-5 overflow-hidden p-6">
                <div>
                  <div className="mb-3 flex items-center gap-3 text-cyan-300">
                    <Zap size={22} />
                    <span className="text-[30px] font-extrabold">Teknologi Terdepan</span>
                  </div>
                  <p className="text-xl text-slate-400">Powered by YOLOv8 Deep Learning</p>
                </div>
                <div className="h-36 w-36 rounded-full bg-cyan-500/12" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

