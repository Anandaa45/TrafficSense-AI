export default function StatCard({ title, value, subtitle, icon: Icon }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-bold text-slate-500">{title}</p>
          <h3 className="mt-3 text-3xl font-extrabold text-slate-950">{value}</h3>
        </div>
        {Icon && (
          <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
            <Icon size={24} />
          </div>
        )}
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-400">{subtitle}</p>
    </article>
  );
}
