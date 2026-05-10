import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import videoSrc from '../assets/video/s6-carcajada.mp4'

const HEARTS = ['💕', '🌸', '⭐', '💕', '🌸', '⭐', '💕', '🌸']

export default function VideoClosing() {
  const videoRef = useRef()

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <motion.section
      className="relative flex flex-col items-center justify-center min-h-screen px-6 py-24 text-center overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1 }}
    >
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
        <p className="text-pink text-xs font-body tracking-[0.2em] uppercase mb-4">
          Hoy · 5 meses
        </p>

        <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-700 mb-8">
          🎬 La primera carcajada
        </h2>

        {/* Portrait container — respects phone video aspect ratio */}
        <div className="flex justify-center mb-10">
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

        <motion.p
          className="font-display text-2xl md:text-3xl font-bold text-gray-700 mb-3"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Feliz día, mamá.
        </motion.p>
        <p className="font-display text-lg text-gray-500 italic">
          Te amamos, Adrián. 💕
        </p>
      </div>
    </motion.section>
  )
}
