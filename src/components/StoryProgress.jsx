import { useScroll, motion } from 'framer-motion'

export default function StoryProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent">
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX: scrollYProgress,
          background: 'linear-gradient(90deg, #fda4af 0%, #c4b5fd 50%, #93c5fd 100%)',
        }}
      />
    </div>
  )
}
