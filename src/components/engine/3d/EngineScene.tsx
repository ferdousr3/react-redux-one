import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stage, PresentationControls, Environment } from '@react-three/drei'
import * as THREE from 'three'

interface EngineSceneProps {
    onPartClick?: (part: string) => void
    highlightedPart?: string | null
}

function EngineModel({ onPartClick, highlightedPart }: { onPartClick?: (part: string) => void, highlightedPart?: string | null }) {
    const meshRef = useRef<THREE.Group>(null)
    const [hoveredPart, setHoveredPart] = useState<string | null>(null)

    useFrame((state) => {
        if (!meshRef.current) return
        // subtle idle animation
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
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

    const getMaterial = (partName: string, baseColor: string) => {
        const isHovered = hoveredPart === partName
        const isSelected = highlightedPart === partName

        const color = isSelected ? '#dd0031' : (isHovered ? new THREE.Color(baseColor).offsetHSL(0, 0, 0.2).getStyle() : baseColor)

        return <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    }

    return (
        <group ref={meshRef}>
            {/* --- Engine Block --- */}
            <mesh
                position={[0, 0, 0]}
                castShadow
                receiveShadow
                onClick={(e) => handleClick(e, 'Block')}
                onPointerOver={(e) => handlePointerOver(e, 'Block')}
                onPointerOut={handlePointerOut}
            >
                <boxGeometry args={[1.5, 1.2, 2.5]} />
                {getMaterial('Block', '#555555')}
            </mesh>

            {/* --- Cylinder Head (Top) --- */}
            <mesh
                position={[0, 0.85, 0]}
                castShadow
                receiveShadow
                onClick={(e) => handleClick(e, 'Head')}
                onPointerOver={(e) => handlePointerOver(e, 'Head')}
                onPointerOut={handlePointerOut}
            >
                <boxGeometry args={[1.4, 0.5, 2.4]} />
                {getMaterial('Head', '#777777')}
            </mesh>

             {/* --- Intake Manifold (Right Side) --- */}
             <group
                onClick={(e) => handleClick(e, 'Intake')}
                onPointerOver={(e) => handlePointerOver(e, 'Intake')}
                onPointerOut={handlePointerOut}
             >
                 <mesh position={[1, 0.5, 0]} castShadow receiveShadow>
                    <boxGeometry args={[0.6, 0.4, 1.8]} />
                    {getMaterial('Intake', '#aaaaaa')}
                </mesh>
                 <mesh position={[0.8, 0.5, -0.5]} rotation={[0, 0, -0.5]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.6]} />
                    {getMaterial('Intake', '#aaaaaa')}
                 </mesh>
                 <mesh position={[0.8, 0.5, 0]} rotation={[0, 0, -0.5]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.6]} />
                    {getMaterial('Intake', '#aaaaaa')}
                 </mesh>
                 <mesh position={[0.8, 0.5, 0.5]} rotation={[0, 0, -0.5]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.6]} />
                    {getMaterial('Intake', '#aaaaaa')}
                 </mesh>
             </group>


            {/* --- Exhaust Manifold (Left Side) --- */}
            <group
                onClick={(e) => handleClick(e, 'Exhaust')}
                onPointerOver={(e) => handlePointerOver(e, 'Exhaust')}
                onPointerOut={handlePointerOut}
            >
                 <mesh position={[-0.9, 0.2, 0]} castShadow receiveShadow>
                     <boxGeometry args={[0.4, 0.3, 2.0]} />
                     {getMaterial('Exhaust', '#8B4513')}
                 </mesh>
                 <mesh position={[-1.2, 0, 0.8]} rotation={[0, 0, -0.2]}>
                    <cylinderGeometry args={[0.15, 0.15, 1.0]} />
                    {getMaterial('Exhaust', '#666')}
                 </mesh>
            </group>

            {/* --- Front Pulleys/Belts --- */}
            <group
                onClick={(e) => handleClick(e, 'Belts')}
                onPointerOver={(e) => handlePointerOver(e, 'Belts')}
                onPointerOut={handlePointerOut}
            >
                <mesh position={[0, -0.2, 1.3]} rotation={[1.57, 0, 0]} castShadow receiveShadow>
                    <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
                    {getMaterial('Belts', '#111')}
                </mesh>
                 <mesh position={[0.4, 0.3, 1.3]} rotation={[1.57, 0, 0]} castShadow receiveShadow>
                    <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
                    {getMaterial('Belts', '#111')}
                </mesh>
                 <mesh position={[-0.4, 0.3, 1.3]} rotation={[1.57, 0, 0]} castShadow receiveShadow>
                    <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
                    {getMaterial('Belts', '#111')}
                </mesh>
            </group>

            {/* --- Pistons (Visual representation if head was transparent, but lets put sparkly things on top) --- */}
            {/* Spark Plugs / Coils */}
            <group
                onClick={(e) => handleClick(e, 'Ignition')}
                onPointerOver={(e) => handlePointerOver(e, 'Ignition')}
                onPointerOut={handlePointerOut}
            >
                {[-0.8, -0.3, 0.2, 0.7].map((z, i) => (
                    <mesh key={i} position={[0, 1.15, z]} castShadow receiveShadow>
                         <cylinderGeometry args={[0.08, 0.08, 0.2]} />
                        {getMaterial('Ignition', '#dd0031')}
                    </mesh>
                ))}
            </group>

        </group>
    )
}

export function EngineScene({ onPartClick, highlightedPart }: EngineSceneProps) {
    return (
        <Canvas shadows dpr={[1, 2]} camera={{ position: [4, 3, 4], fov: 45 }}>
            <color attach="background" args={['#e4e4e7']} />
            <Suspense fallback={null}>
                <PresentationControls speed={1.5} global zoom={0.7} polar={[-0.2, Math.PI / 4]}>
                    <Stage environment="warehouse" intensity={0.5} shadows={{ type: 'contact', opacity: 0.5, blur: 2 }}>
                       <EngineModel onPartClick={onPartClick} highlightedPart={highlightedPart} />
                    </Stage>
                </PresentationControls>
                <Environment preset="warehouse" />
            </Suspense>
        </Canvas>
    )
}
