import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';

// No default delta: a trend renders ONLY when real comparison data is passed.
// goodWhenDown flips the color semantics (e.g. expenses: a rise is bad) without changing the arrow.
export default function StatCard({ label, value, delta, spark, footnote, hint, goodWhenDown = false }) {
  const isGood = delta ? (goodWhenDown ? delta.direction === 'down' : delta.direction === 'up') : false;
  const flat = delta?.direction === 'flat';
  return (
    <div className="overflow-hidden rounded-md border border-line bg-surface p-4">
      <p className="text-xs font-medium text-ink-soft">
        {label}
        {hint && <span className="ml-1.5 font-normal text-ink-soft">· {hint}</span>}
      </p>
      <div className="mt-1 flex items-end justify-between gap-3">
        <p className="num min-w-0 text-[26px] font-semibold leading-8 text-ink">{value}</p>
        {Array.isArray(spark) && spark.length > 1 && <Spark data={spark} />}
      </div>
      {delta ? (
        <p className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${flat ? 'text-ink-soft' : isGood ? 'text-ok' : 'text-out'}`}>
          {flat ? <Minus size={13} /> : delta.direction === 'down' ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />}
          {Math.abs(delta.value)}% vs previous period
        </p>
      ) : (
        footnote && <p className="mt-1 text-xs text-ink-soft">{footnote}</p>
      )}
    </div>
  );
}

function Spark({ data }) {
  const max = Math.max(...data, 1);
  const w = 72;
  const h = 28;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * (h - 2) - 1}`)
    .join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" className="shrink-0">
      <polyline points={points} fill="none" stroke="var(--chart-rose)" strokeWidth="1.5" />
    </svg>
  );
}
