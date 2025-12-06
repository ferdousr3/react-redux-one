import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/store/store'
import { fetchCars, createCar, addCarPart, uploadImage } from '@/store/slices/carSlice'
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
import { Plus, Car, Upload, Settings } from 'lucide-react'
import { toast } from 'sonner'

export function CarsManagement() {
   const dispatch = useDispatch<AppDispatch>()
   const { cars, loading } = useSelector((state: RootState) => state.car)
   const [isCreateCarOpen, setIsCreateCarOpen] = useState(false)
   const [isAddPartOpen, setIsAddPartOpen] = useState(false)
   const [selectedCarId, setSelectedCarId] = useState<string | null>(null)
   const [uploading, setUploading] = useState(false)

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

   // Add Part Form State
   const [partForm, setPartForm] = useState({
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

      setUploading(true)
      try {
         const url = await dispatch(uploadImage(file)).unwrap()
         if (type === 'car') {
            setCarForm((prev) => ({ ...prev, imageUrl: url }))
         } else {
            setPartForm((prev) => ({ ...prev, imageUrl: url }))
         }
         toast.success('Image uploaded successfully')
      } catch (error) {
         toast.error('Failed to upload image')
      } finally {
         setUploading(false)
      }
   }

   const handleCreateCar = async (e: React.FormEvent) => {
      e.preventDefault()
      try {
         await dispatch(createCar({
            ...carForm,
            year: Number(carForm.year),
         })).unwrap()
         toast.success('Car created successfully')
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
      } catch (error) {
         toast.error('Failed to create car')
      }
   }

   const handleAddPart = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!selectedCarId) return

      try {
         await dispatch(addCarPart({
            carId: selectedCarId,
            ...partForm,
            partType: partForm.partType as any,
         })).unwrap()
         toast.success('Part added successfully')
         setIsAddPartOpen(false)
         setPartForm({
            partType: 'engine',
            partName: '',
            price: '',
            description: '',
            imageUrl: '',
         })
      } catch (error) {
         toast.error('Failed to add part')
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
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                     <Plus className="mr-2 h-4 w-4" /> Add Car
                  </Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                     <DialogTitle>Create New Car</DialogTitle>
                     <DialogDescription>
                        Add a new basic car model. You can add parts later.
                     </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateCar} className="space-y-4 py-4">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label htmlFor="brand">Brand</Label>
                           <Input
                              id="brand"
                              value={carForm.brand}
                              onChange={(e) => setCarForm({ ...carForm, brand: e.target.value })}
                              required
                           />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="model">Model</Label>
                           <Input
                              id="model"
                              value={carForm.model}
                              onChange={(e) => setCarForm({ ...carForm, model: e.target.value })}
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
                           <Label htmlFor="price">Base Price</Label>
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
                        <Label htmlFor="description">Description</Label>
                        <Input
                           id="description"
                           value={carForm.description}
                           onChange={(e) => setCarForm({ ...carForm, description: e.target.value })}
                        />
                     </div>
                     <div className="space-y-2">
                        <Label>Car Image</Label>
                        <div className="flex items-center gap-4">
                           <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, 'car')}
                              className="cursor-pointer"
                           />
                           {uploading && <span className="text-sm text-muted-foreground">Uploading...</span>}
                        </div>
                        {carForm.imageUrl && (
                           <img src={carForm.imageUrl} alt="Preview" className="h-20 w-auto rounded object-cover" />
                        )}
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="modelUrl">3D Model URL (GLB/GLTF)</Label>
                        <Input
                           id="modelUrl"
                           value={carForm.modelUrl}
                           onChange={(e) => setCarForm({ ...carForm, modelUrl: e.target.value })}
                           placeholder="/models/my-car.glb"
                        />
                     </div>
                     <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={uploading}>
                        Create Car
                     </Button>
                  </form>
               </DialogContent>
            </Dialog>
         </div>

         {loading ? (
            <div className="flex items-center justify-center py-8">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {cars.map((car) => (
                  <div key={car.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
                     <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                           <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                              <Car className="h-5 w-5 text-emerald-600" />
                           </div>
                           <div>
                              <h3 className="font-semibold text-gray-900">{car.brand} {car.model}</h3>
                              <p className="text-sm text-gray-500">{car.year}</p>
                           </div>
                        </div>
                     </div>

                     <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
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
                        <span className="font-semibold">${Number(car.basePrice).toLocaleString()}</span>
                     </div>

                     <Dialog open={isAddPartOpen && selectedCarId === car.id} onOpenChange={(open) => {
                        setIsAddPartOpen(open)
                        if (!open) setSelectedCarId(null)
                     }}>
                        <DialogTrigger asChild>
                           <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => {
                                 setSelectedCarId(car.id)
                                 setIsAddPartOpen(true)
                              }}
                           >
                              <Settings className="mr-2 h-4 w-4" /> Configure Parts
                           </Button>
                        </DialogTrigger>
                        <DialogContent>
                           <DialogHeader>
                              <DialogTitle>Add Part to {car.brand} {car.model}</DialogTitle>
                           </DialogHeader>
                           <form onSubmit={handleAddPart} className="space-y-4 py-4">
                              <div className="space-y-2">
                                 <Label>Part Type</Label>
                                 <Select
                                    value={partForm.partType}
                                    onValueChange={(val) => setPartForm({ ...partForm, partType: val })}
                                 >
                                    <SelectTrigger>
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
                                 <Label htmlFor="partName">Part Name</Label>
                                 <Input
                                    id="partName"
                                    value={partForm.partName}
                                    onChange={(e) => setPartForm({ ...partForm, partName: e.target.value })}
                                    required
                                 />
                              </div>
                              <div className="space-y-2">
                                 <Label htmlFor="partPrice">Price</Label>
                                 <Input
                                    id="partPrice"
                                    type="number"
                                    step="0.01"
                                    value={partForm.price}
                                    onChange={(e) => setPartForm({ ...partForm, price: e.target.value })}
                                    required
                                 />
                              </div>
                              <div className="space-y-2">
                                 <Label>Part Image</Label>
                                 <div className="flex items-center gap-4">
                                    <Input
                                       type="file"
                                       accept="image/*"
                                       onChange={(e) => handleImageUpload(e, 'part')}
                                       className="cursor-pointer"
                                    />
                                    {uploading && <span className="text-sm text-muted-foreground">Uploading...</span>}
                                 </div>
                                 {partForm.imageUrl && (
                                    <img src={partForm.imageUrl} alt="Preview" className="h-20 w-auto rounded object-cover" />
                                 )}
                              </div>
                              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={uploading}>
                                 Add Part
                              </Button>
                           </form>
                        </DialogContent>
                     </Dialog>
                  </div>
               ))}
            </div>
         )}
      </div>
   )
}
