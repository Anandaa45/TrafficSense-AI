import { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../lib/api.js';

export default function Sessions() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ user_name: '', road_context: '', destination: '' });

  const loadData = () => apiGet('/sessions').then(setItems).catch(console.error);
  useEffect(() => { loadData(); }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    await apiPost('/sessions', form);
    setForm({ user_name: '', road_context: '', destination: '' });
    loadData();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-extrabold">Create Sitting Session</h3>
        <p className="mt-1 text-sm font-semibold text-slate-400">Sesi untuk menyimpan konteks pengguna dan saran AI.</p>
        <div className="mt-6 space-y-4">
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-blue-500" placeholder="Nama user/operator" value={form.user_name} onChange={(e) => setForm({ ...form, user_name: e.target.value })} />
          <textarea className="min-h-32 w-full rounded-2xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-blue-500" placeholder="Konteks jalan / situasi lalu lintas" value={form.road_context} onChange={(e) => setForm({ ...form, road_context: e.target.value })} />
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-blue-500" placeholder="Tujuan" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} />
          <button className="w-full rounded-2xl bg-blue-600 px-5 py-3 font-extrabold text-white">Save Session</button>
        </div>
      </form>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-extrabold">Session History</h3>
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-100 p-4">
              <p className="font-extrabold">{item.user_name}</p>
              <p className="mt-2 text-sm font-semibold text-slate-500">{item.road_context}</p>
              <p className="mt-3 rounded-2xl bg-blue-50 p-3 text-sm font-bold text-blue-700">{item.ai_suggestion}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
