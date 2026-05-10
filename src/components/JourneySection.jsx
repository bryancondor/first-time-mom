import { motion } from 'framer-motion'
import PhotoGallery from './PhotoGallery'
import { resolvePhoto } from '../utils/resolvePhoto'

export default function JourneySection({ section }) {
  const { timeTag, title, phrase, photos, accentColor } = section
  const srcs = photos.map(resolvePhoto)

  // Split emoji from title text for separate rendering
  const emojiMatch = title.match(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)\s*/u)
  const emoji = emojiMatch ? emojiMatch[0].trim() : ''
  const titleText = emojiMatch ? title.slice(emojiMatch[0].length) : title

  return (
    <motion.section
      className="relative flex flex-col items-center justify-center min-h-screen px-8 py-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      <div className="w-full max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <p
            className="text-xs font-body tracking-[0.25em] uppercase mb-4 font-semibold"
            style={{ color: accentColor }}
          >
            {timeTag}
          </p>
          {emoji && (
            <span className="text-3xl block mb-2">{emoji}</span>
          )}
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-700 leading-tight">
            {titleText}
          </h2>
        </div>

        {/* Photo */}
        <div className="mb-10">
          <PhotoGallery srcs={srcs} alt={titleText} />
        </div>

        {/* Phrase */}
        <div className="max-w-2xl mx-auto text-center">
          <div
            className="inline-block border-l-4 pl-6 text-left"
            style={{ borderColor: accentColor }}
          >
            <p className="font-display text-xl lg:text-2xl text-gray-500 italic leading-relaxed">
              "{phrase}"
            </p>
          </div>
        </div>

      </div>
    </motion.section>
  )
}
