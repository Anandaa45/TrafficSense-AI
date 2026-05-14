import { Activity } from 'lucide-react';

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#02081f] px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.14),transparent_28%),linear-gradient(90deg,#01081f_0%,#06153d_48%,#01081f_100%)]" />
      <div className="relative w-full max-w-[450px] rounded-[32px] border border-white/10 bg-white/6 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-[24px] bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30">
          <Activity size={28} />
        </div>
        <h1 className="text-center text-4xl font-extrabold">{title}</h1>
        <p className="mt-3 text-center text-slate-400">{subtitle}</p>
        <div className="mt-8">{children}</div>
        {footer ? <div className="mt-6 text-center text-sm text-slate-400">{footer}</div> : null}
      </div>
    </main>
  );
}
