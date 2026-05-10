import { motion } from 'framer-motion'
import PhotoGallery from './PhotoGallery'
import { resolvePhoto } from '../utils/resolvePhoto'

const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function JourneySection({ section, sectionIndex, totalSections }) {
  const { timeTag, title, phrase, photos, accentColor, objectPosition, photoHeight } = section
  const srcs = photos.map(resolvePhoto)

  const emojiMatch = title.match(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)\s*/u)
  const emoji     = emojiMatch ? emojiMatch[0].trim() : ''
  const titleText = emojiMatch ? title.slice(emojiMatch[0].length) : title

  const counter = sectionIndex != null
    ? String(sectionIndex + 1).padStart(2, '0') + ' · ' + String(totalSections).padStart(2, '0')
    : null

  return (
    <motion.section
      className="relative flex flex-col items-center justify-center min-h-screen px-5 py-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className="w-full max-w-4xl mx-auto">

        {/* Section counter — top right, editorial style */}
        {counter && (
          <motion.p
            variants={itemVariants}
            className="text-right text-xs font-body tracking-[0.2em] text-gray-300 mb-3 select-none"
          >
            {counter}
          </motion.p>
        )}

        {/* Time tag */}
        <motion.p
          variants={itemVariants}
          className="text-center text-xs font-body tracking-[0.25em] uppercase font-semibold mb-4"
          style={{ color: accentColor }}
        >
          {timeTag}
        </motion.p>

        {/* Emoji */}
        {emoji && (
          <motion.span variants={itemVariants} className="text-3xl block text-center mb-2">
            {emoji}
          </motion.span>
        )}

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="font-display text-2xl lg:text-4xl font-bold text-gray-800 leading-tight text-center mb-4"
        >
          {titleText}
        </motion.h2>

        {/* Photo gallery */}
        <motion.div variants={itemVariants} className="mb-5">
          <PhotoGallery srcs={srcs} alt={titleText} objectPosition={objectPosition} accentColor={accentColor} photoHeight={photoHeight} />
        </motion.div>

        {/* Quote with decorative background mark */}
        <motion.div variants={itemVariants} className="max-w-2xl mx-auto text-center">
          <div className="relative sm:inline-block sm:text-left sm:border-l-4 sm:pl-6 px-4 sm:px-0" style={{ borderColor: accentColor }}>
            <span
              className="hidden sm:block absolute -top-4 -left-2 font-display text-8xl leading-none select-none pointer-events-none"
              style={{ color: accentColor, opacity: 0.12 }}
              aria-hidden="true"
            >
              "
            </span>
            <p className="font-display text-base lg:text-2xl text-gray-700 italic leading-relaxed relative z-10">
              "{phrase}"
            </p>
          </div>
        </motion.div>

      </div>
    </motion.section>
  )
}
