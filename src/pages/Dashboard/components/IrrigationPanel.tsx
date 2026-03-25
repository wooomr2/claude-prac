import { IRRIGATION } from '../data';

const IrrigationPanel = () => (
  <div className="rounded-xl border flex flex-col p-4" style={{ background: '#090f0b', borderColor: '#1a3020' }}>
    <div className="flex items-center justify-between mb-3">
      <div>
        <h3 className="text-sm font-semibold" style={{ color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>
          관수 일정
        </h3>
        <p className="text-[11px] mt-0.5" style={{ color: '#374151' }}>
          오늘 스케줄 · 5건
        </p>
      </div>
      <button
        className="text-[11px] px-3 py-1 rounded-lg border transition-colors"
        style={{ background: 'rgba(34,197,94,0.08)', color: '#22c55e', borderColor: 'rgba(34,197,94,0.2)' }}
      >
        + 추가
      </button>
    </div>
    <div className="space-y-1.5">
      {IRRIGATION.map((item) => (
        <div
          key={`${item.zone}-${item.time}`}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs"
          style={{
            background: item.next ? 'rgba(34,197,94,0.07)' : item.done ? 'rgba(255,255,255,0.02)' : '#0a1410',
            border: item.next ? '1px solid rgba(34,197,94,0.18)' : '1px solid transparent',
            opacity: item.done ? 0.55 : 1,
          }}
        >
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold font-mono"
            style={{
              background: item.done ? '#111c14' : 'rgba(34,197,94,0.12)',
              color: item.done ? '#2d4a35' : '#22c55e',
            }}
          >
            {item.zone}
          </div>
          <span className="w-20 truncate" style={{ color: '#94a3b8', fontFamily: 'Noto Sans KR, sans-serif' }}>
            {item.crop}
          </span>
          <span className="font-mono" style={{ color: '#374151' }}>
            {item.time}
          </span>
          <span style={{ color: '#374151' }}>{item.duration}분</span>
          <span className="ml-auto font-mono" style={{ color: '#06b6d4' }}>
            {item.volume}L
          </span>
          <span
            className="text-[10px] px-1.5 py-0.5 rounded font-mono"
            style={{
              background: item.done ? '#111c14' : item.next ? 'rgba(34,197,94,0.12)' : '#0d1a10',
              color: item.done ? '#2d4a35' : item.next ? '#22c55e' : '#374151',
            }}
          >
            {item.done ? '완료' : item.next ? '다음' : '예정'}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default IrrigationPanel;
