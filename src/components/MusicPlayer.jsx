import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import musicSrc from '../assets/music/perfect-ed-sheeran.mp3'

const BAR_DELAYS = [0, 0.2, 0.4]

export default function MusicPlayer() {
  const audioRef = useRef()
  const [playing, setPlaying] = useState(false)
  const startedRef = useRef(false)

  function startMusic() {
    if (startedRef.current || !audioRef.current) return
    audioRef.current.play()
      .then(() => { setPlaying(true); startedRef.current = true })
      .catch(() => {})
  }

  useEffect(() => {
    // Try immediate autoplay (works on some browsers)
    const timer = setTimeout(startMusic, 800)

    // Fallback: start on first user interaction
    const onInteract = () => { startMusic(); cleanup() }
    const cleanup = () => {
      window.removeEventListener('scroll', onInteract)
      window.removeEventListener('click',  onInteract)
      window.removeEventListener('keydown', onInteract)
    }
    window.addEventListener('scroll',  onInteract, { once: true })
    window.addEventListener('click',   onInteract, { once: true })
    window.addEventListener('keydown', onInteract, { once: true })

    return () => { clearTimeout(timer); cleanup() }
  }, [])

  function toggle() {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
      startedRef.current = false
    } else {
      audioRef.current.play().then(() => { setPlaying(true); startedRef.current = true }).catch(() => {})
    }
  }

  return (
    <>
      <audio ref={audioRef} src={musicSrc} loop />
      <motion.button
        onClick={toggle}
        aria-label={playing ? 'pausar música' : 'reproducir música'}
        className="fixed bottom-6 right-6 z-50 bg-white/90 backdrop-blur-sm border border-pink/20 text-gray-600 rounded-full px-4 py-2.5 text-sm font-body shadow-lg flex items-center gap-2.5 hover:bg-white hover:shadow-xl transition-all"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {playing ? (
          <span className="flex gap-[3px] items-end h-3.5">
            {BAR_DELAYS.map((delay, i) => (
              <span
                key={i}
                className="w-[3px] rounded-full bg-pink"
                style={{
                  height: '14px',
                  transformOrigin: 'bottom',
                  animation: 'wave-bar 0.7s ease-in-out infinite',
                  animationDelay: `${delay}s`,
                }}
              />
            ))}
          </span>
        ) : (
          <span className="text-pink text-base leading-none">♪</span>
        )}
        <span>{playing ? 'Pausar' : 'Reproducir música'}</span>
      </motion.button>
    </>
  )
}
