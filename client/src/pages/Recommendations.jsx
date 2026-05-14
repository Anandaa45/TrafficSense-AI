import { useEffect, useState } from 'react';
import { BrainCircuit } from 'lucide-react';
import { apiGet } from '../lib/api.js';
import StatusBadge from '../components/StatusBadge.jsx';

export default function Recommendations() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    apiGet('/ai/recommendations').then(setItems).catch(console.error);
  }, []);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
          <BrainCircuit />
        </div>
        <div>
          <h3 className="text-2xl font-extrabold">AI Recommendations</h3>
          <p className="mt-1 text-sm font-semibold text-slate-400">Rekomendasi dibuat dari data congestion_level.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.intersection_id} className="rounded-3xl bg-slate-50 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-extrabold">{item.intersection}</p>
                <p className="mt-1 text-sm font-semibold text-slate-400">Congestion: {item.congestion_level}%</p>
              </div>
              <StatusBadge value={item.priority} />
            </div>
            <p className="mt-5 leading-7 text-slate-600">{item.recommendation}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
