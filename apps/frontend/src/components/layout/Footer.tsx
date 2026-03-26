function Footer() {
  return (
    <footer
      className="flex items-center justify-between px-5 shrink-0 text-[10px] font-mono"
      style={{
        height: 28,
        background: 'var(--sf-bg-page)',
        borderTop: '1px solid var(--sf-border-dim)',
        color: 'var(--sf-text-5)',
      }}
    >
      <span>Smart Farm v1.0.0</span>
      <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--sf-accent)' }} />
        <span style={{ color: 'var(--sf-text-4)' }}>온실 1동 · 정상 운영 중</span>
      </span>
      <span style={{ color: 'var(--sf-border)' }}>© 2025 SmartFarm Systems</span>
    </footer>
  );
}

export default Footer;
