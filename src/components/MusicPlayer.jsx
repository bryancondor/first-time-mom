import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import musicSrc from '../assets/music/perfect-ed-sheeran.mp3'

export default function MusicPlayer() {
  const audioRef = useRef()
  const [playing, setPlaying] = useState(false)

  function toggle() {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  return (
    <>
      <audio ref={audioRef} src={musicSrc} loop />
      <motion.button
        onClick={toggle}
        aria-label={playing ? 'pausar música' : 'reproducir música'}
        className="fixed bottom-6 right-6 z-50 bg-white/80 backdrop-blur-sm border border-pink/30 text-gray-600 rounded-full px-4 py-2 text-sm font-body shadow-lg flex items-center gap-2 hover:bg-white transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        <span>{playing ? '⏸' : '♪'}</span>
        <span>{playing ? 'Pausar' : 'Reproducir música'}</span>
      </motion.button>
    </>
  )
}
