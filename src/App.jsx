import FloatingScene from './components/FloatingScene'
import Hero from './components/Hero'
import JourneySection from './components/JourneySection'
import VideoClosing from './components/VideoClosing'
import MusicPlayer from './components/MusicPlayer'
import StoryProgress from './components/StoryProgress'
import { sections } from './data/journey'

function Divider({ color }) {
  return (
    <div className="flex justify-center py-10 px-8" aria-hidden="true">
      <div
        className="w-full max-w-4xl h-px"
        style={{ background: `linear-gradient(to right, transparent, ${color}80, transparent)` }}
      />
    </div>
  )
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-cream">
      <StoryProgress />
      <FloatingScene />
      <div className="relative" style={{ zIndex: 1 }}>
        <Hero />
        {sections.map((section, i) => (
          <div key={section.id}>
            {i > 0 && <Divider color={section.accentColor} />}
            <JourneySection
              section={section}
              sectionIndex={i}
              totalSections={sections.length}
            />
          </div>
        ))}
        <Divider color="#fda4af" />
        <VideoClosing />
      </div>
      <MusicPlayer />
    </div>
  )
}
