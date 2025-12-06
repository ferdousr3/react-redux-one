import { useSelector, useDispatch } from 'react-redux'
import { selectPart, removePart } from '@/store/slices/carSlice'
import type { RootState } from '@/store'
import type { CarPart } from '@/store/slices/carSlice'

export function PartSelector() {
   const { availableParts, selectedParts } = useSelector((state: RootState) => state.car)
   const dispatch = useDispatch()

   const partTypes: Array<keyof typeof selectedParts> = ['engine', 'wheels', 'doors', 'paint', 'interior']

   const getPartsByType = (type: string) => {
      return availableParts.filter((part) => part.partType === type)
   }

   return (
      <div className="parts-selector bg-white rounded-lg shadow-lg p-6 max-h-[600px] overflow-y-auto">
         <h2 className="text-2xl font-bold mb-6">Customize Your Car</h2>

         {partTypes.map((type) => {
            const parts = getPartsByType(type)
            if (parts.length === 0) return null

            return (
               <div key={type} className="part-category mb-6">
                  <h3 className="text-xl font-semibold mb-3 capitalize flex items-center justify-between">
                     {type}
                     {selectedParts[type] && (
                        <button
                           onClick={() => dispatch(removePart(type))}
                           className="text-sm text-red-500 hover:text-red-700"
                        >
                           Remove
                        </button>
                     )}
                  </h3>

                  <div className="parts-grid grid grid-cols-2 gap-3">
                     {parts.map((part: CarPart) => (
                        <div
                           key={part.id}
                           className={`part-card border-2 rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                              selectedParts[type]?.id === part.id
                                 ? 'border-blue-500 bg-blue-50'
                                 : 'border-gray-200 hover:border-blue-300'
                           }`}
                           onClick={() => dispatch(selectPart({ type, part }))}
                        >
                           {part.imageUrl && (
                              <img
                                 src={part.imageUrl}
                                 alt={part.partName}
                                 className="w-full h-24 object-cover rounded mb-2"
                              />
                           )}
                           <h4 className="font-medium text-sm">{part.partName}</h4>
                           <p className="text-green-600 font-semibold">${part.price}</p>
                           {part.description && (
                              <p className="text-xs text-gray-500 mt-1">{part.description}</p>
                           )}
                        </div>
                     ))}
                  </div>
               </div>
            )
         })}

         {availableParts.length === 0 && (
            <p className="text-gray-500 text-center py-8">
               No parts available for this car yet.
            </p>
         )}
      </div>
   )
}
