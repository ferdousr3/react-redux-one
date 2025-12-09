import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/store/store'
import { fetchCars, createCar, uploadImage, CarPart } from '@/store/slices/carSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select'
import { Plus, Car, Upload, Trash2, Box } from 'lucide-react'
import { toast } from 'sonner'
import { ScrollArea } from '@/components/ui/scroll-area'

export function CarsManagement() {
   const dispatch = useDispatch<AppDispatch>()
   const { cars, loading } = useSelector((state: RootState) => state.car)
   const [isCreateCarOpen, setIsCreateCarOpen] = useState(false)
   const [uploading, setUploading] = useState(false)
   const [partUploading, setPartUploading] = useState(false)

   // Create Car Form State
   const [carForm, setCarForm] = useState({
      name: '',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      basePrice: '',
      description: '',
      imageUrl: '',
      modelUrl: '',
   })

   // Local Parts State for Creation
   const [partsList, setPartsList] = useState<Partial<CarPart>[]>([])

   // Temporary Part Form State
   const [tempPart, setTempPart] = useState({
      partType: 'engine',
      partName: '',
      price: '',
      description: '',
      imageUrl: '',
   })

   useEffect(() => {
      dispatch(fetchCars())
   }, [dispatch])

   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'car' | 'part') => {
      const file = e.target.files?.[0]
      if (!file) return

      if (file.size > 5 * 1024 * 1024) {
         toast.error('File size too large (max 5MB)')
         return
      }

      const setLoading = type === 'car' ? setUploading : setPartUploading
      setLoading(true)

      try {
         const url = await dispatch(uploadImage(file)).unwrap()
         if (type === 'car') {
            setCarForm((prev) => ({ ...prev, imageUrl: url }))
         } else {
            setTempPart((prev) => ({ ...prev, imageUrl: url }))
         }
         toast.success('Image uploaded successfully')
      } catch (error) {
         toast.error('Failed to upload image')
      } finally {
         setLoading(false)
      }
   }

   const handleAddTempPart = () => {
      if (!tempPart.partName || !tempPart.price) {
         toast.error('Part name and price are required')
         return
      }
      setPartsList([...partsList, { ...tempPart, partType: tempPart.partType as any }])
      // Reset temp part
      setTempPart({
         partType: 'engine',
         partName: '',
         price: '',
         description: '',
         imageUrl: '',
      })
   }

   const handleRemoveTempPart = (index: number) => {
      const newParts = [...partsList]
      newParts.splice(index, 1)
      setPartsList(newParts)
   }

   const handleCreateCar = async (e: React.FormEvent) => {
      e.preventDefault()
      try {
         await dispatch(createCar({
            ...carForm,
            year: Number(carForm.year),
            parts: partsList
         })).unwrap()

         toast.success('Car and parts created successfully')
         setIsCreateCarOpen(false)
         dispatch(fetchCars())
         // Reset form
         setCarForm({
            name: '',
            brand: '',
            model: '',
            year: new Date().getFullYear(),
            basePrice: '',
            description: '',
            imageUrl: '',
            modelUrl: '',
         })
         setPartsList([])
      } catch (error) {
         toast.error('Failed to create car')
      }
   }

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h2 className="text-3xl font-bold tracking-tight">Cars Management</h2>
               <p className="text-muted-foreground">
                  Manage your cars and their configurable parts
               </p>
            </div>
            <Dialog open={isCreateCarOpen} onOpenChange={setIsCreateCarOpen}>
               <DialogTrigger asChild>
                  <Button className="bg-[#dd0031] hover:bg-[#b00027]">
                     <Plus className="mr-2 h-4 w-4" /> Add Car
                  </Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                     <DialogTitle>Create New Car Payload</DialogTitle>
                     <DialogDescription>
                        Define the base car and add its specific configuration parts.
                     </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateCar} className="space-y-6 py-4">

                     {/* Car Details Section */}
                     <div className="space-y-4 border-b border-gray-100 pb-6">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                           <Car className="w-4 h-4"/> Vehicle Details
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <Label htmlFor="brand">Brand</Label>
                              <Input
                                 id="brand"
                                 value={carForm.brand}
                                 onChange={(e) => setCarForm({ ...carForm, brand: e.target.value })}
                                 placeholder="e.g. Ford"
                                 required
                              />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="model">Model</Label>
                              <Input
                                 id="model"
                                 value={carForm.model}
                                 onChange={(e) => setCarForm({ ...carForm, model: e.target.value })}
                                 placeholder="e.g. Mustang"
                                 required
                              />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="name">Display Name</Label>
                           <Input
                              id="name"
                              value={carForm.name}
                              onChange={(e) => setCarForm({ ...carForm, name: e.target.value })}
                              placeholder="e.g. Ford Mustang GT 2024"
                              required
                           />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <Label htmlFor="year">Year</Label>
                              <Input
                                 id="year"
                                 type="number"
                                 value={carForm.year}
                                 onChange={(e) => setCarForm({ ...carForm, year: Number(e.target.value) })}
                                 required
                              />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="price">Base Price ($)</Label>
                              <Input
                                 id="price"
                                 type="number"
                                 step="0.01"
                                 value={carForm.basePrice}
                                 onChange={(e) => setCarForm({ ...carForm, basePrice: e.target.value })}
                                 required
                              />
                           </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Car Image</Label>
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, 'car')}
                                        className="cursor-pointer"
                                    />
                                </div>
                                {carForm.imageUrl && (
                                    <img src={carForm.imageUrl} alt="Preview" className="h-10 w-16 rounded object-cover border border-gray-200" />
                                )}
                            </div>
                            {uploading && <span className="text-xs text-[#dd0031] animate-pulse">Uploading car image...</span>}
                        </div>
                     </div>

                     {/* Parts Section */}
                     <div className="space-y-4">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                           <Box className="w-4 h-4"/> Configure Parts
                        </h3>

                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-4">
                           <div className="grid grid-cols-3 gap-3">
                              <div className="space-y-2">
                                 <Label className="text-xs">Type</Label>
                                 <Select
                                    value={tempPart.partType}
                                    onValueChange={(val) => setTempPart({ ...tempPart, partType: val })}
                                 >
                                    <SelectTrigger className="h-8">
                                       <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                       <SelectItem value="engine">Engine</SelectItem>
                                       <SelectItem value="wheel">Wheel</SelectItem>
                                       <SelectItem value="door">Door</SelectItem>
                                       <SelectItem value="paint">Paint</SelectItem>
                                       <SelectItem value="interior">Interior</SelectItem>
                                    </SelectContent>
                                 </Select>
                              </div>
                              <div className="space-y-2">
                                 <Label className="text-xs">Name</Label>
                                 <Input
                                    className="h-8"
                                    value={tempPart.partName}
                                    onChange={(e) => setTempPart({...tempPart, partName: e.target.value})}
                                    placeholder="e.g. V8 Engine"
                                 />
                              </div>
                              <div className="space-y-2">
                                 <Label className="text-xs">Price ($)</Label>
                                 <Input
                                    className="h-8"
                                    type="number"
                                    value={tempPart.price}
                                    onChange={(e) => setTempPart({...tempPart, price: e.target.value})}
                                    placeholder="5000"
                                 />
                              </div>
                           </div>

                           <div className="space-y-2">
                                <Label className="text-xs">Part Image</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, 'part')}
                                        className="cursor-pointer h-8 text-xs"
                                    />
                                    {tempPart.imageUrl && (
                                        <img src={tempPart.imageUrl} alt="Part Preview" className="h-8 w-12 rounded object-cover border border-gray-200" />
                                    )}
                                </div>
                                {partUploading && <span className="text-xs text-[#dd0031] animate-pulse">Uploading part image...</span>}
                           </div>

                           <Button
                                type="button"
                                size="sm"
                                className="w-full bg-gray-900 hover:bg-black"
                                onClick={handleAddTempPart}
                                disabled={partUploading}
                            >
                                <Plus className="w-3 h-3 mr-1" /> Add Part to List
                           </Button>
                        </div>

                        {/* Parts List Preview */}
                        {partsList.length > 0 && (
                            <ScrollArea className="h-[150px] border border-gray-100 rounded-lg p-2">
                                {partsList.map((part, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded group">
                                        <div className="flex items-center gap-3">
                                            {part.imageUrl ? (
                                                <img src={part.imageUrl} className="w-8 h-8 rounded object-cover" />
                                            ) : (
                                                <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center">
                                                    <Box className="w-4 h-4 text-gray-500"/>
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{part.partName}</p>
                                                <p className="text-xs text-gray-500 capitalize">{part.partType} • ${part.price}</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTempPart(index)}
                                            className="text-gray-400 hover:text-red-500"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </ScrollArea>
                        )}
                     </div>

                     <Button type="submit" className="w-full bg-[#dd0031] hover:bg-[#b00027]" disabled={uploading}>
                        Create Vehicle & {partsList.length} Parts
                     </Button>
                  </form>
               </DialogContent>
            </Dialog>
         </div>

         {loading ? (
            <div className="flex items-center justify-center py-8">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#dd0031]"></div>
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {cars.map((car) => (
                  <div key={car.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-xl hover:border-red-100 transition-all">
                     <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                           <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center">
                              <Car className="h-5 w-5 text-[#dd0031]" />
                           </div>
                           <div>
                              <h3 className="font-semibold text-gray-900">{car.brand} {car.model}</h3>
                              <p className="text-sm text-gray-500">{car.year}</p>
                           </div>
                        </div>
                     </div>

                     <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
                        {car.imageUrl ? (
                           <img src={car.imageUrl} alt={car.name} className="w-full h-full object-cover" />
                        ) : (
                           <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Car className="h-12 w-12" />
                           </div>
                        )}
                     </div>

                     <div className="flex items-center justify-between text-sm mb-4">
                        <span className="text-gray-500">Base Price</span>
                        <span className="font-bold text-gray-900">${Number(car.basePrice).toLocaleString()}</span>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
   )
}
