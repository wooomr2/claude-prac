import { ALERTS } from '../data';
import type { AlertType } from '../types';

const ALERT_STYLE: Record<AlertType, { dot: string; text: string; bg: string }> = {
  info: { dot: '#60a5fa', text: '#60a5fa', bg: 'rgba(96,165,250,0.05)' },
  warning: { dot: '#f59e0b', text: '#f59e0b', bg: 'rgba(245,158,11,0.06)' },
  success: { dot: '#22c55e', text: '#22c55e', bg: 'rgba(34,197,94,0.05)' },
  danger: { dot: '#f87171', text: '#f87171', bg: 'rgba(248,113,113,0.06)' },
};

const AlertFeed = () => (
  <div className="rounded-xl border flex flex-col p-4" style={{ background: '#090f0b', borderColor: '#1a3020' }}>
    <div className="flex items-center justify-between mb-3">
      <div>
        <h3 className="text-sm font-semibold" style={{ color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>
          알림 피드
        </h3>
        <p className="text-[11px] mt-0.5" style={{ color: '#374151' }}>
          최근 12시간 이벤트
        </p>
      </div>
      <span
        className="text-[10px] px-2 py-0.5 rounded-full font-mono"
        style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}
      >
        2 미확인
      </span>
    </div>
    <div className="space-y-1.5 overflow-auto">
      {ALERTS.map((a) => {
        const s = ALERT_STYLE[a.type];
        return (
          <div key={a.id} className="flex items-start gap-2.5 p-2.5 rounded-lg" style={{ background: s.bg }}>
            <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: s.dot }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span
                  className="text-[12px] font-medium truncate"
                  style={{ color: s.text, fontFamily: 'Noto Sans KR, sans-serif' }}
                >
                  {a.message}
                </span>
                <span className="text-[10px] font-mono shrink-0" style={{ color: '#374151' }}>
                  {a.time}
                </span>
              </div>
              <div className="text-[11px] mt-0.5" style={{ color: '#374151', fontFamily: 'Noto Sans KR, sans-serif' }}>
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
