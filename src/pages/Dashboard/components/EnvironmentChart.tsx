import { HUMID_HISTORY, TEMP_HISTORY } from '../data';

// ─── Chart Constants ─────────────────────────────────────────────────────────
const W = 500;
const H = 190;
const P = { t: 20, r: 16, b: 36, l: 48 };
const IW = W - P.l - P.r;
const IH = H - P.t - P.b;

const TEMP_RANGE = { min: 18, max: 28 };
const HUMID_RANGE = { min: 55, max: 80 };

const X_TICKS = [0, 4, 8, 12, 16, 20, 23];
const Y_TICKS = [18, 20, 22, 24, 26, 28];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function buildChartLine(data: number[], range: { min: number; max: number }): string {
  const span = range.max - range.min;
  return data
    .map((v, i) => {
      const x = P.l + (i / 23) * IW;
      const y = P.t + IH - ((v - range.min) / span) * IH;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
}

function buildChartArea(linePath: string): string {
  return `${linePath} L${(P.l + IW).toFixed(1)} ${P.t + IH} L${P.l} ${P.t + IH} Z`;
}

function yForValue(value: number, range: { min: number; max: number }): number {
  return P.t + IH - ((value - range.min) / (range.max - range.min)) * IH;
}

// ─── Component ───────────────────────────────────────────────────────────────
function EnvironmentChart() {
  const tLine = buildChartLine(TEMP_HISTORY, TEMP_RANGE);
  const hLine = buildChartLine(HUMID_HISTORY, HUMID_RANGE);
  const tArea = buildChartArea(tLine);
  const hArea = buildChartArea(hLine);

  const lastX = P.l + IW;
  const lastTy = yForValue(TEMP_HISTORY[23], TEMP_RANGE);
  const lastHy = yForValue(HUMID_HISTORY[23], HUMID_RANGE);

  return (
    <div
      className="rounded-xl border flex flex-col p-4 min-h-[260px] md:h-full"
      style={{ background: 'var(--sf-bg-card)', borderColor: 'var(--sf-border)', boxShadow: 'var(--sf-shadow)' }}
    >
      <div className="flex items-center justify-between mb-3 shrink-0">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--sf-text-0)', fontFamily: 'Syne, sans-serif' }}>
            24시간 환경 추이
          </h3>
          <p className="text-[11px] mt-0.5" style={{ color: 'var(--sf-text-4)' }}>
            오늘 온도 및 습도 변화
          </p>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-0.5 inline-block rounded" style={{ background: '#f59e0b' }} />
            <span style={{ color: 'var(--sf-text-2)' }}>온도 (°C)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-0.5 inline-block rounded" style={{ background: '#06b6d4' }} />
            <span style={{ color: 'var(--sf-text-2)' }}>습도 (%)</span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
          <defs>
            <linearGradient id="tGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
          </defs>

          {Y_TICKS.map((v) => {
            const y = yForValue(v, TEMP_RANGE);
            return <line key={v} x1={P.l} y1={y} x2={P.l + IW} y2={y} stroke="var(--sf-chart-grid)" strokeWidth="1" />;
          })}

          {Y_TICKS.map((v) => {
            const y = yForValue(v, TEMP_RANGE);
            return (
              <text
                key={v}
                x={P.l - 6}
                y={y + 3.5}
                textAnchor="end"
                fontSize="9"
                fill="var(--sf-text-5)"
                fontFamily="JetBrains Mono, monospace"
              >
                {v}°
              </text>
            );
          })}

          {X_TICKS.map((h) => {
            const x = P.l + (h / 23) * IW;
            return (
              <text
                key={h}
                x={x}
                y={H - 8}
                textAnchor="middle"
                fontSize="9"
                fill="var(--sf-text-5)"
                fontFamily="JetBrains Mono, monospace"
              >
                {String(h).padStart(2, '0')}h
              </text>
            );
          })}

          <path d={hArea} fill="url(#hGrad)" />
          <path d={tArea} fill="url(#tGrad)" />
          <path d={hLine} stroke="#06b6d4" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
          <path d={tLine} stroke="#f59e0b" strokeWidth="2" fill="none" strokeLinejoin="round" />

          <circle cx={lastX} cy={lastHy} r="3" fill="#06b6d4" />
          <circle cx={lastX} cy={lastTy} r="3.5" fill="#f59e0b" />

          <text x={lastX + 6} y={lastTy + 4} fontSize="9.5" fill="#f59e0b" fontFamily="JetBrains Mono, monospace">
            {TEMP_HISTORY[23]}°
          </text>
          <text x={lastX + 6} y={lastHy + 4} fontSize="9.5" fill="#06b6d4" fontFamily="JetBrains Mono, monospace">
            {HUMID_HISTORY[23]}%
          </text>
        </svg>
      </div>
    </div>
  );
}

export default EnvironmentChart;
