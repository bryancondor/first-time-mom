import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import videoSrc from '../assets/video/s6-carcajada.mp4'
import { resolvePhoto } from '../utils/resolvePhoto'

const HEARTS = ['💕', '🌸', '⭐', '💕', '🌸', '⭐', '💕', '🌸']
const closingPhoto = resolvePhoto('s6-big-smile.jpg')

export default function VideoClosing() {
  const videoRef = useRef()

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <motion.section
      className="relative flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1 }}
    >
      {/* Falling hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {HEARTS.map((h, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl"
            style={{ left: `${(i / HEARTS.length) * 100}%`, top: '-10%' }}
            animate={{ y: ['0vh', '110vh'] }}
            transition={{ duration: 4 + i * 0.4, repeat: Infinity, delay: i * 0.5, ease: 'linear' }}
          >
            {h}
          </motion.span>
        ))}
      </div>

      <div className="relative max-w-2xl w-full mx-auto">

        {/* Video block */}
        <p className="text-pink text-xs font-body tracking-[0.2em] uppercase mb-4">
          Hoy · 5 meses
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-700 mb-8">
          🎬 La primera carcajada
        </h2>
        <div className="flex justify-center mb-20">
          <div className="rounded-3xl overflow-hidden shadow-2xl w-full max-w-sm">
            <video
              ref={videoRef}
              data-testid="closing-video"
              src={videoSrc}
              muted
              loop
              playsInline
              controls
              className="w-full h-auto"
              style={{ aspectRatio: '9/16' }}
            />
          </div>
        </div>

        {/* Closing photo — baby laughing alone */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-10"
        >
          <div className="w-48 h-48 lg:w-64 lg:h-64 mx-auto rounded-full overflow-hidden shadow-2xl border-4 border-white">
            <img
              src={closingPhoto}
              alt="Adrián riéndose"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Final phrase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <p className="font-display text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Feliz día, mamá.
          </p>
          <p className="font-display text-xl text-gray-500 italic">
            Te amamos, Adrián. 💕
          </p>
        </motion.div>

      </div>
    </motion.section>
  )
}
