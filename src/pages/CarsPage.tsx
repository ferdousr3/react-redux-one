import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { fetchCars } from '@/store/slices/carSlice'
import { Link } from 'react-router-dom'
import { ArrowRight, Car as CarIcon, Gauge } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/shadcn'

// --- Mock Data ---
const MOCK_CARS = [
    {
        id: '1',
        brand: 'Porsche',
        model: '911 GT3 RS',
        year: 2024,
        name: 'Porsche 911 GT3 RS',
        description: 'The ultimate track weapon directly from Weissach. Optimized for aerodynamic performance and pure driving engagement.',
        basePrice: 220000,
        imageUrl: 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80',
    },
    {
        id: '2',
        brand: 'Lamborghini',
        model: 'Huracan Evo',
        year: 2024,
        name: 'Huracan Evo',
        description: 'V10 power with advanced aerodynamics and emotive sound.',
        basePrice: 260000,
        imageUrl: 'https://images.unsplash.com/photo-1544614471-ebc488330dbc?auto=format&fit=crop&q=80',
    },
    {
        id: '3',
        brand: 'Ferrari',
        model: 'F8 Tributo',
        year: 2024,
        name: 'F8 Tributo',
        description: 'Homage to the most powerful V8 in Ferrari history.',
        basePrice: 280000,
        imageUrl: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80',
    }
]

export function CarsPage() {
  // const dispatch = useDispatch<AppDispatch>()
  // const { cars, loading, error } = useSelector((state: RootState) => state.car)

  const cars = MOCK_CARS;
  const loading = false;
  const error = null;

  /*
  useEffect(() => {
    dispatch(fetchCars())
  }, [dispatch])
  */

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center text-destructive">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-20">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="py-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Fleet</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our collection of high-performance vehicles. Select a car to view available parts, engines, and modifications.
            </p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cars.map((car, index) => (
                <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                >
                    {/* Image Area */}
                    <div className="h-48 overflow-hidden relative bg-gray-100">
                        {car.imageUrl ? (
                             <img src={car.imageUrl} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                             <div className="w-full h-full flex items-center justify-center text-gray-300">
                                 <CarIcon className="w-12 h-12" />
                             </div>
                        )}
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-gray-900 shadow-sm border border-gray-100">
                            {car.year}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                         <div className="mb-2">
                             <span className="text-xs font-bold text-primary uppercase tracking-wider">{car.brand}</span>
                             <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{car.name}</h3>
                             <p className="text-sm text-gray-500">{car.model}</p>
                         </div>

                         <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                             <div>
                                 <p className="text-xs text-gray-400">Starting at</p>
                                 <p className="font-bold text-gray-900">${Number(car.basePrice).toLocaleString()}</p>
                             </div>
                             <Link to={`/cars/${car.id}`}>
                                <Button className="bg-gray-900 hover:bg-primary text-white rounded-lg h-9 w-9 p-0 flex items-center justify-center transition-colors">
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                             </Link>
                         </div>
                    </div>
                </motion.div>
            ))}
        </div>

        {cars.length === 0 && (
            <div className="text-center py-20 text-gray-500">
                <CarIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
                No cars available at the moment.
            </div>
        )}

      </div>
    </div>
  )
}
