export default function GlowHorizonFM({ variant = 'top' }) {
  const isTop = variant === 'top';

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: '#050507',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 100%, rgba(150, 104, 255, 0.28), transparent 18%), radial-gradient(circle at 50% 84%, rgba(101, 84, 255, 0.2), transparent 26%), radial-gradient(circle at 20% 18%, rgba(255,255,255,0.04), transparent 22%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '-15%',
          right: '-15%',
          top: '62%',
          height: '72%',
          borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
          background: 'radial-gradient(ellipse at center, rgba(117, 116, 255, 0.58) 0%, rgba(94, 81, 196, 0.36) 22%, rgba(15, 15, 20, 0.15) 46%, rgba(5,5,7,0) 74%)',
          filter: 'blur(12px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '-8%',
          right: '-8%',
          top: '70%',
          height: '56%',
          borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
          background: 'radial-gradient(ellipse at center, rgba(129, 140, 255, 0.92) 0%, rgba(86, 80, 214, 0.34) 26%, rgba(5,5,7,0) 72%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          right: '-8%',
          top: isTop ? '44%' : '48%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(108, 121, 255, 0.18)',
          filter: 'blur(30px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '8%',
          right: '8%',
          bottom: '-6%',
          height: '34%',
          background: 'linear-gradient(to top, rgba(5,5,7,1), rgba(5,5,7,0))',
        }}
      />
    </div>
  );
}
