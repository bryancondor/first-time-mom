import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AUTO_INTERVAL = 6000

// SVG icons — consistent across all browsers/OS
function IconPause()     { return <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="1.5" y="1" width="3.5" height="10" rx="1"/><rect x="7" y="1" width="3.5" height="10" rx="1"/></svg> }
function IconPlay()      { return <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M2 1.5l9 4.5-9 4.5V1.5z"/></svg> }
function IconExpand()    { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg> }
function IconClose()     { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg> }

export default function PhotoGallery({ srcs, alt, objectPosition = 'center', accentColor = '#fda4af', photoHeight }) {
  const [index, setIndex]         = useState(0)
  const [paused, setPaused]       = useState(false)
  const [progress, setProgress]   = useState(0)
  const [loaded, setLoaded]       = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const hasMultiple = srcs.length > 1

  const next = useCallback(() => {
    setIndex(i => (i + 1) % srcs.length)
    setProgress(0)
    setLoaded(false)
  }, [srcs.length])

  function prev() {
    setIndex(i => (i - 1 + srcs.length) % srcs.length)
    setProgress(0)
    setLoaded(false)
  }

  // Auto-advance
  useEffect(() => {
    if (!hasMultiple || paused || fullscreen) return
    const timer = setInterval(next, AUTO_INTERVAL)
    return () => clearInterval(timer)
  }, [hasMultiple, paused, fullscreen, next])

  // Progress bar
  useEffect(() => {
    if (!hasMultiple || paused || fullscreen) return
    setProgress(0)
    const start = Date.now()
    const tick = setInterval(() => {
      setProgress(Math.min(((Date.now() - start) / AUTO_INTERVAL) * 100, 100))
    }, 50)
    return () => clearInterval(tick)
  }, [index, paused, fullscreen, hasMultiple])

  // Close fullscreen on Escape
  useEffect(() => {
    if (!fullscreen) return
    const onKey = (e) => { if (e.key === 'Escape') setFullscreen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [fullscreen])

  const imgClass = `gallery-img w-full object-cover ${photoHeight ?? 'h-[260px] sm:h-[340px] lg:h-[440px]'}`
  const skeletonClass = `gallery-skeleton absolute inset-0 ${photoHeight ?? 'h-[260px] sm:h-[340px] lg:h-[440px]'}`

  return (
    <>
      {/* Fullscreen modal — works on all devices including iOS */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setFullscreen(false)}
          >
            <img
              src={srcs[index]}
              alt={`${alt} ${index + 1}`}
              className="max-w-full max-h-full object-contain"
              onClick={e => e.stopPropagation()}
            />

            {/* Close */}
            <button
              aria-label="cerrar"
              onClick={() => setFullscreen(false)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <IconClose />
            </button>

            {/* Nav in fullscreen */}
            {hasMultiple && (
              <>
                <button
                  aria-label="prev"
                  onClick={e => { e.stopPropagation(); prev() }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-11 h-11 flex items-center justify-center text-2xl backdrop-blur-sm transition-colors"
                >
                  ‹
                </button>
                <button
                  aria-label="next"
                  onClick={e => { e.stopPropagation(); next() }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-11 h-11 flex items-center justify-center text-2xl backdrop-blur-sm transition-colors"
                >
                  ›
                </button>
                {/* Dot counter */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {srcs.map((_, i) => (
                    <button
                      key={i}
                      onClick={e => { e.stopPropagation(); setIndex(i) }}
                      aria-label={`photo ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/40'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery card */}
      <div className="gallery-fullscreen relative w-full max-w-3xl mx-auto group">

        <div className="rounded-3xl overflow-hidden shadow-2xl relative">

          {/* Skeleton */}
          {!loaded && (
            <div
              className={skeletonClass}
              style={{
                background: 'linear-gradient(90deg, #f5ece6 25%, #fdf0ea 50%, #f5ece6 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.6s infinite',
              }}
            />
          )}

          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={srcs[index]}
              alt={`${alt} ${index + 1}`}
              className={imgClass}
              style={{ objectPosition, opacity: loaded ? 1 : 0 }}
              onLoad={() => setLoaded(true)}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : 30 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>

          {/* Top-right controls: pause + fullscreen */}
          <div className="absolute top-3 right-3 flex gap-1.5 opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
            {hasMultiple && (
              <button
                aria-label={paused ? 'reanudar' : 'pausar'}
                onClick={() => setPaused(p => !p)}
                className="bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-sm transition-colors"
              >
                {paused ? <IconPlay /> : <IconPause />}
              </button>
            )}
            <button
              aria-label="pantalla completa"
              onClick={() => setFullscreen(true)}
              className="bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <IconExpand />
            </button>
          </div>

          {/* Prev / Next */}
          {hasMultiple && (
            <>
              <button
                aria-label="prev"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/75 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center text-gray-600 shadow text-lg opacity-60 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200"
              >
                ‹
              </button>
              <button
                aria-label="next"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/75 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center text-gray-600 shadow text-lg opacity-60 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Progress bar + dots */}
        {hasMultiple && (
          <div className="gallery-controls mt-3 px-1">
            <div className="h-[2px] w-full bg-gray-200 rounded-full overflow-hidden mb-2">
              <div
                className="h-full rounded-full transition-none"
                style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${accentColor}, #c4b5fd)` }}
              />
            </div>
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
    </>
  )
}
