import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchCarById } from '@/store/slices/carSlice'
import { CarScene } from '@/components/car/CarScene'
import { PartSelector } from '@/components/car/PartSelector'
import { PriceCalculator } from '@/components/car/PriceCalculator'
import type { RootState, AppDispatch } from '@/store'

export function CarConfigurator() {
   const { id } = useParams<{ id: string }>()
   const navigate = useNavigate()
   const dispatch = useDispatch<AppDispatch>()
   const { selectedCar, loading, error } = useSelector((state: RootState) => state.car)

   useEffect(() => {
      if (id) {
         dispatch(fetchCarById(id))
      }
   }, [id, dispatch])

   if (loading) {
      return (
         <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
               <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
               <p className="text-gray-600">Loading car configuration...</p>
            </div>
         </div>
      )
   }

   if (error) {
      return (
         <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
               <p className="text-red-600 mb-4">{error}</p>
               <button
                  onClick={() => navigate('/cars')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
               >
                  Back to Cars
               </button>
            </div>
         </div>
      )
   }

   if (!selectedCar) {
      return (
         <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
               <p className="text-gray-600 mb-4">Car not found</p>
               <button
                  onClick={() => navigate('/cars')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
               >
                  Back to Cars
               </button>
            </div>
         </div>
      )
   }

   return (
      <div className="car-configurator min-h-screen bg-gray-100 p-6">
         {/* Header */}
         <div className="mb-6">
            <button
               onClick={() => navigate('/cars')}
               className="text-blue-600 hover:text-blue-700 mb-2"
            >
               ← Back to Cars
            </button>
            <h1 className="text-3xl font-bold">
               {selectedCar.brand} {selectedCar.model} ({selectedCar.year})
            </h1>
            <p className="text-gray-600">{selectedCar.description}</p>
         </div>

         {/* Main Content */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 3D Viewer - Takes up 2 columns */}
            <div className="lg:col-span-2">
               <div className="bg-white rounded-lg shadow-lg p-4 h-[600px]">
                  <CarScene carModelUrl={selectedCar.modelUrl} />
               </div>
               <div className="mt-4 bg-white rounded-lg shadow-lg p-4">
                  <h3 className="font-semibold mb-2">Controls:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                     <li>• Click and drag to rotate the car</li>
                     <li>• Scroll to zoom in/out</li>
                     <li>• Click on car parts to see animations</li>
                     <li>• Select parts from the right panel to customize</li>
                  </ul>
               </div>
            </div>

            {/* Controls Panel - Takes up 1 column */}
            <div className="space-y-6">
               <PriceCalculator />
               <PartSelector />
            </div>
         </div>
      </div>
   )
}
