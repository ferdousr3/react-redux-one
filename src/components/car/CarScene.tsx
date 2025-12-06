import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { InteractiveCar } from './InteractiveCar'

interface CarSceneProps {
   carModelUrl?: string
}

export function CarScene({ carModelUrl = '/models/default-car.glb' }: CarSceneProps) {
   return (
      <div className="w-full h-full">
         <Canvas shadows>
            <PerspectiveCamera makeDefault position={[5, 2, 5]} fov={50} />
            <OrbitControls
               enablePan={true}
               enableZoom={true}
               enableRotate={true}
               minDistance={3}
               maxDistance={10}
               target={[0, 0.5, 0]}
            />

            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight
               position={[10, 10, 5]}
               intensity={1}
               castShadow
               shadow-mapSize-width={2048}
               shadow-mapSize-height={2048}
            />
            <spotLight position={[-10, 10, -5]} intensity={0.5} castShadow />
            <pointLight position={[0, 5, 0]} intensity={0.3} />

            {/* 3D Car Model */}
            <InteractiveCar modelUrl={carModelUrl} />

            {/* Ground */}
            <mesh
               rotation={[-Math.PI / 2, 0, 0]}
               position={[0, -1, 0]}
               receiveShadow
            >
               <planeGeometry args={[50, 50]} />
               <meshStandardMaterial color="#888888" />
            </mesh>

            {/* Environment */}
            <Environment preset="sunset" />
         </Canvas>
      </div>
   )
}
