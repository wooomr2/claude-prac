import { areaPath, linePath } from '@/utils/svg';
import type { ISensorCardProps, SensorStatus } from '../types';

// ─── Status Style Maps ───────────────────────────────────────────────────────
const BORDER_BY_STATUS: Record<SensorStatus, string> = {
  normal: 'var(--sf-ok-border)',
  warning: 'var(--sf-warn-border)',
  danger: 'var(--sf-danger-border)',
};

const BG_BY_STATUS: Record<SensorStatus, string> = {
  normal: 'var(--sf-ok-bg)',
  warning: 'var(--sf-warn-bg)',
  danger: 'var(--sf-danger-bg)',
};

const BADGE_BY_STATUS: Record<SensorStatus, { background: string; color: string; label: string }> = {
  normal: { background: 'var(--sf-accent-bg)', color: 'var(--sf-accent)', label: '정상' },
  warning: { background: 'rgba(245,158,11,0.1)', color: '#f59e0b', label: '주의' },
  danger: { background: 'rgba(239,68,68,0.1)', color: '#f87171', label: '위험' },
};

// ─── Sparkline ────────────────────────────────────────────────────────────────
interface ISparklineProps {
  data: number[];
  color: string;
  w?: number;
  h?: number;
}

function Sparkline({ data, color, w = 80, h = 30 }: ISparklineProps) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const gid = `g${color.replace(/[^a-z0-9]/gi, '')}`;
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
}

// ─── Ring Gauge ───────────────────────────────────────────────────────────────
interface RingProps {
  pct: number;
  color: string;
  size?: number;
}

function Ring({ pct, color, size = 56 }: RingProps) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const fill = Math.min(Math.max(pct, 0), 1) * circ;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--sf-border)" strokeWidth="5" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeDasharray={`${fill.toFixed(2)} ${(circ - fill + 0.01).toFixed(2)}`}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 1.2s ease-in-out' }}
      />
    </svg>
  );
}

// ─── SensorCard ───────────────────────────────────────────────────────────────
function SensorCard({ label, value, unit, min, max, target, color, status, trend, history, icon }: ISensorCardProps) {
  const pct = (value - min) / (max - min);
  const isInteger = unit === 'lux' || unit === 'ppm';
  const displayVal = value > 999 ? value.toLocaleString() : value.toFixed(isInteger ? 0 : 1);
  const badge = BADGE_BY_STATUS[status];

  return (
    <div
      className="relative rounded-xl border flex flex-col gap-2.5 p-4 overflow-hidden fade-in"
      style={{ borderColor: BORDER_BY_STATUS[status], background: BG_BY_STATUS[status], boxShadow: 'var(--sf-shadow)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: color }} />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">{icon}</span>
          <span
            className="text-[11px] font-medium"
            style={{ color: 'var(--sf-text-2)', fontFamily: 'Noto Sans KR, sans-serif' }}
          >
            {label}
          </span>
        </div>
        <span
          className="text-[10px] px-2 py-0.5 rounded-full font-mono"
          style={{ background: badge.background, color: badge.color }}
        >
          {badge.label}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Ring pct={pct} color={color} size={52} />
        <div className="flex flex-col">
          <span className="text-2xl font-bold leading-none" style={{ color, fontFamily: 'JetBrains Mono, monospace' }}>
            {displayVal}
          </span>
          <span className="text-[11px] mt-1" style={{ color: 'var(--sf-text-4)' }}>
            {unit}
          </span>
        </div>
        <div className="ml-auto flex flex-col items-end gap-1">
          <Sparkline data={history} color={color} w={72} h={28} />
          <span className="text-[10px] font-mono" style={{ color: trend > 0 ? '#f59e0b' : 'var(--sf-accent)' }}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}
            {unit === '°C' || unit === '%' ? unit : ''}
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-[10px] font-mono" style={{ color: 'var(--sf-text-5)' }}>
          <span>{min}</span>
          <span style={{ color: 'var(--sf-text-4)' }}>
            목표 {target}
            {unit}
          </span>
          <span>{max}</span>
        </div>
        <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'var(--sf-border)' }}>
          <div
            className="h-full rounded-full"
            style={{ width: `${Math.min(pct * 100, 100)}%`, background: color, transition: 'width 1.2s ease' }}
          />
        </div>
      </div>
    </div>
  );
}

export default SensorCard;
