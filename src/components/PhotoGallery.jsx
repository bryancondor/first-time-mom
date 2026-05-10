import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AUTO_INTERVAL = 6000

export default function PhotoGallery({ srcs, alt, objectPosition = 'center' }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const containerRef = useRef()
  const hasMultiple = srcs.length > 1

  const next = useCallback(() => setIndex(i => (i + 1) % srcs.length), [srcs.length])
  function prev() { setIndex(i => (i - 1 + srcs.length) % srcs.length) }

  useEffect(() => {
    if (!hasMultiple || paused) return
    const timer = setInterval(next, AUTO_INTERVAL)
    return () => clearInterval(timer)
  }, [hasMultiple, paused, next])

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-2xl group">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={srcs[index]}
          alt={`${alt} ${index + 1}`}
          className="w-full h-[420px] lg:h-[560px] object-cover"
          style={{ objectPosition }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      {/* Top-right controls: pause + fullscreen */}
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {hasMultiple && (
          <button
            aria-label={paused ? 'reanudar' : 'pausar'}
            onClick={() => setPaused(p => !p)}
            className="bg-black/40 hover:bg-black/60 text-white rounded-full w-9 h-9 flex items-center justify-center text-sm backdrop-blur-sm"
          >
            {paused ? '▶' : '⏸'}
          </button>
        )}
        <button
          aria-label="pantalla completa"
          onClick={toggleFullscreen}
          className="bg-black/40 hover:bg-black/60 text-white rounded-full w-9 h-9 flex items-center justify-center backdrop-blur-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
        </button>
      </div>

      {hasMultiple && (
        <>
          <button
            aria-label="prev"
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center text-gray-600 shadow-md text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            ‹
          </button>
          <button
            aria-label="next"
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center text-gray-600 shadow-md text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            ›
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {srcs.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`photo ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'bg-white w-5' : 'bg-white/50 w-2'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
