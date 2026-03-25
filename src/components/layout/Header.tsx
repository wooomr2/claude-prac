import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

// ─── Icons ────────────────────────────────────────────────────────────────────
function SunIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="w-4 h-4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <circle cx="10" cy="10" r="3.5" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  );
}

// ─── Theme Toggle ─────────────────────────────────────────────────────────────
const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      onClick={toggle}
      className="relative flex items-center w-14 h-7 rounded-full shrink-0 transition-colors duration-300"
      style={{
        background: isDark ? 'rgba(34,197,94,0.15)' : 'rgba(22,163,74,0.12)',
        border: `1px solid var(--sf-border)`,
      }}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      title={isDark ? '라이트 모드' : '다크 모드'}
    >
      {/* Track icons */}
      <span
        className="absolute left-1.5 flex items-center justify-center w-5 h-5 transition-colors"
        style={{ color: isDark ? 'var(--sf-text-5)' : 'var(--sf-accent)' }}
      >
        <SunIcon />
      </span>
      <span
        className="absolute right-1.5 flex items-center justify-center w-5 h-5 transition-colors"
        style={{ color: isDark ? 'var(--sf-accent)' : 'var(--sf-text-5)' }}
      >
        <MoonIcon />
      </span>
      {/* Thumb */}
      <span
        className="absolute w-5 h-5 rounded-full transition-all duration-300 shadow-sm"
        style={{
          left: isDark ? 'calc(100% - 1.625rem)' : '0.25rem',
          background: 'var(--sf-accent)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
        }}
      />
    </button>
  );
};

// ─── TopBar ───────────────────────────────────────────────────────────────────
const TopBar = ({ time, onMenuClick }: { time: Date; onMenuClick: () => void }) => {
  const t = time.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const d = time.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' });
  return (
    <header
      className="flex items-center px-3 md:px-5 shrink-0 gap-2 md:gap-4"
      style={{ height: 52, background: 'var(--sf-bg-surface)', borderBottom: '1px solid var(--sf-border)' }}
    >
      {/* Hamburger — mobile only */}
      <button
        className="md:hidden flex flex-col gap-1 items-center justify-center w-8 h-8 shrink-0"
        onClick={onMenuClick}
        aria-label="메뉴 열기"
      >
        <span className="w-4 h-0.5 rounded" style={{ background: 'var(--sf-text-6)' }} />
        <span className="w-4 h-0.5 rounded" style={{ background: 'var(--sf-text-6)' }} />
        <span className="w-4 h-0.5 rounded" style={{ background: 'var(--sf-text-6)' }} />
      </button>

      <div className="flex flex-col leading-tight">
        <span
          className="text-[10px] font-mono tracking-widest uppercase hidden md:block"
          style={{ color: 'var(--sf-accent)' }}
        >
          Smart Farm
        </span>
        <span
          className="text-[13px] md:text-[14px] font-semibold"
          style={{ color: 'var(--sf-text-0)', fontFamily: 'Syne, sans-serif' }}
        >
          자동화 제어 센터
        </span>
      </div>

      {/* Location — desktop only */}
      <div className="hidden md:block h-7 w-px mx-2" style={{ background: 'var(--sf-border)' }} />
      <div className="hidden md:flex items-center gap-1.5 text-xs" style={{ color: 'var(--sf-text-2)' }}>
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 shrink-0">
          <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 2a5 5 0 110 10A5 5 0 018 3z" opacity=".3" />
          <path d="M8 5a3 3 0 100 6A3 3 0 008 5z" />
        </svg>
        경기도 화성 · 온실 1동
      </div>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        {/* Weather — desktop only */}
        <div className="hidden md:flex items-center gap-2 text-xs" style={{ color: 'var(--sf-text-3)' }}>
          <span style={{ color: '#fbbf24' }}>☀</span>
          외부 18.5°C · 맑음
        </div>
        <div className="hidden md:block h-5 w-px" style={{ background: 'var(--sf-border)' }} />

        {/* Clock */}
        <div className="flex flex-col items-end">
          <span
            className="text-sm md:text-base leading-none"
            style={{ color: 'var(--sf-text-0)', fontFamily: 'JetBrains Mono, monospace' }}
          >
            {t}
          </span>
          <span className="text-[10px] mt-0.5 hidden md:block" style={{ color: 'var(--sf-text-4)' }}>
            {d}
          </span>
        </div>

        <div className="hidden md:block h-5 w-px" style={{ background: 'var(--sf-border)' }} />

        {/* Theme toggle */}
        <ThemeToggle />

        <div className="hidden md:block h-5 w-px" style={{ background: 'var(--sf-border)' }} />

        {/* Notification */}
        <button
          className="relative flex items-center justify-center w-8 h-8 rounded-lg transition-colors"
          style={{ color: 'var(--sf-text-3)' }}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M10 2a6 6 0 00-6 6v2.586l-1.707 1.707A1 1 0 003 14h14a1 1 0 00.707-1.707L16 10.586V8a6 6 0 00-6-6zM10 18a2 2 0 002-2H8a2 2 0 002 2z" />
          </svg>
          <span
            className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
            style={{ background: '#f59e0b', color: '#000' }}
          >
            2
          </span>
        </button>
      </div>
    </header>
  );
};

// ─── StatsStrip ───────────────────────────────────────────────────────────────
const StatsStrip = () => (
  <div
    className="hidden md:flex items-center gap-6 px-5 shrink-0 text-[11px] font-mono"
    style={{
      height: 30,
      background: 'var(--sf-bg-page)',
      borderBottom: '1px solid var(--sf-border-dim)',
      color: 'var(--sf-text-5)',
    }}
  >
    <span className="flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: 'var(--sf-accent)' }} />
      시스템 정상 운영
    </span>
    <span>
      센서 갱신 주기 <span style={{ color: 'var(--sf-text-4)' }}>2s</span>
    </span>
    <span>
      마지막 동기화 <span style={{ color: 'var(--sf-text-4)' }}>09:43:21</span>
    </span>
    <span className="ml-auto">
      온실 1동 · 재배 면적 <span style={{ color: 'var(--sf-text-3)' }}>565 m²</span>
    </span>
  </div>
);

// ─── Header ───────────────────────────────────────────────────────────────────
const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <TopBar time={time} onMenuClick={onMenuClick} />
      <StatsStrip />
    </>
  );
};

export default Header;
