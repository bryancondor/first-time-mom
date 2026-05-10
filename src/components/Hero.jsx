import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="max-w-3xl"
      >
        <motion.p
          className="text-pink text-xs font-body tracking-[0.35em] uppercase mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          🌸 &nbsp; Un regalo para ti &nbsp; 🌸
        </motion.p>

        <h1 className="font-display text-7xl lg:text-9xl font-bold text-gray-700 mb-5 leading-none tracking-tight">
          Para Lilian
        </h1>

        <div className="w-16 h-px bg-pink mx-auto mb-5" />

        <p className="font-display text-2xl lg:text-3xl text-gray-400 italic mb-3">
          El año que todo cambió
        </p>
        <p className="font-body text-gray-300 text-sm tracking-widest uppercase">
          Por amor a Adrián
        </p>
      </motion.div>

      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <span className="text-xs text-gray-300 font-body tracking-widest uppercase">Scroll</span>
        <img
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23fda4af' stroke-width='1.5'%3E%3Cpath d='M7 10l5 5 5-5'/%3E%3C/svg%3E"
          alt="scroll down"
          role="img"
          className="w-6 h-6 animate-bounce"
          aria-label="scroll"
        />
      </motion.div>
    </section>
  )
}
