import FloatingScene from './components/FloatingScene'

export default function App() {
  return (
    <div className="relative min-h-screen bg-cream">
      <FloatingScene />
      <div className="relative" style={{ zIndex: 1 }}>
        <p className="text-center p-8 text-2xl font-display">Para Lilian 🌸</p>
      </div>
    </div>
  )
}
