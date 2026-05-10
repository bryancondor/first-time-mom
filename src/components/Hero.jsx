import { motion } from 'framer-motion'

const letterVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const titleVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.4 } },
}

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 16 },
  animate:    { opacity: 1, y: 0 },
  transition: { delay, duration: 0.8, ease: 'easeOut' },
})

export default function Hero() {
  const title = 'Para Lilian'

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-5">
      <div className="max-w-3xl">
        <motion.p
          className="text-pink text-sm font-body tracking-[0.3em] uppercase mb-6"
          {...fadeUp(0.2)}
        >
          🌸 &nbsp; Un regalo para ti &nbsp; 🌸
        </motion.p>

        {/* Letter-by-letter title */}
        <motion.h1
          className="font-display text-5xl lg:text-9xl font-bold text-gray-800 mb-5 leading-none tracking-tight"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          aria-label={title}
        >
          {title.split('').map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div className="w-16 h-px bg-pink mx-auto mb-5" {...fadeUp(1.2)} />

        <motion.p
          className="font-display text-xl lg:text-3xl text-gray-600 italic mb-3"
          {...fadeUp(1.4)}
        >
          El año que todo cambió
        </motion.p>

        <motion.p
          className="font-body text-gray-400 text-sm tracking-widest uppercase"
          {...fadeUp(1.6)}
        >
          Por amor a Adrián
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
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
