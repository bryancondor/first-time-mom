import FloatingScene from './components/FloatingScene'
import Hero from './components/Hero'

export default function App() {
  return (
    <div className="relative min-h-screen bg-cream">
      <FloatingScene />
      <div className="relative" style={{ zIndex: 1 }}>
        <Hero />
      </div>
    </div>
  )
}
