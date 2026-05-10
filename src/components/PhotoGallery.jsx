import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AUTO_INTERVAL = 4000

export default function PhotoGallery({ srcs, alt }) {
  const [index, setIndex] = useState(0)
  const hasMultiple = srcs.length > 1

  const next = useCallback(() => setIndex(i => (i + 1) % srcs.length), [srcs.length])
  function prev() { setIndex(i => (i - 1 + srcs.length) % srcs.length) }

  // Auto-advance every 4 seconds, resets if user clicks manually
  useEffect(() => {
    if (!hasMultiple) return
    const timer = setInterval(next, AUTO_INTERVAL)
    return () => clearInterval(timer)
  }, [hasMultiple, next])

  return (
    <div className="relative w-full max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={srcs[index]}
          alt={`${alt} ${index + 1}`}
          className="w-full h-[420px] lg:h-[560px] object-cover"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4 }}
        />
      </AnimatePresence>

      {hasMultiple && (
        <>
          <button
            aria-label="prev"
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center text-gray-600 shadow-md text-xl"
          >
            ‹
          </button>
          <button
            aria-label="next"
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center text-gray-600 shadow-md text-xl"
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
