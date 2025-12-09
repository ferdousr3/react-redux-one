import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, ShoppingCart, Info, RotateCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { EngineScene } from '@/components/engine/3d/EngineScene'
import { MOCK_ENGINES } from './EnginesPage'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

export function EngineDetailsPage() {
    const { id } = useParams<{ id: string }>()
    const engine = MOCK_ENGINES.find(e => e.id === id) || MOCK_ENGINES[0]

    // State for selected part (active selection)
    const [selectedPartId, setSelectedPartId] = useState<string | null>(null)
    const [selectedPartData, setSelectedPartData] = useState<any | null>(null)

    // Helper to map 3D part names to Data IDs
    const PART_MAPPING: Record<string, any> = {
        'Block': { name: 'Engine Block', price: 5000, desc: 'High-strength alloy block core.', image: 'https://i.ibb.co.com/0j0ZsgnM/Purple-and-White-Modern-Business-Quote-with-Quote-Icon-Instagram-Post-6-2.png' },
        'Head': { name: 'Cylinder Head', price: 2500, desc: 'Flow-optimized cylinder head.', image: 'https://i.ibb.co.com/V0Cn3NnZ/Purple-and-White-Modern-Business-Quote-with-Quote-Icon-Instagram-Post-6-6.png' },
        'Intake': { name: 'Intake Manifold', price: 1200, desc: 'High-flow intake runner system.', image: 'https://i.ibb.co.com/0jxhJP2n/Purple-and-White-Modern-Business-Quote-with-Quote-Icon-Instagram-Post-6-7.png' },
        'Exhaust': { name: 'Exhaust Manifold', price: 1500, desc: 'Tuned headers for max efficiency.', image: 'https://i.ibb.co.com/rGxCBgrM/20b109d18058c76ea7c375f77a2e94cac96d165e-3.png' },
        'Belts': { name: 'Drive Belts', price: 300, desc: 'Reinforced serpentine belt system.', image: 'https://i.ibb.co.com/0jxhJP2n/Purple-and-White-Modern-Business-Quote-with-Quote-Icon-Instagram-Post-6-7.png' },
        'Ignition': { name: 'Ignition Coils', price: 800, desc: 'High-voltage coil packs.', image: 'https://i.ibb.co.com/rGxCBgrM/20b109d18058c76ea7c375f77a2e94cac96d165e-3.png' },
    }

    const handlePartClick = (partName: string) => {
        const data = PART_MAPPING[partName]
        if (data) {
            setSelectedPartId(partName)
            setSelectedPartData(data)
            toast.success(`Selected: ${data.name}`)
        } else {
            toast.info(`Selected: ${partName}`)
        }
    }

    // Handle list click
    const handleListClick = (partName: string) => {
        handlePartClick(partName)
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20 overflow-hidden flex flex-col h-screen">
             <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden">

                {/* --- LEFT: Info Panel --- */}
                <div className="hidden lg:flex w-80 bg-white border-r border-gray-200 flex-col z-20 shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-gray-100">
                        <Link to="/engines" className="inline-flex items-center text-gray-400 hover:text-gray-900 text-xs font-bold uppercase tracking-wider mb-6 transition-colors">
                            <ArrowLeft className="w-3 h-3 mr-1" /> Back to Engines
                        </Link>

                        {/* Main Engine Image Representation */}
                        <div className="w-full aspect-[4/3] bg-gray-100 rounded-2xl mb-6 overflow-hidden border border-gray-100">
                            <img src={engine.imageUrl} alt={engine.name} className="w-full h-full object-cover" />
                        </div>

                        <h1 className="text-2xl font-black text-gray-900 leading-none mb-2 tracking-tighter font-mono">{engine.name}</h1>
                        <div className="mt-4 px-3 py-1 bg-gray-100 rounded-full inline-block text-xs font-bold text-gray-500 font-mono">
                            {engine.type} • {engine.displacement}
                        </div>
                    </div>
                    <ScrollArea className="flex-1 p-8">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 font-mono">Specs</h3>
                        <div className="space-y-4 mb-8">
                             <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                                 <span className="text-sm text-gray-500">HP</span>
                                 <span className="font-bold text-gray-900 font-mono">{engine.horsepower}</span>
                             </div>
                             <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                                 <span className="text-sm text-gray-500">Torque</span>
                                 <span className="font-bold text-gray-900 font-mono">{engine.torque}</span>
                             </div>
                             <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                                 <span className="text-sm text-gray-500">Base Price</span>
                                 <span className="font-bold text-gray-900 font-mono">${engine.price.toLocaleString()}</span>
                             </div>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed">
                            {engine.description}
                        </p>
                    </ScrollArea>
                </div>

                {/* --- CENTER: 3D Scene --- */}
                <div className="flex-1 bg-[#e4e4e7] relative shadow-inner">
                    <div className="absolute top-4 left-4 z-10 lg:hidden">
                        <Link to="/engines" className="bg-white/90 p-2 rounded-full shadow-sm"><ArrowLeft className="w-5 h-5"/></Link>
                    </div>

                    <EngineScene onPartClick={handlePartClick} highlightedPart={selectedPartId} />

                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 pointer-events-none">
                         <RotateCw className="w-4 h-4 text-gray-600" />
                         <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Interactive 360 View</span>
                    </div>
                </div>

                {/* --- RIGHT: Selection Panel --- */}
                <div className="w-full lg:w-96 bg-white border-l border-gray-200 flex flex-col z-20 shadow-2xl">

                    {/* Top Right: Active Selection (Compact) */}
                    <div className="min-h-[180px] border-b border-gray-200 bg-gray-50/50 p-6 flex flex-col justify-center relative overflow-hidden transition-all">
                        <AnimatePresence mode="wait">
                            {selectedPartData ? (
                                <motion.div
                                    key={selectedPartId}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="relative z-10 flex gap-4 items-start"
                                >
                                    {/* Small Thumbnail Image */}
                                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm shrink-0">
                                        <img
                                            src={selectedPartData.image}
                                            alt={selectedPartData.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Compact Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Selected</div>
                                        <h2 className="text-lg font-black text-gray-900 font-mono leading-tight mb-1">{selectedPartData.name}</h2>
                                        <p className="text-xs text-gray-500 font-medium line-clamp-2 mb-2">{selectedPartData.desc}</p>
                                        <div className="text-lg font-bold text-gray-900 font-mono">${selectedPartData.price.toLocaleString()}</div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center text-center text-gray-400"
                                >
                                    <Info className="w-8 h-8 mb-2 opacity-50" />
                                    <p className="text-sm font-medium">Select a component to details.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Bottom Right: Parts List */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                         <div className="p-4 bg-white border-b border-gray-100 shadow-sm z-10">
                             <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-primary" />
                                Available Components
                             </h3>
                         </div>
                         <ScrollArea className="flex-1 bg-white">
                             <div className="divide-y divide-gray-100">
                                 {Object.entries(PART_MAPPING).map(([key, data]) => (
                                     <button
                                        key={key}
                                        onClick={() => handleListClick(key)}
                                        className={cn(
                                            "w-full text-left p-3 hover:bg-gray-50 transition-colors flex gap-3 group items-start",
                                            selectedPartId === key && "bg-primary/5 hover:bg-primary/10 border-l-4 border-primary pl-[8px]"
                                        )}
                                     >
                                         {/* List Item Thumbnail */}
                                         <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                                             <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
                                         </div>

                                         <div className="flex-1 min-w-0 py-1">
                                             <div className={cn("font-bold text-sm font-mono group-hover:text-primary transition-colors truncate", selectedPartId === key ? "text-primary" : "text-gray-900")}>{data.name}</div>
                                             <div className="text-xs text-gray-400 mt-0.5 line-clamp-1">{data.desc}</div>
                                             <div className="text-xs font-bold text-gray-900 font-mono mt-1">
                                                 ${data.price.toLocaleString()}
                                             </div>
                                         </div>
                                     </button>
                                 ))}
                             </div>
                         </ScrollArea>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 bg-gray-50 border-t border-gray-200">
                        <Button className="w-full h-12 bg-gray-900 text-white font-bold font-mono rounded-xl shadow-lg hover:bg-black transition-all">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Configure Engine
                        </Button>
                    </div>

                </div>

             </div>
        </div>
    )
}
