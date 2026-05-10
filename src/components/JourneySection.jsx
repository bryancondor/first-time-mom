import { motion } from 'framer-motion'
import PhotoGallery from './PhotoGallery'
import { resolvePhoto } from '../utils/resolvePhoto'

export default function JourneySection({ section }) {
  const { timeTag, title, phrase, photos, accentColor } = section
  const srcs = photos.map(resolvePhoto)

  return (
    <motion.section
      className="relative flex flex-col items-center justify-center min-h-screen px-6 py-24"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      <div className="w-full max-w-2xl mx-auto text-center">
        <p
          className="text-xs font-body tracking-[0.2em] uppercase mb-3 font-semibold"
          style={{ color: accentColor }}
        >
          {timeTag}
        </p>

        <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-700 mb-8 leading-snug">
          {title}
        </h2>

        <div className="mb-10">
          <PhotoGallery srcs={srcs} alt={title} />
        </div>

        <div
          className="border-l-4 pl-5 text-left max-w-md mx-auto"
          style={{ borderColor: accentColor }}
        >
          <p className="font-display text-lg md:text-xl text-gray-600 italic leading-relaxed">
            "{phrase}"
          </p>
        </div>
      </div>
    </motion.section>
  )
}
