import FloatingScene from './components/FloatingScene'
import Hero from './components/Hero'
import JourneySection from './components/JourneySection'
import VideoClosing from './components/VideoClosing'
import { sections } from './data/journey'

export default function App() {
  return (
    <div className="relative min-h-screen bg-cream">
      <FloatingScene />
      <div className="relative" style={{ zIndex: 1 }}>
        <Hero />
        {sections.map(section => (
          <JourneySection key={section.id} section={section} />
        ))}
        <VideoClosing />
      </div>
    </div>
  )
}
