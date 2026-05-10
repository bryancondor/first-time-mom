import { Float } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const SHAPES = {
  sphere: ({ color }) => (
    <mesh>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
    </mesh>
  ),
  torus: ({ color }) => (
    <mesh>
      <torusGeometry args={[1, 0.35, 12, 32]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
    </mesh>
  ),
  octahedron: ({ color }) => (
    <mesh>
      <octahedronGeometry args={[1]} />
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.2} />
    </mesh>
  ),
}

export default function FloatingObject({ position, scale, color, shape, rotationSpeed = 0.003 }) {
  const ref = useRef()

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += rotationSpeed
      ref.current.rotation.x += rotationSpeed * 0.5
    }
  })

  const Shape = SHAPES[shape] ?? SHAPES.sphere

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <group ref={ref} position={position} scale={scale}>
        <Shape color={color} />
      </group>
    </Float>
  )
}
