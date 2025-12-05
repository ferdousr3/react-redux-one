import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { lawyerApi } from '../api/lawyer.api'
import { Lawyer, LawyerDto, LawyerQuery, LawyerStatus } from '../models/lawyer.model'
import { toast } from '@/lib/utils/toast.service'

interface LawyerState {
   lawyers: Lawyer[]
   selectedLawyer: Lawyer | null
   loading: boolean
   error: string | null
   query: LawyerQuery
   total: number
   isUploading: boolean
}

const initialState: LawyerState = {
   lawyers: [],
   selectedLawyer: null,
   loading: false,
   error: null,
   query: {
      search: '',
      page: 1,
      size: 10,
      orderBy: 'createdAt',
      orderDirection: 'desc',
   },
   total: 0,
   isUploading: false,
}

// Async thunks
export const fetchLawyers = createAsyncThunk(
   'lawyers/fetchAll',
   async (query: Partial<LawyerQuery>, { rejectWithValue }) => {
      try {
         const response = await lawyerApi.getAllLawyers({ ...initialState.query, ...query })
         return response
      } catch (error: any) {
         toast.error('Failed to load lawyers', error.message)
         return rejectWithValue(error.message)
      }
   }
)

export const fetchLawyer = createAsyncThunk(
   'lawyers/fetchOne',
   async (id: string, { rejectWithValue }) => {
      try {
         const response = await lawyerApi.getLawyer(id)
         return response
      } catch (error: any) {
         toast.error('Failed to load lawyer', error.message)
         return rejectWithValue(error.message)
      }
   }
)

export const createLawyer = createAsyncThunk(
   'lawyers/create',
   async (data: LawyerDto, { rejectWithValue }) => {
      try {
         const response = await lawyerApi.createLawyer(data)
         toast.success('Lawyer created successfully')
         return response
      } catch (error: any) {
         toast.error('Failed to create lawyer', error.message)
         return rejectWithValue(error.message)
      }
   }
)

export const updateLawyer = createAsyncThunk(
   'lawyers/update',
   async ({ id, data }: { id: string; data: Partial<Lawyer> }, { rejectWithValue }) => {
      try {
         const response = await lawyerApi.updateLawyer(id, data)
         toast.success('Lawyer updated successfully')
         return response
      } catch (error: any) {
         toast.error('Failed to update lawyer', error.message)
         return rejectWithValue(error.message)
      }
   }
)

export const deleteLawyer = createAsyncThunk(
   'lawyers/delete',
   async (id: string, { rejectWithValue }) => {
      try {
         await lawyerApi.deleteLawyer(id)
         toast.success('Lawyer deleted successfully')
         return id
      } catch (error: any) {
         toast.error('Failed to delete lawyer', error.message)
         return rejectWithValue(error.message)
      }
   }
)

export const updateProfilePicture = createAsyncThunk(
   'lawyers/updateProfilePicture',
   async ({ id, url }: { id: string; url: string }, { rejectWithValue }) => {
      try {
         const response = await lawyerApi.updateProfilePicture(id, url)
         toast.success('Profile picture updated')
         return response
      } catch (error: any) {
         toast.error('Failed to update profile picture', error.message)
         return rejectWithValue(error.message)
      }
   }
)

// Slice
const lawyerSlice = createSlice({
   name: 'lawyers',
   initialState,
   reducers: {
      setQuery: (state, action: PayloadAction<Partial<LawyerQuery>>) => {
         state.query = { ...state.query, ...action.payload }
      },
      setSelectedLawyer: (state, action: PayloadAction<Lawyer | null>) => {
         state.selectedLawyer = action.payload
      },
      clearError: (state) => {
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         // Fetch all lawyers
         .addCase(fetchLawyers.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchLawyers.fulfilled, (state, action) => {
            state.loading = false
            state.lawyers = action.payload.data
            state.total = action.payload.pagination?.total || 0
         })
         .addCase(fetchLawyers.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
         // Fetch single lawyer
         .addCase(fetchLawyer.pending, (state) => {
            state.loading = true
         })
         .addCase(fetchLawyer.fulfilled, (state, action) => {
            state.loading = false
            state.selectedLawyer = action.payload.data
         })
         .addCase(fetchLawyer.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
         // Create lawyer
         .addCase(createLawyer.pending, (state) => {
            state.loading = true
         })
         .addCase(createLawyer.fulfilled, (state, action) => {
            state.loading = false
            state.lawyers = [action.payload.data, ...state.lawyers]
         })
         .addCase(createLawyer.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
         // Update lawyer
         .addCase(updateLawyer.pending, (state) => {
            state.loading = true
         })
         .addCase(updateLawyer.fulfilled, (state, action) => {
            state.loading = false
            const index = state.lawyers.findIndex((l) => l.id === action.payload.data.id)
            if (index !== -1) {
               state.lawyers[index] = action.payload.data
            }
            if (state.selectedLawyer?.id === action.payload.data.id) {
               state.selectedLawyer = action.payload.data
            }
         })
         .addCase(updateLawyer.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
         // Delete lawyer
         .addCase(deleteLawyer.pending, (state) => {
            state.loading = true
         })
         .addCase(deleteLawyer.fulfilled, (state, action) => {
            state.loading = false
            state.lawyers = state.lawyers.filter((l) => l.id !== action.payload)
         })
         .addCase(deleteLawyer.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
         // Update profile picture
         .addCase(updateProfilePicture.pending, (state) => {
            state.isUploading = true
         })
         .addCase(updateProfilePicture.fulfilled, (state, action) => {
            state.isUploading = false
            const index = state.lawyers.findIndex((l) => l.id === action.payload.data.id)
            if (index !== -1) {
               state.lawyers[index] = action.payload.data
            }
            if (state.selectedLawyer?.id === action.payload.data.id) {
               state.selectedLawyer = action.payload.data
            }
         })
         .addCase(updateProfilePicture.rejected, (state) => {
            state.isUploading = false
         })
   },
})

export const { setQuery, setSelectedLawyer, clearError } = lawyerSlice.actions
export default lawyerSlice.reducer
