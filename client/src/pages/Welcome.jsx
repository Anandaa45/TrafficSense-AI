import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Radio, Zap, Shield, Eye, TrendingUp, ArrowRight, Sparkles } from "lucide-react";

export default function Welcome() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const isDark = false;
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
  {
    icon: Eye,
    title: "Deteksi Real-time",
    desc: "Pantau kondisi lalu lintas secara langsung.",
    color: "from-[#00d4ff] to-[#0066ff]",
    delay: "delay-0",
  },
  {
    icon: Shield,
    title: "Keamanan Jalan",
    desc: "Analisis potensi risiko lalu lintas.",
    color: "from-[#00ff88] to-[#00aa55]",
    delay: "delay-100",
  },
  {
    icon: TrendingUp,
    title: "Analitik Cerdas",
    desc: "Visualisasi data lalu lintas berbasis AI.",
    color: "from-purple-500 to-pink-500",
    delay: "delay-200",
  },
  {
    icon: Zap,
    title: "Respons Cepat",
    desc: "Sistem cepat membaca kondisi jalan.",
    color: "from-orange-500 to-red-500",
    delay: "delay-300",
  },
];

  return (
  <div className="app-soft-bg min-h-screen relative overflow-hidden transition-colors duration-500">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse ${
          isDark ? 'bg-[#00d4ff]/10' : 'bg-blue-400/20'
        }`} />
        <div className={`absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse ${
          isDark ? 'bg-[#00ff88]/10' : 'bg-green-400/20'
        }`} style={{ animationDelay: '1s' }} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] animate-pulse ${
          isDark ? 'bg-purple-500/10' : 'bg-purple-400/20'
        }`} style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className={`absolute inset-0 ${isDark ? 'opacity-[0.02]' : 'opacity-[0.04]'}`} style={{
        backgroundImage: isDark
          ? `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`
          : `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Hero Content */}
            <div className={`space-y-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              {/* Logo */}
              <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-xl border transition-colors ${
                isDark
                  ? 'bg-white/5 border-white/10'
                  : 'bg-white/60 border-gray-200 shadow-sm'
              }`}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#0066ff] flex items-center justify-center">
                  <Radio size={16} className="text-white" strokeWidth={2.5} />
                </div>
                <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  TrafficSense AI
                </span>
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h1 className={`text-5xl lg:text-6xl leading-tight transition-colors ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`} style={{ fontWeight: 800 }}>
                  Smart Traffic
                  <br />
                  <span className="bg-gradient-to-r from-[#00d4ff] via-purple-400 to-[#00ff88] bg-clip-text text-transparent">
                    Monitoring
                  </span>
                </h1>
                <p className={`text-xl leading-relaxed max-w-md transition-colors ${
                  isDark ? 'text-[#8892a4]' : 'text-gray-600'
                }`}>
                  Platform monitoring lalu lintas berbasis AI dengan analitik real-time dan deteksi otomatis
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/login')}
                  className="group relative px-8 py-4 rounded-2xl overflow-hidden"
                >
                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] transition-transform group-hover:scale-105" />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                  {/* Content */}
                  <div className="relative flex items-center gap-2 text-white font-bold">
                    <span>Masuk</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                  </div>
                </button>

                <button
                  onClick={() => navigate('/register')}
                  className={`group px-8 py-4 rounded-2xl backdrop-blur-xl border font-bold transition-all ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                      : 'bg-white/60 border-gray-200 text-gray-900 hover:bg-white/80 hover:border-gray-300 shadow-sm'
                  }`}
                >
                  Daftar Akun
                </button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                <div>
                  <div className={`text-3xl font-bold mb-1 transition-colors ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>24/7</div>
                  <div className={`text-sm transition-colors ${
                    isDark ? 'text-[#8892a4]' : 'text-gray-600'
                  }`}>Monitoring</div>
                </div>
                <div>
                  <div className={`text-3xl font-bold mb-1 transition-colors ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>96.4%</div>
                  <div className={`text-sm transition-colors ${
                    isDark ? 'text-[#8892a4]' : 'text-gray-600'
                  }`}>Akurasi AI</div>
                </div>
                <div>
                  <div className={`text-3xl font-bold mb-1 transition-colors ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>18+</div>
                  <div className={`text-sm transition-colors ${
                    isDark ? 'text-[#8892a4]' : 'text-gray-600'
                  }`}>Kamera Aktif</div>
                </div>
              </div>
            </div>

            {/* Right side - Features Grid */}
            <div className={`space-y-4 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className={`group relative backdrop-blur-xl border rounded-3xl p-6 transition-all duration-500 ${feature.delay} animate-fade-in-up ${
                      isDark
                        ? 'bg-white/5 border-white/10 hover:bg-white/10'
                        : 'bg-white/60 border-gray-200 hover:bg-white/80 shadow-sm'
                    }`}
                  >
                    {/* Glow on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity`} />

                    <div className="relative space-y-3">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <feature.icon size={24} className="text-white" strokeWidth={2.5} />
                      </div>

                      {/* Text */}
                      <div>
                        <h3 className={`font-bold mb-1 transition-colors ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>{feature.title}</h3>
                        <p className={`text-sm leading-relaxed transition-colors ${
                          isDark ? 'text-[#8892a4]' : 'text-gray-600'
                        }`}>{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative element */}
              <div className={`relative mt-8 p-6 rounded-3xl backdrop-blur-xl border overflow-hidden transition-colors ${
                isDark
                  ? 'bg-white/5 border-white/10'
                  : 'bg-white/60 border-gray-200 shadow-sm'
              }`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00d4ff]/20 to-transparent rounded-bl-full" />
                <div className="relative flex items-center gap-3">
                  <Sparkles size={24} className="text-[#00d4ff]" />
                  <div>
                    <div className={`font-bold mb-1 transition-colors ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>Teknologi Terdepan</div>
                    <div className={`text-sm transition-colors ${
                      isDark ? 'text-[#8892a4]' : 'text-gray-600'
                    }`}>Powered by YOLOv8 Deep Learning</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-[800ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <div className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
            isDark ? 'text-[#8892a4]' : 'text-gray-500'
          }`}>Scroll untuk lebih lanjut</div>
          <div className={`w-6 h-10 rounded-full border-2 flex items-start justify-center p-2 transition-colors ${
            isDark ? 'border-white/20' : 'border-gray-300'
          }`}>
            <div className={`w-1 h-2 rounded-full transition-colors ${
              isDark ? 'bg-white/40' : 'bg-gray-400'
            }`} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
