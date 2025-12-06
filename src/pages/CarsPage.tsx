import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchCars } from '@/store/slices/carSlice'
import type { RootState, AppDispatch } from '@/store'
import { Car } from 'lucide-react'

export function CarsPage() {
   const navigate = useNavigate()
   const dispatch = useDispatch<AppDispatch>()
   const { cars, loading, error } = useSelector((state: RootState) => state.car)

   useEffect(() => {
      dispatch(fetchCars())
   }, [dispatch])

   if (loading) {
      return (
         <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
               <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                     <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                     <p className="text-gray-600">Loading cars...</p>
                  </div>
               </div>
            </div>
         </div>
      )
   }

   if (error) {
      return (
         <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
               <div className="text-center py-20">
                  <p className="text-red-600 mb-4">{error}</p>
                  <button
                     onClick={() => dispatch(fetchCars())}
                     className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700"
                  >
                     Retry
                  </button>
               </div>
            </div>
         </div>
      )
   }

   return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
         <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="mb-12">
               <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Car Configurator
               </h1>
               <p className="text-lg text-gray-600">
                  Choose a car to customize and configure your dream vehicle
               </p>
            </div>

            {/* Cars Grid */}
            {cars.length === 0 ? (
               <div className="text-center py-20">
                  <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">No cars available yet</p>
                  <p className="text-gray-500 text-sm mt-2">
                     Check back later for new models
                  </p>
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cars.map((car) => (
                     <div
                        key={car.id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                        onClick={() => navigate(`/cars/${car.id}`)}
                     >
                        {/* Car Image */}
                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                           {car.imageUrl ? (
                              <img
                                 src={car.imageUrl}
                                 alt={`${car.brand} ${car.model}`}
                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                           ) : (
                              <div className="flex items-center justify-center h-full">
                                 <Car className="w-20 h-20 text-gray-400" />
                              </div>
                           )}
                        </div>

                        {/* Car Details */}
                        <div className="p-6">
                           <div className="mb-3">
                              <h3 className="text-xl font-bold text-gray-900 mb-1">
                                 {car.brand} {car.model}
                              </h3>
                              <p className="text-sm text-gray-500">{car.year}</p>
                           </div>

                           {car.description && (
                              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                 {car.description}
                              </p>
                           )}

                           <div className="flex items-center justify-between">
                              <div>
                                 <p className="text-xs text-gray-500 mb-1">Starting at</p>
                                 <p className="text-2xl font-bold text-emerald-600">
                                    ${parseFloat(car.basePrice).toLocaleString()}
                                 </p>
                              </div>
                              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                                 Configure
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   )
}
