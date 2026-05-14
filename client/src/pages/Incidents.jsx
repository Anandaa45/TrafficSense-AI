import { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../lib/api.js';
import StatusBadge from '../components/StatusBadge.jsx';

export default function Incidents() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', location: '', severity: 'medium' });

  const loadData = () => apiGet('/incidents').then(setItems).catch(console.error);

  useEffect(() => { loadData(); }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    await apiPost('/incidents', form);
    setForm({ title: '', location: '', severity: 'medium' });
    loadData();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-extrabold">Report Incident</h3>
        <p className="mt-1 text-sm font-semibold text-slate-400">Tambah data insiden ke PostgreSQL.</p>
        <div className="mt-6 space-y-4">
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-blue-500" placeholder="Judul insiden" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-blue-500" placeholder="Lokasi" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <select className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-blue-500" value={form.severity} onChange={(e) => setForm({ ...form, severity: e.target.value })}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button className="w-full rounded-2xl bg-blue-600 px-5 py-3 font-extrabold text-white">Save Incident</button>
        </div>
      </form>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-extrabold">Incident List</h3>
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-100 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-extrabold">{item.title}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-400">{item.location}</p>
                </div>
                <StatusBadge value={item.severity} />
              </div>
              <p className="mt-3 text-sm font-bold text-slate-500">Status: {item.status}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
