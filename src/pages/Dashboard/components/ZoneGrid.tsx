import { ZONES } from '../data';
import type { ZoneStatus } from '../types';

const ZoneGrid = () => {
  const statusColor: Record<ZoneStatus, string> = {
    active: '#22c55e',
    warning: '#f59e0b',
    inactive: '#374151',
  };
  const statusBg: Record<ZoneStatus, string> = {
    active: 'rgba(34,197,94,0.04)',
    warning: 'rgba(245,158,11,0.06)',
    inactive: 'rgba(255,255,255,0.02)',
  };

  return (
    <div
      className="rounded-xl border flex flex-col p-4 h-full"
      style={{ background: '#090f0b', borderColor: '#1a3020' }}
    >
      <div className="mb-3 shrink-0">
        <h3 className="text-sm font-semibold" style={{ color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>
          재배 구역 현황
        </h3>
        <p className="text-[11px] mt-0.5" style={{ color: '#374151' }}>
          6개 구역 · 5개 운영 중
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 flex-1">
        {ZONES.map((z) => (
          <div
            key={z.id}
            className="rounded-lg border p-2.5 flex flex-col gap-1.5 transition-colors"
            style={{
              background: statusBg[z.status],
              borderColor: z.status === 'inactive' ? '#111c14' : z.status === 'warning' ? '#3d2e0a' : '#1a3020',
              opacity: z.status === 'inactive' ? 0.5 : 1,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold" style={{ color: '#94a3b8' }}>
                {z.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor[z.status] }} />
            </div>
            <div className="text-[11px]" style={{ color: '#374151', fontFamily: 'Noto Sans KR, sans-serif' }}>
              {z.crop}
            </div>
            {z.status !== 'inactive' ? (
              <>
                <div className="flex justify-between text-[10px] font-mono">
                  <span style={{ color: '#f59e0b' }}>{z.temp}°C</span>
                  <span style={{ color: '#06b6d4' }}>{z.humidity}%</span>
                </div>
                <div>
                  <div className="flex justify-between text-[9px] mb-0.5" style={{ color: '#2d4a35' }}>
                    <span>건강도</span>
                    <span style={{ color: statusColor[z.status] }}>{z.health}%</span>
                  </div>
                  <div className="h-[2px] rounded-full" style={{ background: '#111c14' }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${z.health}%`, background: statusColor[z.status] }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <span className="text-[10px] font-mono" style={{ color: '#2d4a35' }}>
                비활성
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ZoneGrid;
