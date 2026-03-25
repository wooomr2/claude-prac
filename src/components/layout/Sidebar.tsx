import { useState } from 'react';

// ─── Icon Components ──────────────────────────────────────────────────────────
function UserIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
      <circle cx="10" cy="6" r="3.5" />
      <path
        d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
function CloudIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
      <path d="M15.5 9.5A4.5 4.5 0 0011 5a4.49 4.49 0 00-4.22 2.95A3.5 3.5 0 104.5 15H15a3 3 0 00.5-5.5z" />
    </svg>
  );
}
function DeviceIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
      <rect x="2" y="5" width="10" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 9h3l2 2-2 2h-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="7" cy="9" r="1.5" />
    </svg>
  );
}
function AppIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
      <rect x="2" y="2" width="7" height="7" rx="1.5" />
      <rect x="11" y="2" width="7" height="7" rx="1.5" />
      <rect x="2" y="11" width="7" height="7" rx="1.5" />
      <rect x="11" y="11" width="7" height="7" rx="1.5" />
    </svg>
  );
}
function ServiceIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
      <circle cx="10" cy="10" r="3" />
      <path
        d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
function CodeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
      <path
        d="M7 6L3 10l4 4M13 6l4 4-4 4M11 4l-2 12"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function TreeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
      <circle cx="10" cy="3" r="1.5" fill="currentColor" />
      <circle cx="4" cy="13" r="1.5" fill="currentColor" />
      <circle cx="10" cy="13" r="1.5" fill="currentColor" />
      <circle cx="16" cy="13" r="1.5" fill="currentColor" />
      <path
        d="M10 4.5v4M10 8.5H4M10 8.5h6M4 11.5V8.5M16 11.5V8.5"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
function RecordIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
      <rect x="3" y="2" width="14" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 7h8M6 10h8M6 13h5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
function ChevronIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="w-3.5 h-3.5 shrink-0 transition-transform duration-300"
      style={{ transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)' }}
    >
      <path d="M7 5l6 5-6 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Navigation Items ─────────────────────────────────────────────────────────
const NAV = [
  { icon: <UserIcon />, label: '사용자계정' },
  { icon: <CloudIcon />, label: '클라우드계정' },
  { icon: <DeviceIcon />, label: '장치연결' },
  { icon: <AppIcon />, label: '애플리케이션' },
  { icon: <ServiceIcon />, label: '서비스' },
  { icon: <CodeIcon />, label: '시설코드' },
  { icon: <TreeIcon />, label: '시설트리' },
  { icon: <RecordIcon />, label: '시설레코드' },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState(0);

  return (
    <aside
      className="flex flex-col py-5 gap-1 shrink-0 border-r overflow-hidden transition-all duration-300"
      style={{
        width: collapsed ? 64 : 200,
        background: '#080f0b',
        borderColor: '#1a3020',
      }}
    >
      {/* Logo + toggle */}
      <div className={`flex mb-5 gap-2 ${collapsed ? 'flex-col items-center px-2' : 'items-center px-3'}`}>
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0"
          style={{ background: '#22c55e', color: '#000', fontFamily: 'Syne, sans-serif', letterSpacing: '0.05em' }}
        >
          SF
        </div>
        {!collapsed && (
          <span className="text-xs font-semibold truncate" style={{ color: '#22c55e', fontFamily: 'Syne, sans-serif' }}>
            SmartFarm
          </span>
        )}
        <button
          onClick={() => setCollapsed((v) => !v)}
          className={`flex items-center justify-center w-6 h-6 rounded transition-colors duration-150 ${!collapsed ? 'ml-auto' : ''}`}
          style={{ color: '#3d5a48' }}
          title={collapsed ? '사이드바 펼치기' : '사이드바 접기'}
        >
          <ChevronIcon collapsed={collapsed} />
        </button>
      </div>

      {/* Nav items */}
      <div className="flex flex-col gap-1 flex-1 w-full px-2">
        {NAV.map((item, i) => (
          <button
            key={item.label}
            title={collapsed ? item.label : undefined}
            onClick={() => setActive(i)}
            className="relative w-full h-10 rounded-lg flex items-center gap-2.5 px-2.5 transition-all duration-150"
            style={
              active === i
                ? { background: 'rgba(34,197,94,0.12)', color: '#22c55e', boxShadow: '0 0 10px rgba(34,197,94,0.15)' }
                : { color: '#3d5a48' }
            }
          >
            {active === i && (
              <span
                className="absolute right-1.5 top-1.5 w-1 h-1 rounded-full pulse-dot"
                style={{ background: '#22c55e' }}
              />
            )}
            {item.icon}
            {!collapsed && (
              <span className="text-xs truncate" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                {item.label}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Status dot */}
      <div className="flex items-center gap-2 px-3 mt-2">
        <span className="w-2 h-2 rounded-full pulse-dot shrink-0" style={{ background: '#22c55e' }} />
        {!collapsed && (
          <span className="text-[9px] font-mono" style={{ color: '#2d4a35' }}>
            정상
          </span>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
