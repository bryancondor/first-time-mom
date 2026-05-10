import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { useScroll, useTransform, motion } from 'framer-motion'
import FloatingObject from './FloatingObject'

const OBJECTS = [
  { position: [-7,  3, -8],  scale: 0.18, color: '#fda4af', shape: 'sphere',     rotationSpeed: 0.002 },
  { position: [ 6,  4, -9],  scale: 0.22, color: '#93c5fd', shape: 'torus',      rotationSpeed: 0.003 },
  { position: [-5, -3, -9],  scale: 0.15, color: '#c4b5fd', shape: 'octahedron', rotationSpeed: 0.004 },
  { position: [ 8, -2, -8],  scale: 0.18, color: '#fcd34d', shape: 'sphere',     rotationSpeed: 0.002 },
  { position: [ 1,  6, -10], scale: 0.25, color: '#86efac', shape: 'torus',      rotationSpeed: 0.001 },
  { position: [-9,  2, -7],  scale: 0.14, color: '#f9a8d4', shape: 'octahedron', rotationSpeed: 0.005 },
  { position: [ 4, -6, -9],  scale: 0.20, color: '#fda4af', shape: 'torus',      rotationSpeed: 0.003 },
  { position: [-4,  7, -10], scale: 0.17, color: '#93c5fd', shape: 'sphere',     rotationSpeed: 0.002 },
  { position: [ 7,  7, -8],  scale: 0.14, color: '#c4b5fd', shape: 'octahedron', rotationSpeed: 0.004 },
  { position: [-7, -5, -9],  scale: 0.20, color: '#fcd34d', shape: 'sphere',     rotationSpeed: 0.002 },
  { position: [10,  1, -9],  scale: 0.18, color: '#86efac', shape: 'torus',      rotationSpeed: 0.003 },
  { position: [-10, 4, -8],  scale: 0.14, color: '#f9a8d4', shape: 'sphere',     rotationSpeed: 0.005 },
  { position: [ 3,  8, -11], scale: 0.22, color: '#fda4af', shape: 'octahedron', rotationSpeed: 0.001 },
  { position: [-3, -8, -10], scale: 0.17, color: '#93c5fd', shape: 'torus',      rotationSpeed: 0.003 },
  { position: [ 9, -6, -7],  scale: 0.15, color: '#c4b5fd', shape: 'sphere',     rotationSpeed: 0.004 },
  { position: [-6,  9, -9],  scale: 0.20, color: '#fcd34d', shape: 'octahedron', rotationSpeed: 0.002 },
  { position: [ 5, -9, -10], scale: 0.17, color: '#86efac', shape: 'sphere',     rotationSpeed: 0.003 },
  { position: [-8, -1, -8],  scale: 0.14, color: '#f9a8d4', shape: 'torus',      rotationSpeed: 0.005 },
  { position: [ 2, 10, -11], scale: 0.20, color: '#fda4af', shape: 'sphere',     rotationSpeed: 0.002 },
  { position: [-2, -10, -9], scale: 0.16, color: '#93c5fd', shape: 'octahedron', rotationSpeed: 0.003 },
]

export default function FloatingScene() {
  const { scrollY } = useScroll()
  // Parallax: slow upward drift as user scrolls down
  const y = useTransform(scrollY, [0, 5000], [0, -180])

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, y }}
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 55 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 5, 5]} intensity={0.4} />
        {OBJECTS.map((obj, i) => (
          <FloatingObject key={i} {...obj} />
        ))}
        <Preload all />
      </Canvas>
    </motion.div>
  )
}
