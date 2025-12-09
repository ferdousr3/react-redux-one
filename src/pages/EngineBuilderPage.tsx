import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Trash2, Save, Upload, Copy, Check } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

interface Hotspot {
    id: string
    name: string
    x: number
    y: number
    price?: string
    image?: string
    description?: string
}

export function EngineBuilderPage() {
    const [imageUrl, setImageUrl] = useState("https://i.ibb.co.com/mJsMrwW/engine-main.png") // Default placeholder
    const [hotspots, setHotspots] = useState<Hotspot[]>([])
    const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(null)
    const imageRef = useRef<HTMLImageElement>(null)

    const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
        if (!imageRef.current) return

        const rect = imageRef.current.getBoundingClientRect()
        // Calculate coordinate relative to image center (0,0 is center)
        // normalized to range roughly -2 to +2 based on standard 3D plane scaling
        // BUT for 2D image overlay, simpler 0-1 or percentage is easier?
        // Wait, EngineScene uses 3D coordinates on a 4x3 Plane.
        // X range: approx -2 to +2
        // Y range: approx -1.5 to +1.5

        const xPx = e.clientX - rect.left
        const yPx = e.clientY - rect.top

        // Convert to UV (0 to 1)
        const u = xPx / rect.width
        const v = yPx / rect.height

        // Convert to Scene Coordinates (Plane is 4 wide, 3 tall)
        const sceneX = (u - 0.5) * 4
        const sceneY = -(v - 0.5) * 3 // Invert Y because screen Y is down, 3D Y is up

        const newHotspot: Hotspot = {
            id: crypto.randomUUID(),
            name: "New Part",
            x: Number(sceneX.toFixed(2)),
            y: Number(sceneY.toFixed(2))
        }

        setHotspots([...hotspots, newHotspot])
        setSelectedHotspotId(newHotspot.id)
    }

    const updateHotspot = (id: string, field: keyof Hotspot, value: string | number) => {
        setHotspots(hotspots.map(h => h.id === id ? { ...h, [field]: value } : h))
    }

    const deleteHotspot = (id: string) => {
        setHotspots(hotspots.filter(h => h.id !== id))
        if (selectedHotspotId === id) setSelectedHotspotId(null)
    }

    const selectedHotspot = hotspots.find(h => h.id === selectedHotspotId)

    const exportConfig = () => {
        const output = {
            imageUrl,
            parts: hotspots.map(h => ({
                part: h.name,
                x: h.x,
                y: h.y,
                details: {
                    price: h.price,
                    image: h.image,
                    description: h.description
                }
            }))
        }
        navigator.clipboard.writeText(JSON.stringify(output, null, 2))
        toast.success("Configuration copied to clipboard!")
    }

    return (
        <div className="min-h-screen bg-black text-white pt-20 pb-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Header & Controls */}
                <div className="lg:col-span-3 flex justify-between items-center border-b border-white/10 pb-6">
                    <div>
                         <h1 className="text-3xl font-bold mb-2">Engine Scene Generator</h1>
                         <p className="text-gray-400">Click on the image to place interactive hotspots.</p>
                    </div>
                   <Button onClick={exportConfig} className="gap-2 bg-green-600 hover:bg-green-700">
                        <Copy className="w-4 h-4" /> Export JSON
                   </Button>
                </div>

                {/* Left: Image Canvas */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex gap-4">
                        <input
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-sm"
                            placeholder="Enter Main Engine Image URL"
                        />
                    </div>

                    <div className="relative border border-white/20 rounded-lg overflow-hidden bg-gray-900 aspect-[4/3] group cursor-crosshair">
                        {imageUrl && (
                            <img
                                ref={imageRef}
                                src={imageUrl}
                                alt="Engine Base"
                                className="w-full h-full object-fill pointer-events-auto"
                                onClick={handleImageClick}
                            />
                        )}

                        {/* Render Overlay Hotspots for preview */}
                        {hotspots.map(h => {
                            // Convert back to % for DOM overlay placement
                            // X = (sceneX / 4) + 0.5
                            // Y = -(sceneY / 3) + 0.5
                            const left = ((h.x / 4) + 0.5) * 100
                            const top = ((-h.y / 3) + 0.5) * 100

                            const isSelected = selectedHotspotId === h.id

                            return (
                                <div
                                    key={h.id}
                                    style={{ left: `${left}%`, top: `${top}%` }}
                                    className={`absolute w-4 h-4 -ml-2 -mt-2 rounded-full border-2 cursor-pointer transition-all ${isSelected ? 'bg-red-500 border-white scale-125 z-10' : 'bg-white/50 border-white hover:bg-white'}`}
                                    onClick={(e) => { e.stopPropagation(); setSelectedHotspotId(h.id)}}
                                >
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/80 px-2 py-1 text-xs rounded whitespace-nowrap pointer-events-none">
                                        {h.name}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Right: Properties Panel */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-fit sticky top-24">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        {selectedHotspot ? 'Edit Hotspot' : 'Select a Hotspot'}
                    </h2>

                    {selectedHotspot ? (
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Part Name</label>
                                <input
                                    className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-sm"
                                    value={selectedHotspot.name}
                                    onChange={(e) => updateHotspot(selectedHotspot.id, 'name', e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                     <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Coordinates (X)</label>
                                     <input className="w-full bg-black/60 border border-white/5 rounded px-3 py-2 text-xs text-gray-400 cursor-not-allowed" readOnly value={selectedHotspot.x} />
                                </div>
                                <div>
                                     <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Coordinates (Y)</label>
                                     <input className="w-full bg-black/60 border border-white/5 rounded px-3 py-2 text-xs text-gray-400 cursor-not-allowed" readOnly value={selectedHotspot.y} />
                                </div>
                            </div>

                            <hr className="border-white/10 my-2"/>

                            <div>
                                <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Connector Image URL</label>
                                <div className="flex gap-2">
                                     <input
                                        className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-sm"
                                        value={selectedHotspot.image || ''}
                                        onChange={(e) => updateHotspot(selectedHotspot.id, 'image', e.target.value)}
                                        placeholder="https://..."
                                    />
                                </div>
                                {selectedHotspot.image && (
                                    <div className="mt-2 text-center">
                                         <img src={selectedHotspot.image} className="h-20 mx-auto rounded border border-white/10" alt="Preview"/>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Description</label>
                                <textarea
                                    className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-sm min-h-[80px]"
                                    value={selectedHotspot.description || ''}
                                    onChange={(e) => updateHotspot(selectedHotspot.id, 'description', e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Price</label>
                                <input
                                    className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-sm"
                                    value={selectedHotspot.price || ''}
                                    onChange={(e) => updateHotspot(selectedHotspot.id, 'price', e.target.value)}
                                    placeholder="$0.00"
                                />
                            </div>

                            <Button onClick={() => deleteHotspot(selectedHotspot.id)} variant="destructive" className="w-full mt-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20">
                                <Trash2 className="w-4 h-4 mr-2"/> Delete Point
                            </Button>
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500 space-y-2">
                            <Plus className="w-10 h-10 mx-auto opacity-20"/>
                            <p>Click anywhere on the image to add a new part marker.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
