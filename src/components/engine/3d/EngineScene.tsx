import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stage, PresentationControls, Environment, Html, useCursor, useTexture, useGLTF, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

interface EngineSceneProps {
    imageUrl?: string
    modelUrl?: string
    onPartClick?: (part: string) => void
    highlightedPart?: string | null
}

// --- 1. GLTF 3D Model Viewer (User's Request) ---
function GLTFModel({ modelUrl, onPartClick, highlightedPart }: { modelUrl: string, onPartClick?: (part: string) => void, highlightedPart?: string | null }) {
    const { nodes } = useGLTF(modelUrl) as any
    const [hovered, setHover] = useState<string | null>(null)
    useCursor(!!hovered)

    const handleClick = (e: any, partName: string) => {
        e.stopPropagation()
        if (onPartClick) onPartClick(partName)
    }

    return (
        <group>
            {Object.values(nodes).map((node: any) => {
                if (!node.geometry) return null

                const isSelected = highlightedPart === node.name
                const isHovered = hovered === node.name

                return (
                    <mesh
                        key={node.name}
                        geometry={node.geometry}
                        material={node.material}
                        onClick={(e) => handleClick(e, node.name)}
                        onPointerOver={(e) => { e.stopPropagation(); setHover(node.name) }}
                        onPointerOut={(e) => { e.stopPropagation(); setHover(null) }}
                    >
                         {/* Highlight Effect */}
                         {(isSelected || isHovered) && (
                            <meshStandardMaterial
                                color={isSelected ? "#dd0031" : "#ff9900"}
                                roughness={0.3}
                                emissive={isSelected ? "#dd0031" : "#000000"}
                                emissiveIntensity={isSelected ? 0.5 : 0}
                            />
                         )}
                    </mesh>
                )
            })}
        </group>
    )
}

// --- 2. Image-Based Fallback Viewer (Existing) ---
function ImageModel({ imageUrl, onPartClick, highlightedPart }: { imageUrl: string, onPartClick?: (part: string) => void, highlightedPart?: string | null }) {
    const meshRef = useRef<THREE.Group>(null)
    const [hovered, setHover] = useState<string | null>(null)
    useCursor(!!hovered)

    useFrame((state) => {
        if (!meshRef.current) return
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    })

    const texture = useTexture(imageUrl)
    texture.colorSpace = THREE.SRGBColorSpace
    // SVG Hotspot Component
    const Hotspot = ({ part, x, y }: { part: string, x: number, y: number }) => {
        const isSelected = highlightedPart === part
        const isHovered = hovered === part

        return (
            <group position={[x, y, 0.1]}>
                {/* Visual SVG Marker (HTML Overlay) */}
                <Html center distanceFactor={10} style={{ pointerEvents: 'none' }}>
                    <div className={`relative flex items-center justify-center transition-all duration-300 ${isSelected ? 'scale-125' : 'scale-100'}`}>
                         {/* SVG Point - Simpler and Smaller */}
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`filter drop-shadow-md transition-all duration-300 ${isSelected ? 'text-[#dd0031]' : 'text-white'}`}>
                            <circle cx="12" cy="12" r="5" fill="currentColor" stroke="white" strokeWidth="2" />
                            {isSelected && <circle cx="12" cy="12" r="9" stroke="#dd0031" strokeWidth="2" className="opacity-50" />}
                        </svg>
                    </div>
                </Html>

                {/* Invisible Hitbox for easier clicking (slightly larger than the dot) */}
                <mesh
                    onClick={(e) => { e.stopPropagation(); if (onPartClick) onPartClick(part) }}
                    onPointerOver={() => setHover(part)}
                    onPointerOut={() => setHover(null)}
                    visible={false}
                >
                    <circleGeometry args={[0.3, 16]} />
                    <meshBasicMaterial color="red" />
                </mesh>
            </group>
        )
    }

    return (
        <group ref={meshRef}>
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[4, 3]} />
                <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} alphaTest={0.5} />
            </mesh>
            <mesh position={[0, -1.51, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                 <planeGeometry args={[4, 3]} />
                 <meshBasicMaterial map={texture} transparent opacity={0.15} side={THREE.DoubleSide} />
            </mesh>

            {/* SVG Hotspots - Reduced to 4 key points */}
            <Hotspot part="Intake" x={0} y={0.8} />
            <Hotspot part="Head" x={0} y={0.3} />
            <Hotspot part="Block" x={0} y={-0.3} />
            <Hotspot part="Exhaust" x={-1.2} y={0} />
        </group>
    )
}

export function EngineScene({ imageUrl, modelUrl, onPartClick, highlightedPart }: EngineSceneProps) {
    return (
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
            <color attach="background" args={['#e4e4e7']} />
            <Suspense fallback={<Html center><div className="text-xs font-bold text-gray-400 animate-pulse">LOADING ENGINE...</div></Html>}>
                {modelUrl ? (
                    <>
                        <Stage environment="city" intensity={0.5}>
                            <GLTFModel modelUrl={modelUrl} onPartClick={onPartClick} highlightedPart={highlightedPart} />
                        </Stage>
                        <OrbitControls makeDefault />
                    </>
                ) : imageUrl ? (
                    <PresentationControls
                        speed={1.5}
                        global
                        zoom={0.7}
                        polar={[-0.1, Math.PI / 4]}
                        azimuth={[-Math.PI / 4, Math.PI / 4]}
                        snap={true}
                    >
                         <ImageModel imageUrl={imageUrl} onPartClick={onPartClick} highlightedPart={highlightedPart} />
                    </PresentationControls>
                ) : null}
                <Environment preset="city" />
            </Suspense>
        </Canvas>
    )
}
