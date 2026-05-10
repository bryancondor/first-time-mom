import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PhotoGallery({ srcs, alt }) {
  const [index, setIndex] = useState(0)
  const hasMultiple = srcs.length > 1

  function next() { setIndex(i => (i + 1) % srcs.length) }
  function prev() { setIndex(i => (i - 1 + srcs.length) % srcs.length) }

  return (
    <div className="relative w-full max-w-lg mx-auto rounded-2xl overflow-hidden shadow-lg">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={srcs[index]}
          alt={`${alt} ${index + 1}`}
          className="w-full h-72 md:h-96 object-cover"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35 }}
        />
      </AnimatePresence>

      {hasMultiple && (
        <>
          <button
            aria-label="prev"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center text-gray-600 shadow"
          >
            ‹
          </button>
          <button
            aria-label="next"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center text-gray-600 shadow"
          >
            ›
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {srcs.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`photo ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
