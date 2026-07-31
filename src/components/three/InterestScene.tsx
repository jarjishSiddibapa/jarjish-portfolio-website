import { useRef, type RefObject } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, RoundedBox } from '@react-three/drei'
import type { Group } from 'three'

type Variant = 'book' | 'controller' | 'dumbbell' | 'people'

/**
 * Every mesh below drives its primary rotation from scroll progress, recentered
 * so progress 0.5 (the card sitting dead center in the viewport) lands exactly
 * on the object's designed "face the camera" pose, not an arbitrary mid-spin angle.
 */

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
    groupRef.current.rotation.y =
      (progressRef.current - 0.5) * Math.PI * 1.5 + Math.sin(t * 0.6) * 0.08
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

function GameControllerMesh({ progressRef }: { progressRef: RefObject<number> }) {
  const groupRef = useRef<Group>(null)
  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y =
      (progressRef.current - 0.5) * Math.PI * 1.6 + Math.sin(t * 0.5) * 0.07
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.05
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.08
  })

  const buttons: [number, number, string][] = [
    [0.62, 0.16, '#7c3aed'],
    [0.78, 0, '#0e7490'],
    [0.46, 0, '#c2760c'],
    [0.62, -0.16, '#3a5cf0'],
  ]

  return (
    <group ref={groupRef} scale={0.85}>
      <RoundedBox args={[1.7, 0.58, 0.32]} radius={0.16} smoothness={4}>
        <meshStandardMaterial color="#3a4256" roughness={0.45} metalness={0.3} />
      </RoundedBox>

      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.74, -0.4, 0]} rotation={[0, 0, side * 0.5]}>
          <capsuleGeometry args={[0.17, 0.4, 6, 12]} />
          <meshStandardMaterial color="#3a4256" roughness={0.45} metalness={0.3} />
        </mesh>
      ))}

      <group position={[-0.48, 0.02, 0.19]}>
        <mesh>
          <boxGeometry args={[0.32, 0.1, 0.06]} />
          <meshStandardMaterial color="#1c2030" roughness={0.5} metalness={0.2} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.1, 0.32, 0.06]} />
          <meshStandardMaterial color="#1c2030" roughness={0.5} metalness={0.2} />
        </mesh>
      </group>

      {buttons.map(([x, y, color], i) => (
        <mesh key={i} position={[x, y, 0.19]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.05, 16]} />
          <meshStandardMaterial
            color={color}
            roughness={0.3}
            metalness={0.4}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

function DumbbellMesh({ progressRef }: { progressRef: RefObject<number> }) {
  const groupRef = useRef<Group>(null)
  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.z =
      (progressRef.current - 0.5) * Math.PI * 1.3 + Math.sin(t * 0.5) * 0.08
    groupRef.current.rotation.y =
      (progressRef.current - 0.5) * Math.PI * 0.5 + Math.sin(t * 0.3) * 0.06
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

function PersonFigure({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number]
  color: string
  scale?: number
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.42, 0]}>
        <sphereGeometry args={[0.14, 20, 20]} />
        <meshStandardMaterial
          color={color}
          roughness={0.35}
          metalness={0.35}
          emissive={color}
          emissiveIntensity={0.18}
        />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <capsuleGeometry args={[0.16, 0.34, 4, 12]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  )
}

function PeopleMesh({ progressRef }: { progressRef: RefObject<number> }) {
  const groupRef = useRef<Group>(null)
  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y =
      (progressRef.current - 0.5) * Math.PI * 1.2 + Math.sin(t * 0.5) * 0.07
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.08
  })
  return (
    <group ref={groupRef} scale={1.05} position={[0, -0.15, 0]}>
      <PersonFigure position={[0, 0.06, 0.12]} color="#7c3aed" scale={1.15} />
      <PersonFigure position={[-0.48, -0.05, -0.1]} color="#3a5cf0" scale={0.92} />
      <PersonFigure position={[0.48, -0.05, -0.1]} color="#0e7490" scale={0.92} />
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
    case 'controller':
      return <GameControllerMesh progressRef={progressRef} />
    case 'dumbbell':
      return <DumbbellMesh progressRef={progressRef} />
    case 'people':
      return <PeopleMesh progressRef={progressRef} />
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
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.12}
        rotateSpeed={0.7}
      />
    </Canvas>
  )
}
