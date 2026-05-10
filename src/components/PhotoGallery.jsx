import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AUTO_INTERVAL = 6000

export default function PhotoGallery({ srcs, alt, objectPosition = 'center', accentColor = '#fda4af', photoHeight }) {
  const [index, setIndex]     = useState(0)
  const [paused, setPaused]   = useState(false)
  const [progress, setProgress] = useState(0)
  const containerRef = useRef()
  const hasMultiple  = srcs.length > 1

  const next = useCallback(() => {
    setIndex(i => (i + 1) % srcs.length)
    setProgress(0)
  }, [srcs.length])

  function prev() {
    setIndex(i => (i - 1 + srcs.length) % srcs.length)
    setProgress(0)
  }

  // Auto-advance timer
  useEffect(() => {
    if (!hasMultiple || paused) return
    const timer = setInterval(next, AUTO_INTERVAL)
    return () => clearInterval(timer)
  }, [hasMultiple, paused, next])

  // Progress bar fill
  useEffect(() => {
    if (!hasMultiple || paused) return
    setProgress(0)
    const start = Date.now()
    const tick = setInterval(() => {
      const pct = Math.min(((Date.now() - start) / AUTO_INTERVAL) * 100, 100)
      setProgress(pct)
    }, 50)
    return () => clearInterval(tick)
  }, [index, paused, hasMultiple])

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <div ref={containerRef} className="gallery-fullscreen relative w-full max-w-3xl mx-auto group">

      {/* Photo */}
      <div className="rounded-3xl overflow-hidden shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={srcs[index]}
            alt={`${alt} ${index + 1}`}
            className={`gallery-img w-full object-cover ${photoHeight ?? 'h-[340px] lg:h-[440px]'}`}
            style={{ objectPosition }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Top-right controls */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {hasMultiple && (
            <button
              aria-label={paused ? 'reanudar' : 'pausar'}
              onClick={() => setPaused(p => !p)}
              className="bg-black/40 hover:bg-black/60 text-white rounded-full w-9 h-9 flex items-center justify-center text-sm backdrop-blur-sm transition-colors"
            >
              {paused ? '▶' : '⏸'}
            </button>
          )}
          <button
            aria-label="pantalla completa"
            onClick={toggleFullscreen}
            className="bg-black/40 hover:bg-black/60 text-white rounded-full w-9 h-9 flex items-center justify-center backdrop-blur-sm transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            </svg>
          </button>
        </div>

        {/* Prev / Next arrows */}
        {hasMultiple && (
          <>
            <button
              aria-label="prev"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full w-7 h-7 flex items-center justify-center text-gray-500 shadow text-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
            >
              ‹
            </button>
            <button
              aria-label="next"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full w-7 h-7 flex items-center justify-center text-gray-500 shadow text-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Progress bar + dots */}
      {hasMultiple && (
        <div className="gallery-controls mt-3 px-1">
          {/* Thin progress bar */}
          <div className="h-[2px] w-full bg-gray-200 rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full transition-none"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${accentColor}, #c4b5fd)`,
              }}
            />
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-2">
            {srcs.map((_, i) => (
              <button
                key={i}
                onClick={() => { setIndex(i); setProgress(0) }}
                aria-label={`photo ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-5' : 'w-1.5 bg-gray-300'}`}
                style={i === index ? { background: accentColor } : {}}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
