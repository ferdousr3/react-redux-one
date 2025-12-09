import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stage, PresentationControls, Environment } from '@react-three/drei'
import * as THREE from 'three'

interface CarSceneProps {
    color: string
    lightsColor: string
    isRotating?: boolean
    onPartClick?: (part: string) => void
}


function CarModel({ color, lightsColor, onPartClick }: { color: string, lightsColor: string, onPartClick?: (part: string) => void }) {
    const meshRef = useRef<THREE.Group>(null)
    const [hoveredPart, setHoveredPart] = useState<string | null>(null)

    useFrame((state) => {
        if (!meshRef.current) return
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05
    })

    const handlePointerOver = (e: any, part: string) => {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        setHoveredPart(part)
    }

    const handlePointerOut = (e: any) => {
        e.stopPropagation()
        document.body.style.cursor = 'auto'
        setHoveredPart(null)
    }

    const handleClick = (e: any, part: string) => {
        e.stopPropagation()
        if (onPartClick) onPartClick(part)
    }

    return (
        <group ref={meshRef}>
            {/* --- Car Body (Triggers Paint Config) --- */}
            <group
                onClick={(e) => handleClick(e, 'body')}
                onPointerOver={(e) => handlePointerOver(e, 'body')}
                onPointerOut={handlePointerOut}
            >
                {/* Main Chassis */}
                <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
                    <boxGeometry args={[2, 0.6, 4.2]} />
                    <meshStandardMaterial
                        color={hoveredPart === 'body' ? new THREE.Color(color).offsetHSL(0,0,0.1) : color}
                        metalness={0.7}
                        roughness={0.2}
                    />
                </mesh>
                {/* Hood/Trunk styling */}
                <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
                     <boxGeometry args={[1.9, 0.15, 3.8]} />
                     <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} />
                </mesh>
            </group>

            {/* --- Cabin (Triggers Interior/Paint) --- */}
            <mesh position={[0, 1.2, -0.4]} castShadow receiveShadow
                  onClick={(e) => handleClick(e, 'body')}
                  onPointerOver={(e) => handlePointerOver(e, 'body')}
                  onPointerOut={handlePointerOut}
            >
                <boxGeometry args={[1.5, 0.7, 2.2]} />
                <meshStandardMaterial color="#111" metalness={0.9} roughness={0.0} transparent opacity={0.95} />
            </mesh>

            {/* --- Spoiler (Visual Flair) --- */}
             <mesh position={[0, 1.1, 1.8]} castShadow receiveShadow>
                <boxGeometry args={[1.8, 0.05, 0.4]} />
                <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} />
            </mesh>
            <mesh position={[-0.6, 0.9, 1.8]} castShadow receiveShadow>
                <cylinderGeometry args={[0.05, 0.05, 0.4]} />
                <meshStandardMaterial color="#111" />
            </mesh>
             <mesh position={[0.6, 0.9, 1.8]} castShadow receiveShadow>
                <cylinderGeometry args={[0.05, 0.05, 0.4]} />
                <meshStandardMaterial color="#111" />
            </mesh>

            {/* --- Wheels (Triggers Suspension/Performance Config) --- */}
            {[[ -1, 1.2 ], [ 1, 1.2 ], [ -1, -1.2 ], [ 1, -1.2 ]].map((pos, i) => (
                <mesh
                    key={i}
                    position={[pos[0], 0.35, pos[1]]}
                    rotation={[0, 0, Math.PI / 2]}
                    castShadow
                    onClick={(e) => handleClick(e, 'wheels')}
                    onPointerOver={(e) => handlePointerOver(e, 'wheels')}
                    onPointerOut={handlePointerOut}
                >
                    <cylinderGeometry args={[0.35, 0.35, 0.5, 32]} />
                    <meshStandardMaterial color={hoveredPart === 'wheels' ? '#333' : '#111'} />
                </mesh>
            ))}

            {/* --- Headlights (Triggers Lights Config) --- */}
            <group
                onClick={(e) => handleClick(e, 'lights')}
                onPointerOver={(e) => handlePointerOver(e, 'lights')}
                onPointerOut={handlePointerOut}
            >
                <mesh position={[-0.6, 0.6, 2.11]}>
                    <sphereGeometry args={[0.18]} />
                    <meshStandardMaterial
                        color={lightsColor}
                        emissive={lightsColor}
                        emissiveIntensity={hoveredPart === 'lights' ? 4 : 2}
                    />
                </mesh>
                <mesh position={[0.6, 0.6, 2.11]}>
                    <sphereGeometry args={[0.18]} />
                    <meshStandardMaterial
                        color={lightsColor}
                        emissive={lightsColor}
                        emissiveIntensity={hoveredPart === 'lights' ? 4 : 2}
                    />
                </mesh>
            </group>
        </group>
    )
}

export function CarScene({ color, lightsColor, onPartClick }: CarSceneProps) {
    return (
        <Canvas shadows dpr={[1, 2]} camera={{ position: [5, 3, 6], fov: 40 }}>
            <color attach="background" args={['#d4d4d8']} /> {/* Slightly darker bg for better contrast */}
            <Suspense fallback={null}>
                <PresentationControls speed={1.5} global zoom={0.7} polar={[-0.1, Math.PI / 4]}>
                    <Stage environment="city" intensity={0.5} shadows={{ type: 'contact', opacity: 0.4, blur: 2 }}>
                       <CarModel color={color} lightsColor={lightsColor} onPartClick={onPartClick} />
                    </Stage>
                </PresentationControls>
                <Environment preset="city" />
            </Suspense>
        </Canvas>
    )
}
