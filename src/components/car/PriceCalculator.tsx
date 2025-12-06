import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { RootState } from '@/store'

export function PriceCalculator() {
   const { selectedCar, selectedParts, totalPrice } = useSelector((state: RootState) => state.car)
   const priceRef = useRef<HTMLDivElement>(null)
   const prevPriceRef = useRef(totalPrice)

   useEffect(() => {
      // Animate price change
      if (priceRef.current && prevPriceRef.current !== totalPrice) {
         gsap.fromTo(
            priceRef.current,
            { scale: 1 },
            {
               scale: 1.1,
               duration: 0.2,
               yoyo: true,
               repeat: 1,
               ease: 'power2.inOut',
            }
         )
         prevPriceRef.current = totalPrice
      }
   }, [totalPrice])

   if (!selectedCar) {
      return (
         <div className="price-calculator bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-500">Select a car to see pricing</p>
         </div>
      )
   }

   return (
      <div className="price-calculator bg-white rounded-lg shadow-lg p-6">
         <h3 className="text-xl font-bold mb-4">Price Breakdown</h3>

         <div className="space-y-3">
            <div className="price-item flex justify-between items-center pb-2 border-b">
               <span className="text-gray-700">Base Price:</span>
               <span className="font-semibold">${selectedCar.basePrice}</span>
            </div>

            {Object.entries(selectedParts).map(([type, part]) =>
               part ? (
                  <div key={type} className="price-item flex justify-between items-center text-sm">
                     <span className="text-gray-600">{part.partName}:</span>
                     <span className="text-green-600">+${part.price}</span>
                  </div>
               ) : null
            )}
         </div>

         <div
            ref={priceRef}
            className="total-price mt-6 pt-4 border-t-2 border-gray-300 flex justify-between items-center"
         >
            <span className="text-xl font-bold">Total:</span>
            <span className="text-2xl font-bold text-blue-600">
               ${totalPrice.toFixed(2)}
            </span>
         </div>

         <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            Save Configuration
         </button>
      </div>
   )
}
