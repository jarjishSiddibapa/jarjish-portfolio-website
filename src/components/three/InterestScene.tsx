import { useRef, type RefObject } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import type { Group, Mesh } from 'three'

type Variant = 'book' | 'dice' | 'dumbbell' | 'network'

function Page({ side }: { side: 1 | -1 }) {
  return (
    <group rotation={[0, side * 0.4, 0]}>
      <mesh position={[side * 0.5, 0, 0]}>
        <boxGeometry args={[1, 1.3, 0.04]} />
        <meshStandardMaterial color="#f3ead9" roughness={0.65} metalness={0.05} />
      </mesh>
    </group>
  )
}

function BookMesh({ progressRef }: { progressRef: RefObject<number> }) {
  const groupRef = useRef<Group>(null)
  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = progressRef.current * Math.PI * 1.5 + Math.sin(t * 0.6) * 0.15
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.08
  })
  return (
    <group ref={groupRef}>
      <Page side={1} />
      <Page side={-1} />
      <mesh>
        <cylinderGeometry args={[0.045, 0.045, 1.32, 12]} />
        <meshStandardMaterial color="#f0b429" roughness={0.3} metalness={0.4} />
      </mesh>
    </group>
  )
}

function DiceMesh({ progressRef }: { progressRef: RefObject<number> }) {
  const meshRef = useRef<Mesh>(null)
  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.y = progressRef.current * Math.PI * 2.2 + t * 0.25
    meshRef.current.rotation.x = progressRef.current * Math.PI * 0.7 + Math.sin(t * 0.5) * 0.1
    meshRef.current.position.y = Math.sin(t * 0.9) * 0.08
  })
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.9, 0]} />
      <meshStandardMaterial
        color="#22d3ee"
        flatShading
        roughness={0.25}
        metalness={0.5}
        emissive="#0e7490"
        emissiveIntensity={0.15}
      />
    </mesh>
  )
}

function DumbbellMesh({ progressRef }: { progressRef: RefObject<number> }) {
  const groupRef = useRef<Group>(null)
  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.z = progressRef.current * Math.PI * 1.3 + Math.sin(t * 0.5) * 0.1
    groupRef.current.rotation.y = t * 0.3
    groupRef.current.position.y = Math.sin(t * 0.7) * 0.08
  })
  return (
    <group ref={groupRef}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 1.4, 16]} />
        <meshStandardMaterial color="#9aa3b8" roughness={0.3} metalness={0.8} />
      </mesh>
      {[-0.62, 0.62].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.4, 0.4, 0.22, 24]} />
          <meshStandardMaterial
            color="#5b8def"
            roughness={0.35}
            metalness={0.55}
            emissive="#1e3a8a"
            emissiveIntensity={0.12}
          />
        </mesh>
      ))}
    </group>
  )
}

const NETWORK_NODES: [number, number, number][] = Array.from({ length: 5 }, (_, i) => {
  const angle = (i / 5) * Math.PI * 2
  return [Math.cos(angle) * 0.75, Math.sin(angle) * 0.75, 0]
})

function NetworkMesh({ progressRef }: { progressRef: RefObject<number> }) {
  const groupRef = useRef<Group>(null)
  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = progressRef.current * Math.PI * 2.2 + t * 0.2
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.08
  })
  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial
          color="#8b5cf6"
          roughness={0.3}
          metalness={0.5}
          emissive="#4c1d95"
          emissiveIntensity={0.2}
        />
      </mesh>
      {NETWORK_NODES.map((pos, i) => (
        <group key={i}>
          <mesh position={pos}>
            <sphereGeometry args={[0.1, 20, 20]} />
            <meshStandardMaterial color="#f0b429" roughness={0.3} metalness={0.4} />
          </mesh>
          <Line points={[[0, 0, 0], pos]} color="#5b8def" lineWidth={1} transparent opacity={0.45} />
        </group>
      ))}
    </group>
  )
}

interface InterestSceneProps {
  variant: Variant
  progressRef: RefObject<number>
}

function Scene({ variant, progressRef }: InterestSceneProps) {
  switch (variant) {
    case 'book':
      return <BookMesh progressRef={progressRef} />
    case 'dice':
      return <DiceMesh progressRef={progressRef} />
    case 'dumbbell':
      return <DumbbellMesh progressRef={progressRef} />
    case 'network':
      return <NetworkMesh progressRef={progressRef} />
  }
}

export default function InterestScene({ variant, progressRef }: InterestSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.4], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.75} />
      <pointLight position={[3, 3, 3]} intensity={25} color="#ffffff" />
      <pointLight position={[-3, -2, -3]} intensity={12} color="#5b8def" />
      <Scene variant={variant} progressRef={progressRef} />
    </Canvas>
  )
}
