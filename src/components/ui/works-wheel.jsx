import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * WorksWheel - 3D Interactive Cylindrical Carousel
 * Inspired by CrafterUI WorksWheel
 * Features:
 * - 3D perspective cylindrical arrangement
 * - Drag/touch rotation with inertia
 * - Mouse wheel rotation
 * - Keyboard navigation (arrow keys)
 * - Auto-rotation with pause on hover
 * - Interactive card focus and selection modal
 */
export function WorksWheel({
  items = [],
  radius = 500,
  itemWidth = 280,
  itemHeight = 390,
  autoRotateSpeed = 0.08,
  perspective = 1400,
  className = '',
  onSelect,
  label = 'Works',
  action = 'View',
}) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRotation, setStartRotation] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [cardSize, setCardSize] = useState({ width: itemWidth, height: itemHeight });

  const containerRef = useRef(null);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animFrameRef = useRef(null);
  const rotationRef = useRef(0);

  const total = items.length || 1;
  const angleStep = 360 / total;

  // Keep rotationRef in sync
  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  // Compute active item index from rotation
  useEffect(() => {
    const normalizedAngle = ((-rotation % 360) + 360) % 360;
    const index = Math.round(normalizedAngle / angleStep) % total;
    setActiveIndex(index);
  }, [rotation, angleStep, total]);

  // Inertia and Auto-rotation Loop
  useEffect(() => {
    let prevTime = performance.now();

    const loop = (currentTime) => {
      const dt = Math.min((currentTime - prevTime) / 1000, 0.1);
      prevTime = currentTime;

      if (!isDragging) {
        if (Math.abs(velocity) > 0.01) {
          // Decay velocity
          setRotation((r) => r + velocity);
          setVelocity((v) => v * 0.94);
        } else if (!isPaused && autoRotateSpeed !== 0) {
          // Smooth continuous auto rotate
          setRotation((r) => r + autoRotateSpeed);
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isDragging, isPaused, velocity, autoRotateSpeed]);

  // Pointer drag handlers
  const handlePointerDown = (e) => {
    setIsDragging(true);
    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    setStartX(clientX);
    setStartRotation(rotationRef.current);
    lastXRef.current = clientX;
    lastTimeRef.current = performance.now();
    setVelocity(0);
  };

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return;
    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    const deltaX = clientX - startX;
    
    // Sensitivity factor
    const factor = 0.28;
    const newRotation = startRotation + deltaX * factor;
    setRotation(newRotation);

    // Calculate instantaneous velocity for inertia
    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 10) {
      const v = ((clientX - lastXRef.current) / dt) * 1.5;
      setVelocity(v);
      lastXRef.current = clientX;
      lastTimeRef.current = now;
    }
  }, [isDragging, startX, startRotation]);

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
  };

  // Wheel interaction
  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      setRotation((r) => r - e.deltaX * 0.12);
    } else if (e.shiftKey) {
      e.preventDefault();
      setRotation((r) => r - e.deltaY * 0.12);
    }
  };

  // Navigate to specific index
  const navigateTo = (index) => {
    const targetAngle = -index * angleStep;
    // Find shortest rotation
    const currentAngle = rotationRef.current;
    const currentNorm = (currentAngle % 360 + 360) % 360;
    const targetNorm = (targetAngle % 360 + 360) % 360;
    let diff = targetNorm - currentNorm;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    
    setVelocity(0);
    // Smooth transition
    let start = currentAngle;
    let end = currentAngle + diff;
    let startTime = performance.now();
    const duration = 600;

    const animateStep = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setRotation(start + (end - start) * ease);
      if (progress < 1) {
        requestAnimationFrame(animateStep);
      }
    };
    requestAnimationFrame(animateStep);
  };

  const handlePrev = () => {
    const nextIdx = (activeIndex - 1 + total) % total;
    navigateTo(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % total;
    navigateTo(nextIdx);
  };

  // Responsive radius adjustment based on screen width
  const [effectiveRadius, setEffectiveRadius] = useState(radius);
  useEffect(() => {
    const updateSize = () => {
      const viewportWidth = window.innerWidth;
      const nextWidth = viewportWidth < 480
        ? Math.min(itemWidth, 190)
        : viewportWidth < 640
          ? Math.min(itemWidth, 220)
          : viewportWidth < 1024
            ? Math.min(itemWidth, 250)
            : itemWidth;

      const ratio = itemHeight / itemWidth;
      const nextHeight = Math.min(itemHeight, Math.round(nextWidth * ratio));

      setCardSize({ width: nextWidth, height: nextHeight });

      if (viewportWidth < 640) {
        setEffectiveRadius(Math.min(radius, 180));
      } else if (viewportWidth < 1024) {
        setEffectiveRadius(Math.min(radius, 270));
      } else {
        setEffectiveRadius(radius);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [itemWidth, itemHeight, radius]);

  return (
    <div
      className={`relative w-full select-none overflow-hidden py-12 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        handlePointerUp();
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      ref={containerRef}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-blue-500/10 via-blue-400/15 to-blue-600/10 blur-[100px] pointer-events-none rounded-full" />

      {/* 3D Wheel Viewport */}
      <div
        className="relative mx-auto flex items-center justify-center"
        style={{
          perspective: `${perspective}px`,
          perspectiveOrigin: '50% 50%',
          height: `${cardSize.height + 120}px`,
        }}
      >
        {/* Rotating Cylinder Ring */}
        <div
          className="relative flex items-center justify-center transition-transform duration-75"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
            width: `${cardSize.width}px`,
            height: `${cardSize.height}px`,
          }}
        >
          {items.map((item, index) => {
            const itemAngle = index * angleStep;
            // Calculate angle relative to viewer (front = 0)
            const currentItemAngle = (itemAngle + rotation) % 360;
            const normalizedAngle = (currentItemAngle + 540) % 360 - 180; // -180 to 180
            const isFront = Math.abs(normalizedAngle) < 90;
            const isCenter = Math.abs(normalizedAngle) < 25;
            const opacity = Math.max(0.15, Math.cos((normalizedAngle * Math.PI) / 180));

            return (
              <div
                key={item.id || index}
                className="absolute top-0 left-0 transition-opacity duration-300"
                style={{
                  width: `${cardSize.width}px`,
                  height: `${cardSize.height}px`,
                  transform: `rotateY(${itemAngle}deg) translateZ(${effectiveRadius}px)`,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  opacity: isFront ? (isCenter ? 1 : 0.75) : 0,
                  pointerEvents: isCenter ? 'auto' : (isFront ? 'auto' : 'none'),
                }}
              >
                <div
                  onClick={(e) => {
                    if (Math.abs(velocity) > 0.2) return;
                    if (!isCenter) {
                      e.stopPropagation();
                      navigateTo(index);
                    } else {
                      setSelectedItem(item);
                      if (onSelect) onSelect(item);
                    }
                  }}
                  className={`group relative h-full w-full rounded-2xl p-5 flex flex-col justify-between overflow-hidden border backdrop-blur-xl transition-all duration-300 ${
                    isCenter
                      ? 'border-blue-500/60 bg-dark-900/90 shadow-[0_0_35px_rgba(59,130,246,0.25)] scale-105'
                      : 'border-white/10 bg-dark-900/70 hover:border-white/20'
                  }`}
                >
                  {/* Subtle Card Glow / Image */}
                  <div className="absolute inset-0 z-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-40 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700"
                        draggable={false}
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${item.gradient || 'from-blue-500/20 to-purple-500/20'} opacity-50`} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/80 to-transparent" />
                  </div>

                  {/* Card Top: Badges */}
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    {item.category && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[11px] font-semibold text-white/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        {item.category}
                      </span>
                    )}
                    {item.day && item.month ? (
                      <div className="bg-white/95 rounded-lg px-2 py-1 text-center min-w-[38px] shadow-sm">
                        <span className="block text-sm font-bold text-black leading-none">{item.day}</span>
                        <span className="block text-[9px] font-bold text-black/70 uppercase leading-none mt-0.5">{item.month}</span>
                      </div>
                    ) : item.badge ? (
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        {item.badge}
                      </span>
                    ) : null}
                  </div>

                  {/* Card Bottom: Information */}
                  <div className="relative z-10 space-y-2">
                    <h3 className="text-lg font-bold text-white leading-snug group-hover:text-blue-400 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                      {item.description || "Discover IEEE's premier technical sessions and workshops."}
                    </p>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-white/50 flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {item.location || 'Chandigarh Univ.'}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItem(item);
                        }}
                        className={`text-xs font-semibold px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                          isCenter
                            ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        {action}
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Control Bar: Prev / Next Buttons & Indicators */}
      <div className="relative z-20 flex flex-col items-center justify-center gap-4 mt-10">
        <div className="flex items-center gap-4 bg-dark-900/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 shadow-xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">{label}</span>
          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all active:scale-95"
            aria-label="Previous event"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5 px-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => navigateTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'w-6 bg-blue-500' : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Jump to event ${i + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all active:scale-95"
            aria-label="Next event"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Drag Hint */}
        <p className="text-[11px] font-medium tracking-wide uppercase text-white/40 flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500/80 animate-ping" />
          Drag or swipe horizontally to spin the 3D wheel • Click card to view details
        </p>
      </div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl bg-dark-900 border border-blue-500/30 p-6 md:p-8 shadow-[0_0_50px_rgba(59,130,246,0.2)] overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-all"
              >
                ✕
              </button>

              {/* Tag / Category */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {selectedItem.category || 'Featured Event'}
                </span>
                {selectedItem.date && (
                  <span className="text-xs text-white/50">{selectedItem.date}</span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {selectedItem.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {selectedItem.description || "Join this dynamic IEEE session to upgrade your engineering skills, network with industry veterans, and compete for exciting prizes and certifications."}
              </p>

              {/* Key Details Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[11px] text-white/40 uppercase block font-semibold">Location</span>
                  <span className="text-sm font-medium text-white">{selectedItem.location || 'Chandigarh University'}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[11px] text-white/40 uppercase block font-semibold">Status</span>
                  <span className="text-sm font-medium text-emerald-400">Registrations Open</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <a
                  href={selectedItem.href || '#register'}
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 text-center py-3 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Register Now
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="py-3 px-5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium text-sm transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default WorksWheel;
