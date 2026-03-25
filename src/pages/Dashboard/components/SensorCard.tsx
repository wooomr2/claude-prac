import type { SensorCardProps } from "../types";

// ─── SVG Helpers ──────────────────────────────────────────────────────────────
function linePath(data: number[], min: number, max: number, w: number, h: number, p = 2): string {
  const range = max - min || 1;
  return data
    .map((v, i) => {
      const x = p + (i / (data.length - 1)) * (w - p * 2);
      const y = h - p - ((v - min) / range) * (h - p * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}
function areaPath(data: number[], min: number, max: number, w: number, h: number, p = 2): string {
  const line = linePath(data, min, max, w, h, p);
  return `${line} L${(w - p).toFixed(1)} ${h} L${p} ${h} Z`;
}

// ─── Sparkline ────────────────────────────────────────────────────────────────
const Sparkline = ({ data, color, w = 80, h = 30 }: { data: number[]; color: string; w?: number; h?: number }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const gid = `g${color.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath(data, min, max, w, h)} fill={`url(#${gid})`} />
      <path d={linePath(data, min, max, w, h)} stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    </svg>
  );
};

// ─── Ring Gauge ───────────────────────────────────────────────────────────────
const Ring = ({ pct, color, size = 56 }: { pct: number; color: string; size?: number }) => {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const fill = Math.min(Math.max(pct, 0), 1) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1a3020" strokeWidth="5" />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={`${fill.toFixed(2)} ${(circ - fill + 0.01).toFixed(2)}`}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 1.2s ease-in-out" }}
      />
    </svg>
  );
};

// ─── SensorCard ───────────────────────────────────────────────────────────────
const SensorCard = ({ label, value, unit, min, max, target, color, status, trend, history, icon }: SensorCardProps) => {
  const pct = (value - min) / (max - min);
  const displayVal =
    value > 999 ? value.toLocaleString() : value.toFixed(unit === "lux" || unit === "ppm" ? 0 : 1);
  const borderColor = status === "normal" ? "#1a3020" : status === "warning" ? "#4a3010" : "#4a1010";
  const bg = status === "normal" ? "#090f0b" : status === "warning" ? "#100c04" : "#100404";

  return (
    <div
      className="relative rounded-xl border flex flex-col gap-2.5 p-4 overflow-hidden fade-in"
      style={{ borderColor, background: bg }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: color }} />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">{icon}</span>
          <span className="text-[11px] font-medium" style={{ color: "#64748b", fontFamily: "Noto Sans KR, sans-serif" }}>
            {label}
          </span>
        </div>
        <span
          className="text-[10px] px-2 py-0.5 rounded-full font-mono"
          style={
            status === "normal"
              ? { background: "rgba(34,197,94,0.1)", color: "#22c55e" }
              : status === "warning"
                ? { background: "rgba(245,158,11,0.1)", color: "#f59e0b" }
                : { background: "rgba(239,68,68,0.1)", color: "#f87171" }
          }
        >
          {status === "normal" ? "정상" : status === "warning" ? "주의" : "위험"}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Ring pct={pct} color={color} size={52} />
        <div className="flex flex-col">
          <span className="text-2xl font-bold leading-none" style={{ color, fontFamily: "JetBrains Mono, monospace" }}>
            {displayVal}
          </span>
          <span className="text-[11px] mt-1" style={{ color: "#374151" }}>
            {unit}
          </span>
        </div>
        <div className="ml-auto flex flex-col items-end gap-1">
          <Sparkline data={history} color={color} w={72} h={28} />
          <span className="text-[10px] font-mono" style={{ color: trend > 0 ? "#f59e0b" : "#22c55e" }}>
            {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}
            {unit === "°C" || unit === "%" ? unit : ""}
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-[10px] font-mono" style={{ color: "#2d4a35" }}>
          <span>{min}</span>
          <span style={{ color: "#374151" }}>목표 {target}{unit}</span>
          <span>{max}</span>
        </div>
        <div className="h-[3px] rounded-full overflow-hidden" style={{ background: "#1a3020" }}>
          <div
            className="h-full rounded-full"
            style={{ width: `${Math.min(pct * 100, 100)}%`, background: color, transition: "width 1.2s ease" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SensorCard;
