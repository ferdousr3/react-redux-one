import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Types
export interface Car {
   id: string
   name: string
   brand: string
   model: string
   year: number
   basePrice: string
   description?: string
   imageUrl?: string
   modelUrl?: string
   createdAt: string
   updatedAt: string
}

export interface CarPart {
   id: string
   carId: string
   partType: 'engine' | 'wheel' | 'door' | 'paint' | 'interior'
   partName: string
   price: string
   description?: string
   imageUrl?: string
   specifications?: Record<string, any>
}

export interface CarWithParts extends Car {
   parts: CarPart[]
   totalPrice?: string
}

export interface SelectedParts {
   engine: CarPart | null
   wheels: CarPart | null
   doors: CarPart | null
   paint: CarPart | null
   interior: CarPart | null
}

interface CarState {
   cars: Car[]
   selectedCar: CarWithParts | null
   selectedParts: SelectedParts
   availableParts: CarPart[]
   totalPrice: number
   loading: boolean
   error: string | null
}

const initialState: CarState = {
   cars: [],
   selectedCar: null,
   selectedParts: {
      engine: null,
      wheels: null,
      doors: null,
      paint: null,
      interior: null,
   },
   availableParts: [],
   totalPrice: 0,
   loading: false,
   error: null,
}

// Async Thunks
export const fetchCars = createAsyncThunk('car/fetchCars', async () => {
   const response = await axios.get(`${API_URL}/v1/cars`)
   return response.data.data
})

export const fetchCarById = createAsyncThunk('car/fetchCarById', async (id: string) => {
   const response = await axios.get(`${API_URL}/v1/cars/${id}`)
   return response.data.data
})

export const createCar = createAsyncThunk(
   'car/createCar',
   async (carData: Partial<Car>, { getState, rejectWithValue }) => {
      try {
         const state = getState() as { auth: { token: string } }
         const response = await axios.post(`${API_URL}/v1/cars`, carData, {
            headers: {
               Authorization: `Bearer ${state.auth.token}`,
            },
         })
         return response.data.data
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to create car')
      }
   }
)

export const addCarPart = createAsyncThunk(
   'car/addCarPart',
   async (partData: Omit<CarPart, 'id'>, { getState, rejectWithValue }) => {
      try {
         const state = getState() as { auth: { token: string } }
         const response = await axios.post(`${API_URL}/v1/cars/parts`, partData, {
            headers: {
               Authorization: `Bearer ${state.auth.token}`,
            },
         })
         return response.data.data
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to add car part')
      }
   }
)

export const uploadImage = createAsyncThunk(
   'car/uploadImage',
   async (file: File, { getState, rejectWithValue }) => {
      try {
         const state = getState() as { auth: { token: string } }
         const formData = new FormData()
         formData.append('image', file)

         const response = await axios.post(`${API_URL}/v1/upload/image`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
               Authorization: `Bearer ${state.auth.token}`,
            },
         })
         return response.data.data.url
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Upload failed')
      }
   }
)

// Slice
const carSlice = createSlice({
   name: 'car',
   initialState,
   reducers: {
      selectCar: (state, action: PayloadAction<CarWithParts>) => {
         state.selectedCar = action.payload
         state.totalPrice = Number.parseFloat(action.payload.basePrice)
         // Reset selected parts when changing cars
         state.selectedParts = {
            engine: null,
            wheels: null,
            doors: null,
            paint: null,
            interior: null,
         }
      },
      selectPart: (state, action: PayloadAction<{ type: keyof SelectedParts; part: CarPart }>) => {
         const { type, part } = action.payload
         state.selectedParts[type] = part

         // Recalculate total price
         let total = state.selectedCar ? Number.parseFloat(state.selectedCar.basePrice) : 0
         Object.values(state.selectedParts).forEach((selectedPart) => {
            if (selectedPart) {
               total += Number.parseFloat(selectedPart.price)
            }
         })
         state.totalPrice = total
      },
      removePart: (state, action: PayloadAction<keyof SelectedParts>) => {
         state.selectedParts[action.payload] = null

         // Recalculate total price
         let total = state.selectedCar ? Number.parseFloat(state.selectedCar.basePrice) : 0
         Object.values(state.selectedParts).forEach((selectedPart) => {
            if (selectedPart) {
               total += Number.parseFloat(selectedPart.price)
            }
         })
         state.totalPrice = total
      },
      clearSelection: (state) => {
         state.selectedCar = null
         state.selectedParts = {
            engine: null,
            wheels: null,
            doors: null,
            paint: null,
            interior: null,
         }
         state.totalPrice = 0
      },
   },
   extraReducers: (builder) => {
      builder
         // Fetch Cars
         .addCase(fetchCars.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchCars.fulfilled, (state, action) => {
            state.loading = false
            state.cars = action.payload
         })
         .addCase(fetchCars.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch cars'
         })
         // Fetch Car by ID
         .addCase(fetchCarById.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchCarById.fulfilled, (state, action) => {
            state.loading = false
            state.selectedCar = action.payload
            state.availableParts = action.payload.parts || []
            state.totalPrice = Number.parseFloat(action.payload.basePrice)
         })
         .addCase(fetchCarById.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to fetch car'
         })
   },
})

export const { selectCar, selectPart, removePart, clearSelection } = carSlice.actions
export default carSlice.reducer
