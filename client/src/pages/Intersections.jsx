import { useEffect, useState } from 'react';
import { apiGet } from '../lib/api.js';
import StatusBadge from '../components/StatusBadge.jsx';

export default function Intersections() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    apiGet('/intersections').then(setItems).catch(console.error);
  }, []);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-extrabold">Intersections</h3>
      <p className="mt-1 text-sm font-semibold text-slate-400">Daftar persimpangan yang dipantau sistem.</p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="border-b text-sm text-slate-400">
              <th className="py-4">Name</th>
              <th>Location</th>
              <th>Congestion</th>
              <th>Speed</th>
              <th>Vehicles</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-slate-100 text-sm font-bold">
                <td className="py-4 text-slate-950">{item.name}</td>
                <td className="text-slate-500">{item.location}</td>
                <td>{item.congestion_level}%</td>
                <td>{item.average_speed} km/h</td>
                <td>{item.vehicle_count}</td>
                <td><StatusBadge value={item.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
