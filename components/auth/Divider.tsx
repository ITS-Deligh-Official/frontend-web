export default function Divider({ label = "OR" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 text-xs text-slate-400">
      <div className="h-px flex-1 bg-slate-200" />
      {label}
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}
