import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { fetchCarById } from '@/store/slices/carSlice'
import { ArrowLeft, RotateCw, ShoppingCart, MousePointerClick } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CarScene } from '@/components/car/3d/CarScene'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

// --- Mock Configuration Data ---
const CAR_COLORS = [
    { name: 'Midnight Black', value: '#111111' },
    { name: 'Racing Red', value: '#ef4444' },
    { name: 'Pearl White', value: '#ffffff' },
    { name: 'Deep Blue', value: '#001144' },
    { name: 'Forest Green', value: '#004411' },
    { name: 'Sunset Orange', value: '#ff5500' },
]

const LIGHT_COLORS = [
    { name: 'Xenon Blue', value: '#aaddff' },
    { name: 'Halogen Warm', value: '#ffaa55' },
    { name: 'LED White', value: '#ffffff' },
    { name: 'Neon Purple', value: '#aa00ff' },
]

const UPGRADES = {
    engines: [
        { id: 'v6', name: 'Standard V6', price: 0, image: 'https://images.unsplash.com/photo-1486262715619-38057a97d904?auto=format&fit=crop&w=300&q=80', specs: '300 HP' },
        { id: 'v8', name: 'Turbo V8', price: 5000, image: 'https://images.unsplash.com/photo-1552857497-69502b4d1806?auto=format&fit=crop&w=300&q=80', specs: '500 HP' },
        { id: 'elec', name: 'Electric Dual-Motor', price: 12000, image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=300&q=80', specs: '800 HP' },
    ],
    suspension: [
        { id: 'stock', name: 'Stock Comfort', price: 0 },
        { id: 'sport', name: 'Sport Tuned', price: 1500 },
        { id: 'air', name: 'Air Suspension', price: 3000 },
    ]
}

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

export function CarDetailsPage() {
  const { id } = useParams<{ id: string }>()
  // const dispatch = useDispatch<AppDispatch>()
  // const { selectedCar, loading, error } = useSelector((state: RootState) => state.car)

  // Local Data Loading
  const selectedCar = MOCK_CARS.find(c => c.id === id) || MOCK_CARS[0] // Fallback to first car if not found or id is missing
  const loading = false
  const error = null

  // Configuration State
  const [selectedColor, setSelectedColor] = useState(CAR_COLORS[1])
  const [selectedLights, setSelectedLights] = useState(LIGHT_COLORS[0])
  const [selectedEngine, setSelectedEngine] = useState(UPGRADES.engines[0])
  const [selectedSuspension, setSelectedSuspension] = useState(UPGRADES.suspension[0])
  const [activeTab, setActiveTab] = useState<'paint' | 'performance'>('paint')

  /*
  useEffect(() => {
    if (id) {
      dispatch(fetchCarById(id))
    }
  }, [dispatch, id])
  */

  const handlePartClick = (part: string) => {
      if (part === 'body' || part === 'lights') {
          setActiveTab('paint')
          toast.info(`Configuring ${part === 'lights' ? 'Headlights' : 'Body Paint'}`)
      } else if (part === 'wheels') {
          setActiveTab('performance')
          toast.info('Configuring Suspension & Wheels')
      }
  }

  if (loading) return <div className="min-h-screen pt-20 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
  if (error || !selectedCar) return <div className="min-h-screen pt-20 flex items-center justify-center text-destructive">Error loading car.</div>

  // Calculate Total Price
  const basePrice = Number(selectedCar.basePrice)
  const totalPrice = basePrice + selectedEngine.price + selectedSuspension.price

  return (
    <div className="min-h-screen bg-gray-50 pt-20 overflow-hidden flex flex-col h-screen">

       <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden">

           {/* --- LEFT: Info Panel (Collapsible/Overlay on Mobile) --- */}
           <div className="hidden lg:flex w-72 bg-white border-r border-gray-200 flex-col z-20 shadow-xl">
               <div className="p-8 border-b border-gray-100">
                   <Link to="/cars" className="inline-flex items-center text-gray-400 hover:text-gray-900 text-xs font-bold uppercase tracking-wider mb-6 transition-colors">
                       <ArrowLeft className="w-3 h-3 mr-1" /> Back to Fleet
                   </Link>
                   <h1 className="text-4xl font-black text-gray-900 leading-none mb-2 tracking-tighter">{selectedCar.brand}</h1>
                   <h2 className="text-2xl font-light text-muted-foreground tracking-tight">{selectedCar.model}</h2>
                   <div className="mt-4 px-3 py-1 bg-gray-100 rounded-full inline-block text-xs font-bold text-gray-500">
                       {selectedCar.year} Series
                   </div>
               </div>
               <ScrollArea className="flex-1 p-8">
                   <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Specs & Details</h3>
                   <p className="text-sm text-gray-600 leading-relaxed mb-8">
                       {selectedCar.description || "Experience the pinnacle of automotive engineering with this fully customizable masterpiece. Use the 3D configurator to build your dream spec."}
                   </p>

                   <div className="space-y-4">
                       <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                           <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest block mb-1">Starting Price</span>
                           <div className="text-2xl font-black text-gray-900">${basePrice.toLocaleString()}</div>
                       </div>
                   </div>
               </ScrollArea>
           </div>

           {/* --- CENTER: 3D Canvas --- */}
           <div className="flex-1 bg-[#d4d4d8] relative shadow-inner">
               <div className="absolute top-4 left-4 z-10 lg:hidden">
                    <Link to="/cars" className="bg-white/90 p-2 rounded-full shadow-sm"><ArrowLeft className="w-5 h-5"/></Link>
               </div>

               {/* 3D Component */}
               <CarScene
                   color={selectedColor.value}
                   lightsColor={selectedLights.value}
                   onPartClick={handlePartClick}
               />

               {/* 3D Overlay Hints */}
               <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 z-10 pointer-events-none">
                    <div className="flex items-center gap-2 bg-black/5 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
                        <RotateCw className="w-3 h-3 text-gray-600" />
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Drag to Rotate</span>
                    </div>
                     <div className="flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-primary/20">
                        <MousePointerClick className="w-3 h-3 text-primary" />
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Click Parts to Edit</span>
                    </div>
               </div>
           </div>

           {/* --- RIGHT: Config Panel --- */}
           <div className="w-full lg:w-[420px] bg-white border-l border-gray-200 flex flex-col z-20 shadow-2xl relative">

               {/* Tabs */}
               <div className="flex border-b border-gray-100">
                   <button
                       onClick={() => setActiveTab('paint')}
                       className={cn("flex-1 py-5 text-xs font-bold uppercase tracking-widest transition-all border-b-2 hover:bg-gray-50", activeTab === 'paint' ? "border-primary text-primary" : "border-transparent text-gray-400 hover:text-gray-900")}
                   >
                       Paint & Style
                   </button>
                   <button
                       onClick={() => setActiveTab('performance')}
                       className={cn("flex-1 py-5 text-xs font-bold uppercase tracking-widest transition-all border-b-2 hover:bg-gray-50", activeTab === 'performance' ? "border-primary text-primary" : "border-transparent text-gray-400 hover:text-gray-900")}
                   >
                       Performance
                   </button>
               </div>

               {/* Config Content */}
               <ScrollArea className="flex-1 p-8 bg-white/50">
                   {activeTab === 'paint' ? (
                       <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
                           {/* Body Paint */}
                           <div>
                               <div className="flex justify-between items-center mb-4">
                                   <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Exterior Color</h3>
                                   <span className="text-[10px] font-bold text-gray-400">{selectedColor.name}</span>
                               </div>
                               <div className="grid grid-cols-5 gap-3">
                                   {CAR_COLORS.map((color) => (
                                       <button
                                           key={color.name}
                                           onClick={() => setSelectedColor(color)}
                                           className={cn("w-12 h-12 rounded-2xl shadow-sm border-2 transition-all transform hover:scale-105 active:scale-95", selectedColor.name === color.name ? "border-primary shadow-lg shadow-black/5" : "border-transparent")}
                                           style={{ backgroundColor: color.value }}
                                           title={color.name}
                                       >
                                           {selectedColor.name === color.name && <div className="w-full h-full flex items-center justify-center text-white mix-blend-difference"><div className="w-1.5 h-1.5 bg-white rounded-full" /></div>}
                                       </button>
                                   ))}
                               </div>
                           </div>

                           {/* Lights Color */}
                           <div>
                               <div className="flex justify-between items-center mb-4">
                                   <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Lighting Package</h3>
                                   <span className="text-[10px] font-bold text-gray-400">{selectedLights.name}</span>
                               </div>
                               <div className="grid grid-cols-2 gap-3">
                                   {LIGHT_COLORS.map((color) => (
                                       <button
                                           key={color.name}
                                           onClick={() => setSelectedLights(color)}
                                           className={cn("h-12 rounded-xl shadow-sm border px-3 flex items-center justify-between transition-all", selectedLights.name === color.name ? "border-primary bg-primary/5" : "border-gray-100 hover:border-gray-200")}
                                       >
                                           <span className="text-xs font-bold text-gray-600">{color.name}</span>
                                           <div className="h-4 w-4 rounded-full border border-gray-200 shadow-inner" style={{ backgroundColor: color.value }}></div>
                                       </button>
                                   ))}
                               </div>
                           </div>
                       </div>
                   ) : (
                       <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                           {/* Engine List */}
                           <div>
                               <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Powertrain</h3>
                               <div className="space-y-3">
                                   {UPGRADES.engines.map((engine) => (
                                       <div
                                           key={engine.id}
                                           onClick={() => setSelectedEngine(engine)}
                                           className={cn("flex items-center gap-4 p-3 rounded-2xl border cursor-pointer transition-all hover:shadow-md", selectedEngine.id === engine.id ? "border-[#dd0031] bg-red-50/10 shadow-inner" : "border-gray-100 bg-white hover:border-gray-200")}
                                       >
                                           <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
                                               <img src={engine.image} className="w-full h-full object-cover" alt={engine.name} />
                                           </div>
                                           <div className="flex-1 min-w-0">
                                               <h4 className="font-bold text-gray-900 text-sm truncate">{engine.name}</h4>
                                               <p className="text-xs text-gray-500 font-medium mt-0.5">{engine.specs}</p>
                                           </div>
                                           <div className="text-right">
                                               <div className="font-bold text-[#dd0031] text-xs">
                                                   {engine.price === 0 ? "INCLUDED" : `+$${engine.price.toLocaleString()}`}
                                               </div>
                                           </div>
                                       </div>
                                   ))}
                               </div>
                           </div>

                           {/* Suspension List */}
                           <div>
                               <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Suspension Tuning</h3>
                               <div className="space-y-2">
                                   {UPGRADES.suspension.map((item) => (
                                       <div
                                           key={item.id}
                                           onClick={() => setSelectedSuspension(item)}
                                            className={cn("flex justify-between items-center p-4 rounded-xl border cursor-pointer transition-all", selectedSuspension.id === item.id ? "border-[#dd0031] bg-red-50/10" : "border-gray-100 hover:border-gray-200")}
                                       >
                                           <span className="font-bold text-gray-700 text-xs">{item.name}</span>
                                           <span className="text-xs font-bold text-[#dd0031]">{item.price === 0 ? "STOCK" : `+$${item.price.toLocaleString()}`}</span>
                                       </div>
                                   ))}
                               </div>
                           </div>
                       </div>
                   )}
               </ScrollArea>

               {/* Footer Total */}
               <div className="p-8 border-t border-gray-200 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-30">
                   <div className="flex justify-between items-end mb-6">
                       <div>
                           <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Estimated Total</div>
                           <div className="text-3xl font-black text-gray-900 tracking-tight">${totalPrice.toLocaleString()}</div>
                       </div>
                       <div className="text-right hidden sm:block">
                           <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Monthly</div>
                           <div className="text-sm font-bold text-gray-600">${(totalPrice / 60).toFixed(0)} /mo</div>
                       </div>
                   </div>
                   <Button className="w-full bg-[#dd0031] hover:bg-[#b00027] text-white font-bold h-14 rounded-xl shadow-lg shadow-red-600/30 text-sm tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98]">
                       <ShoppingCart className="w-4 h-4 mr-2" />
                       PROCEED TO CHECKOUT
                   </Button>
               </div>
           </div>
       </div>
    </div>
  )
}
