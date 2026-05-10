import { Float } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const SHAPES = {
  sphere: ({ color }) => (
    <mesh>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={color} roughness={0.6} metalness={0} transparent opacity={0.55} />
    </mesh>
  ),
  torus: ({ color }) => (
    <mesh>
      <torusGeometry args={[1, 0.3, 12, 48]} />
      <meshStandardMaterial color={color} roughness={0.6} metalness={0} transparent opacity={0.5} />
    </mesh>
  ),
  octahedron: ({ color }) => (
    <mesh>
      <octahedronGeometry args={[1]} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0} transparent opacity={0.5} />
    </mesh>
  ),
}

export default function FloatingObject({ position, scale, color, shape, rotationSpeed = 0.002 }) {
  const ref = useRef()

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += rotationSpeed
      ref.current.rotation.x += rotationSpeed * 0.4
    }
  })

  const Shape = SHAPES[shape] ?? SHAPES.sphere

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={ref} position={position} scale={scale}>
        <Shape color={color} />
      </group>
    </Float>
  )
}
