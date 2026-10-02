export function AnimatedTitleFM({ open = true }) {
  return (
    <div
      style={{
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0)' : 'translateY(12px)',
        transition: 'all 0.8s ease',
        textAlign: 'center',
        color: '#f5f5f5',
        letterSpacing: '-0.05em',
        fontSize: 'clamp(3rem, 7vw, 9rem)',
        fontWeight: 500,
        lineHeight: 0.9,
        fontFamily: 'Georgia, serif',
        fontStyle: 'italic',
        textShadow: '0 0 18px rgba(255,255,255,0.12)',
      }}
    >
      Discover
      <br />
      What&apos;s Next.
    </div>
  );
}
