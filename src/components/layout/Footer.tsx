// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="flex items-center justify-between px-5 shrink-0 text-[10px] font-mono"
    style={{ height: 28, background: '#060d09', borderTop: '1px solid #111c14', color: '#2d4a35' }}>
    <span>Smart Farm v1.0.0</span>
    <span className="flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e' }} />
      <span style={{ color: '#374151' }}>온실 1동 · 정상 운영 중</span>
    </span>
    <span style={{ color: '#1a3020' }}>© 2025 SmartFarm Systems</span>
  </footer>
)

export default Footer
