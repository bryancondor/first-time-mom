import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <p className="text-pink text-sm font-body tracking-[0.25em] uppercase mb-4">
          Un regalo para ti
        </p>
        <h1 className="font-display text-6xl md:text-8xl font-bold text-gray-700 mb-6 leading-tight">
          Para Lilian
        </h1>
        <p className="font-display text-xl md:text-2xl text-gray-500 italic mb-2">
          El año que todo cambió
        </p>
        <p className="font-body text-gray-400 text-sm tracking-wide">
          Por amor a Adrián
        </p>
      </motion.div>

      <motion.div
        className="absolute bottom-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <img
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23fda4af' stroke-width='2'%3E%3Cpath d='M7 10l5 5 5-5'/%3E%3C/svg%3E"
          alt="scroll down"
          role="img"
          className="w-8 h-8 animate-bounce"
          aria-label="scroll"
        />
      </motion.div>
    </section>
  )
}
