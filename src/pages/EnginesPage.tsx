import { Link } from 'react-router-dom'
import { ArrowRight, Box, Cpu } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

// --- Mock Data ---
export const MOCK_ENGINES = [
    {
        id: '1',
        name: 'V8 Supercharged "Titan"',
        type: 'V8',
        displacement: '5.0L',
        horsepower: 750,
        torque: '650 lb-ft',
        price: 25000,
        imageUrl: 'https://i.ibb.co.com/bRFdsQm6/0d03ed8d3d26ed4a6db64416b3a543f1aef82c4f.png',
        description: 'A monster of an engine designed for drag racing and heavy-duty performance.',
        parts: [
            { id: 'block', name: 'Titanium Block', price: 8000 },
            { id: 'pistons', name: 'Forged Pistons', price: 2000 },
            { id: 'supercharger', name: 'Roots Supercharger', price: 5000 },
        ]
    },
    {
        id: '2',
        name: 'Inline-6 "Silk" Turbo',
        type: 'Inline-6',
        displacement: '3.0L',
        horsepower: 400,
        torque: '380 lb-ft',
        price: 12000,
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-38057a97d904?auto=format&fit=crop&q=80',
        description: 'Smooth, reliable power delivery perfect for sport sedans and coupes.',
        parts: [
            { id: 'block', name: 'Aluminum Block', price: 4000 },
            { id: 'turbo', name: 'Twin-Scroll Turbo', price: 1500 },
            { id: 'ecu', name: 'Sport ECU', price: 800 },
        ]
    },
    {
        id: '3',
        name: 'V12 "Zeus" Twin-Turbo',
        type: 'V12',
        displacement: '6.5L',
        horsepower: 900,
        torque: '800 lb-ft',
        price: 65000,
        imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80',
        description: 'The pinnacle of combustion engineering. Massive power, massive sound.',
        parts: [
            { id: 'block', name: 'Carbon-Composite Block', price: 20000 },
            { id: 'exhaust', name: 'Titanium Exhaust', price: 8000 },
            { id: 'intake', name: 'Dual Intake System', price: 3000 },
        ]
    },
    {
        id: '4',
        name: 'Flux Electric Drive',
        type: 'Electric',
        displacement: 'N/A',
        horsepower: 1000,
        torque: '1200 lb-ft',
        price: 30000,
        imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80',
        description: 'Instant torque, zero emissions. The future of speed.',
        parts: [
            { id: 'rotor', name: 'High-RPM Rotor', price: 5000 },
            { id: 'inverter', name: 'SiC Inverter', price: 4000 },
            { id: 'battery', name: 'Solid State Pack', price: 15000 },
        ]
    }
]

export function EnginesPage() {
  const loading = false
  const error = null

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-20">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="py-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-mono tracking-tighter">ENGINEERING EXCELLENCE</h1>
            <p className="text-gray-600 max-w-2xl mx-auto font-mono">
                Power your machine with our world-class powertrains. Choose your heart.
            </p>
        </div>

        {/* Engines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {MOCK_ENGINES.map((engine, index) => (
                <motion.div
                    key={engine.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col"
                >
                    {/* Image Area */}
                    <div className="h-48 overflow-hidden relative bg-gray-100 border-b border-gray-100">
                        {engine.imageUrl ? (
                             <img src={engine.imageUrl} alt={engine.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                             <div className="w-full h-full flex items-center justify-center text-gray-300">
                                 <Cpu className="w-12 h-12" />
                             </div>
                        )}
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-gray-900 shadow-sm border border-gray-100 font-mono">
                            {engine.type}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                         <div className="mb-4">
                             <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors font-mono tracking-tight">{engine.name}</h3>
                             <p className="text-xs text-gray-500 mt-1 line-clamp-2 min-h-[2.5em]">{engine.description}</p>
                         </div>

                         <div className="space-y-2 mb-6">
                            <div className="flex justify-between text-xs font-mono border-b border-gray-100 pb-1">
                                <span className="text-gray-400">POWER</span>
                                <span className="text-gray-900 font-bold">{engine.horsepower} HP</span>
                            </div>
                            <div className="flex justify-between text-xs font-mono border-b border-gray-100 pb-1">
                                <span className="text-gray-400">TORQUE</span>
                                <span className="text-gray-900 font-bold">{engine.torque}</span>
                            </div>
                         </div>

                         <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                             <div>
                                 <p className="text-xs text-gray-400 font-mono uppercase">Price</p>
                                 <p className="font-bold text-gray-900 font-mono text-lg">${Number(engine.price).toLocaleString()}</p>
                             </div>
                             <Link to={`/engines/${engine.id}`}>
                                <Button className="bg-gray-900 hover:bg-primary text-white rounded-lg h-10 w-10 p-0 flex items-center justify-center transition-colors">
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                             </Link>
                         </div>
                    </div>
                </motion.div>
            ))}
        </div>

        {MOCK_ENGINES.length === 0 && (
            <div className="text-center py-20 text-gray-500 font-mono">
                <Box className="w-12 h-12 mx-auto mb-4 opacity-20" />
                No engines available.
            </div>
        )}

      </div>
    </div>
  )
}
