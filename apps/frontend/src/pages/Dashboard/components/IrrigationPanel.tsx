import { IRRIGATION } from '../data';
import type { IrrigationSchedule } from '../types';

function getItemBackground(item: IrrigationSchedule): string {
  if (item.next) return 'var(--sf-accent-next-bg)';
  if (item.done) return 'var(--sf-zone-inactive-bg)';
  return 'var(--sf-bg-item)';
}

function getItemBorder(item: IrrigationSchedule): string {
  if (item.next) return '1px solid var(--sf-accent-next-border)';
  return '1px solid transparent';
}

function getBadgeStyle(item: IrrigationSchedule): { background: string; color: string; label: string } {
  if (item.done) {
    return { background: 'var(--sf-accent-done-bg)', color: 'var(--sf-accent-done-text)', label: '완료' };
  }
  if (item.next) {
    return { background: 'var(--sf-accent-bg)', color: 'var(--sf-accent)', label: '다음' };
  }
  return { background: 'var(--sf-bg-item)', color: 'var(--sf-text-4)', label: '예정' };
}

function IrrigationPanel() {
  return (
    <div
      className="rounded-xl border flex flex-col p-4"
      style={{ background: 'var(--sf-bg-card)', borderColor: 'var(--sf-border)', boxShadow: 'var(--sf-shadow)' }}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--sf-text-0)', fontFamily: 'Syne, sans-serif' }}>
            관수 일정
          </h3>
          <p className="text-[11px] mt-0.5" style={{ color: 'var(--sf-text-4)' }}>
            오늘 스케줄 · 5건
          </p>
        </div>
        <button
          className="text-[11px] px-3 py-1 rounded-lg border transition-colors"
          style={{
            background: 'var(--sf-accent-bg)',
            color: 'var(--sf-accent)',
            borderColor: 'var(--sf-accent-next-border)',
          }}
        >
          + 추가
        </button>
      </div>
      <div className="space-y-1.5">
        {IRRIGATION.map((item) => {
          const badge = getBadgeStyle(item);
          return (
            <div
              key={`${item.zone}-${item.time}`}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs"
              style={{
                background: getItemBackground(item),
                border: getItemBorder(item),
                opacity: item.done ? 0.6 : 1,
              }}
            >
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold font-mono shrink-0"
                style={{
                  background: item.done ? 'var(--sf-accent-done-bg)' : 'var(--sf-accent-bg)',
                  color: item.done ? 'var(--sf-accent-done-text)' : 'var(--sf-accent)',
                }}
              >
                {item.zone}
              </div>
              <span
                className="w-20 truncate"
                style={{ color: 'var(--sf-text-1)', fontFamily: 'Noto Sans KR, sans-serif' }}
              >
                {item.crop}
              </span>
              <span className="font-mono" style={{ color: 'var(--sf-text-4)' }}>
                {item.time}
              </span>
              <span style={{ color: 'var(--sf-text-4)' }}>{item.duration}분</span>
              <span className="ml-auto font-mono" style={{ color: '#06b6d4' }}>
                {item.volume}L
              </span>
              <span
                className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                style={{ background: badge.background, color: badge.color }}
              >
                {badge.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default IrrigationPanel;
