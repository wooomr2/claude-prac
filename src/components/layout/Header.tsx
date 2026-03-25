import { useState, useEffect } from 'react'

// ─── TopBar ───────────────────────────────────────────────────────────────────
const TopBar = ({ time }: { time: Date }) => {
  const t = time.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
  const d = time.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })
  return (
    <header className="flex items-center px-5 shrink-0 gap-4"
      style={{ height: 52, background: '#080f0b', borderBottom: '1px solid #1a3020' }}>
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: '#22c55e' }}>
          Smart Farm
        </span>
        <span className="text-[14px] font-semibold" style={{ color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>
          자동화 제어 센터
        </span>
      </div>
      <div className="h-7 w-px mx-2" style={{ background: '#1a3020' }} />
      <div className="flex items-center gap-1.5 text-xs" style={{ color: '#475569' }}>
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 shrink-0">
          <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 2a5 5 0 110 10A5 5 0 018 3z" opacity=".3"/>
          <path d="M8 5a3 3 0 100 6A3 3 0 008 5z"/>
        </svg>
        경기도 화성 · 온실 1동
      </div>

      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs" style={{ color: '#64748b' }}>
          <span style={{ color: '#fbbf24' }}>☀</span>
          외부 18.5°C · 맑음
        </div>
        <div className="h-5 w-px" style={{ background: '#1a3020' }} />
        <div className="flex flex-col items-end">
          <span className="text-base leading-none" style={{ color: '#e2e8f0', fontFamily: 'JetBrains Mono, monospace' }}>
            {t}
          </span>
          <span className="text-[10px] mt-0.5" style={{ color: '#374151' }}>{d}</span>
        </div>
        <div className="h-5 w-px" style={{ background: '#1a3020' }} />
        <button className="relative flex items-center justify-center w-8 h-8 rounded-lg transition-colors"
          style={{ color: '#475569' }}>
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M10 2a6 6 0 00-6 6v2.586l-1.707 1.707A1 1 0 003 14h14a1 1 0 00.707-1.707L16 10.586V8a6 6 0 00-6-6zM10 18a2 2 0 002-2H8a2 2 0 002 2z"/>
          </svg>
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
            style={{ background: '#f59e0b', color: '#000' }}>
            2
          </span>
        </button>
      </div>
    </header>
  )
}

// ─── StatsStrip ───────────────────────────────────────────────────────────────
const StatsStrip = () => (
  <div className="flex items-center gap-6 px-5 shrink-0 text-[11px] font-mono"
    style={{ height: 30, background: '#060d09', borderBottom: '1px solid #111c14', color: '#2d4a35' }}>
    <span className="flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: '#22c55e' }} />
      시스템 정상 운영
    </span>
    <span>센서 갱신 주기 <span style={{ color: '#374151' }}>2s</span></span>
    <span>마지막 동기화 <span style={{ color: '#374151' }}>09:43:21</span></span>
    <span className="ml-auto">온실 1동 · 재배 면적 <span style={{ color: '#475569' }}>565 m²</span></span>
  </div>
)

// ─── Header ───────────────────────────────────────────────────────────────────
const Header = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <TopBar time={time} />
      <StatsStrip />
    </>
  )
}

export default Header
