// ─── Icon Components ──────────────────────────────────────────────────────────
function GridIcon()     { return <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><rect x="2" y="2" width="7" height="7" rx="1.5"/><rect x="11" y="2" width="7" height="7" rx="1.5"/><rect x="2" y="11" width="7" height="7" rx="1.5"/><rect x="11" y="11" width="7" height="7" rx="1.5"/></svg> }
function LeafIcon()     { return <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10 2C6 2 2 6 2 10c0 2 1 3.5 2.5 4.5C6 15.5 8 16 10 16c4 0 8-3 8-7 0-2-1-4-3-5.5C13.5 2.5 11.8 2 10 2z"/><path d="M10 16v2" strokeWidth="2" stroke="currentColor" fill="none"/></svg> }
function DropIcon()     { return <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10 2L5 10a5 5 0 1010 0L10 2z"/></svg> }
function ChartIcon()    { return <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><rect x="2" y="12" width="3" height="6" rx="1"/><rect x="8" y="8"  width="3" height="10" rx="1"/><rect x="14" y="4" width="3" height="14" rx="1"/></svg> }
function CalIcon()      { return <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><rect x="2" y="4" width="16" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M6 2v4M14 2v4M2 9h16" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg> }
function SettingsIcon() { return <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><circle cx="10" cy="10" r="3"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg> }

// ─── Navigation Items ─────────────────────────────────────────────────────────
const NAV = [
  { icon: <GridIcon />,    label: '대시보드', active: true  },
  { icon: <LeafIcon />,    label: '구역 관리',active: false },
  { icon: <DropIcon />,    label: '관수 제어',active: false },
  { icon: <ChartIcon />,   label: '환경 분석',active: false },
  { icon: <CalIcon />,     label: '작업 일정',active: false },
  { icon: <SettingsIcon />,label: '설정',     active: false },
]

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const Sidebar = () => (
  <aside className="flex flex-col items-center py-5 gap-1 shrink-0 border-r"
    style={{ width: 64, background: '#080f0b', borderColor: '#1a3020' }}>
    <div className="mb-5 w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs"
      style={{ background: '#22c55e', color: '#000', fontFamily: 'Syne, sans-serif', letterSpacing: '0.05em' }}>
      SF
    </div>
    <div className="flex flex-col items-center gap-1 flex-1 w-full px-2">
      {NAV.map((item) => (
        <button key={item.label} title={item.label}
          className="relative w-full h-10 rounded-lg flex items-center justify-center transition-all duration-150"
          style={item.active
            ? { background: 'rgba(34,197,94,0.12)', color: '#22c55e', boxShadow: '0 0 10px rgba(34,197,94,0.15)' }
            : { color: '#3d5a48' }
          }>
          {item.active && (
            <span className="absolute right-1.5 top-1.5 w-1 h-1 rounded-full pulse-dot"
              style={{ background: '#22c55e' }} />
          )}
          {item.icon}
        </button>
      ))}
    </div>
    <div className="flex flex-col items-center gap-1 mt-2">
      <span className="w-2 h-2 rounded-full pulse-dot" style={{ background: '#22c55e' }} />
      <span className="text-[9px] font-mono" style={{ color: '#2d4a35' }}>정상</span>
    </div>
  </aside>
)

export default Sidebar
