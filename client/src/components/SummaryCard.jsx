import React from 'react';
export default function SummaryCard({ icon, title, value, subtitle, badge, badgeTone = 'emerald', accent = 'cyan' }) {
  const tones = {
    emerald: 'bg-emerald-500/10 text-emerald-400',
    rose: 'bg-rose-500/10 text-rose-400',
    cyan: 'bg-cyan-500/10 text-cyan-400',
    violet: 'bg-violet-500/10 text-violet-300',
  };

  const accents = {
    cyan: 'border-cyan-500/25',
    rose: 'border-rose-500/25',
    emerald: 'border-emerald-500/25',
    violet: 'border-violet-500/25',
  };

  return (
    <div className={`panel ${accents[accent]} p-5`}>
      <div className="flex items-start justify-between gap-4">
        <div className={`rounded-2xl ${tones[badgeTone]} p-3`}>{icon}</div>
        {badge ? <span className={`rounded-full px-3 py-1 text-xs font-bold ${tones[badgeTone]}`}>{badge}</span> : null}
      </div>
      <p className="mt-5 text-sm text-slate-400">{title}</p>
      <h3 className="mt-2 text-[22px] font-extrabold text-white md:text-[40px] md:leading-none">{value}</h3>
      <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
    </div>
  );
}

