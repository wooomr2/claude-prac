import { ALERTS } from '../data';
import type { AlertType } from '../types';

const ALERT_VARS: Record<AlertType, { color: string; bg: string }> = {
  info: { color: 'var(--sf-alert-info)', bg: 'var(--sf-alert-info-bg)' },
  warning: { color: 'var(--sf-alert-warn)', bg: 'var(--sf-alert-warn-bg)' },
  success: { color: 'var(--sf-alert-ok)', bg: 'var(--sf-alert-ok-bg)' },
  danger: { color: 'var(--sf-alert-danger)', bg: 'var(--sf-alert-danger-bg)' },
};

const AlertFeed = () => (
  <div
    className="rounded-xl border flex flex-col p-4"
    style={{ background: 'var(--sf-bg-card)', borderColor: 'var(--sf-border)', boxShadow: 'var(--sf-shadow)' }}
  >
    <div className="flex items-center justify-between mb-3">
      <div>
        <h3 className="text-sm font-semibold" style={{ color: 'var(--sf-text-0)', fontFamily: 'Syne, sans-serif' }}>
          알림 피드
        </h3>
        <p className="text-[11px] mt-0.5" style={{ color: 'var(--sf-text-4)' }}>
          최근 12시간 이벤트
        </p>
      </div>
      <span
        className="text-[10px] px-2 py-0.5 rounded-full font-mono"
        style={{ background: 'var(--sf-alert-warn-bg)', color: 'var(--sf-alert-warn)' }}
      >
        2 미확인
      </span>
    </div>
    <div className="space-y-1.5 overflow-auto">
      {ALERTS.map((a) => {
        const s = ALERT_VARS[a.type];
        return (
          <div key={a.id} className="flex items-start gap-2.5 p-2.5 rounded-lg" style={{ background: s.bg }}>
            <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: s.color }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span
                  className="text-[12px] font-medium truncate"
                  style={{ color: s.color, fontFamily: 'Noto Sans KR, sans-serif' }}
                >
                  {a.message}
                </span>
                <span className="text-[10px] font-mono shrink-0" style={{ color: 'var(--sf-text-4)' }}>
                  {a.time}
                </span>
              </div>
              <div
                className="text-[11px] mt-0.5"
                style={{ color: 'var(--sf-text-3)', fontFamily: 'Noto Sans KR, sans-serif' }}
              >
                {a.detail}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default AlertFeed;
