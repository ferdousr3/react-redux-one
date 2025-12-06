import { useGLTF } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import gsap from 'gsap'
import { Mesh, Group } from 'three'

interface InteractiveCarProps {
   modelUrl: string
}

export function InteractiveCar({ modelUrl }: InteractiveCarProps) {
   const groupRef = useRef<Group>(null)
   const dispatch = useDispatch()
   const [hoveredPart, setHoveredPart] = useState<string | null>(null)

   // Load 3D model - using try/catch for error handling
   let scene
   try {
      const gltf = useGLTF(modelUrl)
      scene = gltf.scene
   } catch (error) {
      console.error('Failed to load 3D model:', error)
      // Return a placeholder cube if model fails to load
      return (
         <mesh>
            <boxGeometry args={[2, 1, 4]} />
            <meshStandardMaterial color="#ff0000" />
         </mesh>
      )
   }

   useEffect(() => {
      if (!scene) return

      // Make parts interactive
      scene.traverse((child) => {
         if (child instanceof Mesh) {
            // Identify parts by name
            if (child.name.toLowerCase().includes('door')) {
               child.userData.interactive = true
               child.userData.partType = 'doors'
               child.userData.originalPosition = child.position.clone()
            }
            if (child.name.toLowerCase().includes('wheel')) {
               child.userData.interactive = true
               child.userData.partType = 'wheels'
               child.userData.originalRotation = child.rotation.clone()
            }
            if (child.name.toLowerCase().includes('engine') || child.name.toLowerCase().includes('hood')) {
               child.userData.interactive = true
               child.userData.partType = 'engine'
               child.userData.originalRotation = child.rotation.clone()
            }
            if (child.name.toLowerCase().includes('body')) {
               child.userData.interactive = true
               child.userData.partType = 'paint'
            }
         }
      })
   }, [scene])

   const handleClick = (event: any) => {
      event.stopPropagation()
      const partType = event.object.userData.partType

      if (!partType) return

      // Animate the clicked part
      if (partType === 'doors') {
         gsap.to(event.object.position, {
            x: event.object.position.x + 0.5,
            duration: 0.5,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1,
         })
      } else if (partType === 'engine') {
         gsap.to(event.object.rotation, {
            x: event.object.rotation.x - Math.PI / 6,
            duration: 0.5,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1,
         })
      } else if (partType === 'wheels') {
         gsap.to(event.object.rotation, {
            z: event.object.rotation.z + Math.PI * 2,
            duration: 1,
            ease: 'power2.out',
         })
      }

      // Dispatch action to show part selector (you can uncomment when integrated)
      // dispatch(setSelectedPartType(partType))
      console.log('Clicked part:', partType)
   }

   const handlePointerOver = (event: any) => {
      event.stopPropagation()
      if (event.object.userData.interactive) {
         setHoveredPart(event.object.userData.partType)
         document.body.style.cursor = 'pointer'
      }
   }

   const handlePointerOut = () => {
      setHoveredPart(null)
      document.body.style.cursor = 'default'
   }

   return (
      <group ref={groupRef}>
         <primitive
            object={scene}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            scale={1}
            castShadow
            receiveShadow
         />
      </group>
   )
}

// Preload the model
useGLTF.preload('/models/default-car.glb')
