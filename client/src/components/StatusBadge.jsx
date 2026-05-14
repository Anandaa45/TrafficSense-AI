const styles = {
  heavy: 'bg-red-50 text-red-700',
  active: 'bg-red-50 text-red-700',
  high: 'bg-red-50 text-red-700',
  moderate: 'bg-amber-50 text-amber-700',
  medium: 'bg-amber-50 text-amber-700',
  normal: 'bg-emerald-50 text-emerald-700',
  low: 'bg-emerald-50 text-emerald-700',
  resolved: 'bg-slate-100 text-slate-600',
};

export default function StatusBadge({ value }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-extrabold capitalize ${styles[value] || styles.normal}`}>{value}</span>;
}
