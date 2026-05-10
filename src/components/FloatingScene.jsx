import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import FloatingObject from './FloatingObject'

const OBJECTS = [
  { position: [-6,  3, -5], scale: 0.4, color: '#fda4af', shape: 'sphere',     rotationSpeed: 0.002 },
  { position: [ 5,  4, -4], scale: 0.5, color: '#93c5fd', shape: 'torus',      rotationSpeed: 0.003 },
  { position: [-4, -3, -6], scale: 0.3, color: '#c4b5fd', shape: 'octahedron', rotationSpeed: 0.004 },
  { position: [ 7, -2, -5], scale: 0.4, color: '#fcd34d', shape: 'sphere',     rotationSpeed: 0.002 },
  { position: [ 0,  5, -7], scale: 0.6, color: '#86efac', shape: 'torus',      rotationSpeed: 0.001 },
  { position: [-8,  1, -4], scale: 0.3, color: '#f9a8d4', shape: 'octahedron', rotationSpeed: 0.005 },
  { position: [ 3, -5, -6], scale: 0.5, color: '#fda4af', shape: 'torus',      rotationSpeed: 0.003 },
  { position: [-3,  6, -8], scale: 0.4, color: '#93c5fd', shape: 'sphere',     rotationSpeed: 0.002 },
  { position: [ 6,  6, -5], scale: 0.3, color: '#c4b5fd', shape: 'octahedron', rotationSpeed: 0.004 },
  { position: [-6, -5, -7], scale: 0.5, color: '#fcd34d', shape: 'sphere',     rotationSpeed: 0.002 },
  { position: [ 9,  0, -6], scale: 0.4, color: '#86efac', shape: 'torus',      rotationSpeed: 0.003 },
  { position: [-9,  4, -5], scale: 0.3, color: '#f9a8d4', shape: 'sphere',     rotationSpeed: 0.005 },
  { position: [ 2,  7, -9], scale: 0.6, color: '#fda4af', shape: 'octahedron', rotationSpeed: 0.001 },
  { position: [-2, -7, -8], scale: 0.4, color: '#93c5fd', shape: 'torus',      rotationSpeed: 0.003 },
  { position: [ 8, -6, -4], scale: 0.3, color: '#c4b5fd', shape: 'sphere',     rotationSpeed: 0.004 },
  { position: [-5,  8, -6], scale: 0.5, color: '#fcd34d', shape: 'octahedron', rotationSpeed: 0.002 },
  { position: [ 4, -8, -7], scale: 0.4, color: '#86efac', shape: 'sphere',     rotationSpeed: 0.003 },
  { position: [-7, -1, -5], scale: 0.3, color: '#f9a8d4', shape: 'torus',      rotationSpeed: 0.005 },
  { position: [ 1,  9, -8], scale: 0.5, color: '#fda4af', shape: 'sphere',     rotationSpeed: 0.002 },
  { position: [-1, -9, -6], scale: 0.4, color: '#93c5fd', shape: 'octahedron', rotationSpeed: 0.003 },
]

export default function FloatingScene() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        {OBJECTS.map((obj, i) => (
          <FloatingObject key={i} {...obj} />
        ))}
        <Preload all />
      </Canvas>
    </div>
  )
}
