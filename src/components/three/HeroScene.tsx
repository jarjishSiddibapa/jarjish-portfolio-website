import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line } from '@react-three/drei'
import { Vector3, type Group } from 'three'

const NODE_COUNT = 16
const RADIUS = 1.7
const NODE_COLORS = ['#3a5cf0', '#7c3aed', '#0e7490']

function useNetworkGeometry() {
  return useMemo(() => {
    const phi = Math.PI * (3 - Math.sqrt(5))
    const nodes = Array.from({ length: NODE_COUNT }, (_, i) => {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2
      const r = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = phi * i
      return new Vector3(Math.cos(theta) * r * RADIUS, y * RADIUS, Math.sin(theta) * r * RADIUS)
    })

    const edges: [Vector3, Vector3][] = []
    nodes.forEach((a, i) => {
      const nearest = nodes
        .map((b, j) => ({ j, d: i === j ? Infinity : a.distanceTo(b) }))
        .sort((x, y) => x.d - y.d)
        .slice(0, 2)
      nearest.forEach(({ j }) => {
        if (j > i) edges.push([a, nodes[j]])
      })
    })

    return { nodes, edges }
  }, [])
}

function NeuralNetwork() {
  const groupRef = useRef<Group>(null)
  const { nodes, edges } = useNetworkGeometry()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.14 + window.scrollY * 0.0005
    groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.12
  })

  return (
    <group ref={groupRef}>
      {edges.map(([a, b], i) => (
        <Line
          key={i}
          points={[a, b]}
          color="#3a5cf0"
          lineWidth={1}
          transparent
          opacity={0.35}
        />
      ))}
      {nodes.map((pos, i) => (
        <Float key={i} speed={1.2 + (i % 3) * 0.25} floatIntensity={0.5} rotationIntensity={0}>
          <mesh position={pos}>
            <sphereGeometry args={[i % 4 === 0 ? 0.14 : 0.09, 24, 24]} />
            <meshStandardMaterial
              color={NODE_COLORS[i % NODE_COLORS.length]}
              roughness={0.25}
              metalness={0.5}
              emissive={NODE_COLORS[i % NODE_COLORS.length]}
              emissiveIntensity={0.4}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function DataPoints() {
  const groupRef = useRef<Group>(null)
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * -0.1 + window.scrollY * 0.0004
    }
  })
  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((i) => (
        <Float key={i} speed={1 + i * 0.3} floatIntensity={1.6} rotationIntensity={0.4}>
          <mesh
            position={[
              Math.cos((i / 3) * Math.PI * 2) * 2.1,
              Math.sin((i / 3) * Math.PI * 2) * 1.6,
              -0.8,
            ]}
          >
            <octahedronGeometry args={[0.1 + i * 0.02, 0]} />
            <meshStandardMaterial
              color={NODE_COLORS[i]}
              roughness={0.3}
              metalness={0.4}
              emissive={NODE_COLORS[i]}
              emissiveIntensity={0.25}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={45} color="#ffffff" />
      <pointLight position={[-5, -3, -5]} intensity={22} color="#7c3aed" />
      <pointLight position={[0, -4, 3]} intensity={12} color="#3a5cf0" />
      <group position={[1.7, 0, 0]}>
        <NeuralNetwork />
        <DataPoints />
      </group>
    </Canvas>
  )
}
