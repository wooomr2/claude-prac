import { ZONES } from '../data'
import type { ZoneStatus } from '../types'

const STATUS_COLOR: Record<ZoneStatus, string> = {
  active: 'var(--sf-accent)',
  warning: '#f59e0b',
  inactive: 'var(--sf-text-4)',
}

const STATUS_BG: Record<ZoneStatus, string> = {
  active: 'var(--sf-zone-active-bg)',
  warning: 'var(--sf-zone-warn-bg)',
  inactive: 'var(--sf-zone-inactive-bg)',
}

const STATUS_BORDER: Record<ZoneStatus, string> = {
  active: 'var(--sf-border)',
  warning: 'var(--sf-warn-border)',
  inactive: 'var(--sf-border-dim)',
}

function ZoneGrid() {
  return (
    <div
      className="rounded-xl border flex flex-col p-4 min-h-[280px] md:h-full"
      style={{ background: 'var(--sf-bg-card)', borderColor: 'var(--sf-border)', boxShadow: 'var(--sf-shadow)' }}
    >
      <div className="mb-3 shrink-0">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--sf-text-0)', fontFamily: 'Syne, sans-serif' }}>
          재배 구역 현황
        </h3>
        <p className="text-[11px] mt-0.5" style={{ color: 'var(--sf-text-4)' }}>
          6개 구역 · 5개 운영 중
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 flex-1">
        {ZONES.map((z) => (
          <div
            key={z.id}
            className="rounded-lg border p-2.5 flex flex-col gap-1.5 transition-colors"
            style={{
              background: STATUS_BG[z.status],
              borderColor: STATUS_BORDER[z.status],
              opacity: z.status === 'inactive' ? 0.5 : 1,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold" style={{ color: 'var(--sf-text-1)' }}>
                {z.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: STATUS_COLOR[z.status] }} />
            </div>
            <div className="text-[11px]" style={{ color: 'var(--sf-text-4)', fontFamily: 'Noto Sans KR, sans-serif' }}>
              {z.crop}
            </div>
            {z.status !== 'inactive' ? (
              <>
                <div className="flex justify-between text-[10px] font-mono">
                  <span style={{ color: '#f59e0b' }}>{z.temp}°C</span>
                  <span style={{ color: '#06b6d4' }}>{z.humidity}%</span>
                </div>
                <div>
                  <div className="flex justify-between text-[9px] mb-0.5" style={{ color: 'var(--sf-text-5)' }}>
                    <span>건강도</span>
                    <span style={{ color: STATUS_COLOR[z.status] }}>{z.health}%</span>
                  </div>
                  <div className="h-[2px] rounded-full" style={{ background: 'var(--sf-border-dim)' }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${z.health}%`, background: STATUS_COLOR[z.status] }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <span className="text-[10px] font-mono" style={{ color: 'var(--sf-text-5)' }}>
                비활성
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ZoneGrid
