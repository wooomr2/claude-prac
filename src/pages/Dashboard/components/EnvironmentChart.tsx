import { TEMP_HISTORY, HUMID_HISTORY } from '../data';

const EnvironmentChart = () => {
  const W = 500,
    H = 190;
  const P = { t: 20, r: 16, b: 36, l: 48 };
  const iW = W - P.l - P.r;
  const iH = H - P.t - P.b;

  const TMIN = 18,
    TMAX = 28;
  const HMIN = 55,
    HMAX = 80;

  const tLine = TEMP_HISTORY.map((v, i) => {
    const x = P.l + (i / 23) * iW;
    const y = P.t + iH - ((v - TMIN) / (TMAX - TMIN)) * iH;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');

  const hLine = HUMID_HISTORY.map((v, i) => {
    const x = P.l + (i / 23) * iW;
    const y = P.t + iH - ((v - HMIN) / (HMAX - HMIN)) * iH;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');

  const tArea = `${tLine} L${(P.l + iW).toFixed(1)} ${P.t + iH} L${P.l} ${P.t + iH} Z`;
  const hArea = `${hLine} L${(P.l + iW).toFixed(1)} ${P.t + iH} L${P.l} ${P.t + iH} Z`;

  const xTicks = [0, 4, 8, 12, 16, 20, 23];
  const yTicks = [18, 20, 22, 24, 26, 28];

  const lastTx = P.l + iW;
  const lastTy = P.t + iH - ((TEMP_HISTORY[23] - TMIN) / (TMAX - TMIN)) * iH;
  const lastHx = P.l + iW;
  const lastHy = P.t + iH - ((HUMID_HISTORY[23] - HMIN) / (HMAX - HMIN)) * iH;

  return (
    <div
      className="rounded-xl border h-full flex flex-col p-4"
      style={{ background: '#090f0b', borderColor: '#1a3020' }}
    >
      <div className="flex items-center justify-between mb-3 shrink-0">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>
            24시간 환경 추이
          </h3>
          <p className="text-[11px] mt-0.5" style={{ color: '#374151' }}>
            오늘 온도 및 습도 변화
          </p>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-0.5 inline-block rounded" style={{ background: '#f59e0b' }} />
            <span style={{ color: '#64748b' }}>온도 (°C)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-0.5 inline-block rounded" style={{ background: '#06b6d4' }} />
            <span style={{ color: '#64748b' }}>습도 (%)</span>
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

          {yTicks.map((v) => {
            const y = P.t + iH - ((v - TMIN) / (TMAX - TMIN)) * iH;
            return <line key={v} x1={P.l} y1={y} x2={P.l + iW} y2={y} stroke="#111c14" strokeWidth="1" />;
          })}

          {yTicks.map((v) => {
            const y = P.t + iH - ((v - TMIN) / (TMAX - TMIN)) * iH;
            return (
              <text
                key={v}
                x={P.l - 6}
                y={y + 3.5}
                textAnchor="end"
                fontSize="9"
                fill="#2d4a35"
                fontFamily="JetBrains Mono, monospace"
              >
                {v}°
              </text>
            );
          })}

          {xTicks.map((h) => {
            const x = P.l + (h / 23) * iW;
            return (
              <text
                key={h}
                x={x}
                y={H - 8}
                textAnchor="middle"
                fontSize="9"
                fill="#2d4a35"
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

          <circle cx={lastHx} cy={lastHy} r="3" fill="#06b6d4" />
          <circle cx={lastTx} cy={lastTy} r="3.5" fill="#f59e0b" />

          <text x={lastTx + 6} y={lastTy + 4} fontSize="9.5" fill="#f59e0b" fontFamily="JetBrains Mono, monospace">
            {TEMP_HISTORY[23]}°
          </text>
          <text x={lastHx + 6} y={lastHy + 4} fontSize="9.5" fill="#06b6d4" fontFamily="JetBrains Mono, monospace">
            {HUMID_HISTORY[23]}%
          </text>
        </svg>
      </div>
    </div>
  );
};

export default EnvironmentChart;
