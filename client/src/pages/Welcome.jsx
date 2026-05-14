import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, Eye, Shield, TrendingUp, Zap } from 'lucide-react';

export default function Welcome() {
  const features = [
    ['AI-Powered Detection', 'YOLOv8 real-time object detection', Zap, 'bg-orange-500'],
    ['Secure Access', 'Role-based authentication system', Shield, 'bg-sky-500'],
    ['Real-time Monitor', '24/7 traffic surveillance', Eye, 'bg-pink-500'],
    ['Advanced Analytics', 'Data-driven insights', TrendingUp, 'bg-emerald-500'],
  ];

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#060b1d] via-[#0b2442] to-[#060b1d] px-6 py-10 text-white">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 lg:grid-cols-2">
        <section>
          <div className="mb-12 inline-flex items-center gap-3 rounded-full border border-slate-700 bg-white/5 px-4 py-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500"><Activity size={18}/></span>
            <span className="font-extrabold">TrafficSense AI</span>
          </div>
          <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">Smart Traffic <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 bg-clip-text text-transparent">Monitoring</span></h1>
          <p className="mt-6 max-w-xl text-xl leading-9 text-slate-400">Platform monitoring lalu lintas berbasis AI dengan analitik real-time dan deteksi otomatis.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/login" className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 px-8 py-4 font-extrabold">Masuk <ArrowRight size={20}/></Link>
            <Link to="/dashboard" className="rounded-2xl border border-slate-700 bg-white/5 px-8 py-4 font-extrabold">Lihat Dashboard</Link>
          </div>
          <div className="mt-12 grid max-w-md grid-cols-3 gap-6">
            {['24/7 Monitoring', '96.4% Akurasi AI', '18+ Kamera Aktif'].map((item) => {
              const [num, ...rest] = item.split(' ');
              return <div key={item}><p className="text-3xl font-extrabold">{num}</p><p className="text-sm text-slate-400">{rest.join(' ')}</p></div>;
            })}
          </div>
        </section>
        <section className="grid gap-5 sm:grid-cols-2">
          {features.map(([title, text, Icon, color]) => <div key={title} className="card-dark p-6"><span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}><Icon/></span><h3 className="mt-8 text-xl font-extrabold">{title}</h3><p className="mt-3 text-slate-400">{text}</p></div>)}
          <div className="card-dark sm:col-span-2 p-6"><h3 className="text-xl font-extrabold text-cyan-300">Teknologi Terdepan</h3><p className="mt-2 text-slate-400">Powered by YOLOv8 Deep Learning</p></div>
        </section>
      </div>
    </main>
  );
}
