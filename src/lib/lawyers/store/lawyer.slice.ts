import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { lawyerApi } from '../api/lawyer.api'
import { Lawyer, LawyerDto, LawyerQuery } from '../models/lawyer.model'

interface LawyerState {
   lawyers: Lawyer[]
   selectedLawyer: Lawyer | null
   loading: boolean
   creating: boolean
   updating: boolean
   deleting: string | null
   error: string | null
   query: LawyerQuery
   total: number
   isUploading: boolean
   initialized: boolean
}

const initialState: LawyerState = {
   lawyers: [],
   selectedLawyer: null,
   loading: false,
   creating: false,
   updating: false,
   deleting: null,
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
   initialized: false,
}

// Async thunks
export const fetchLawyers = createAsyncThunk(
   'lawyers/fetchAll',
   async (query: Partial<LawyerQuery> = {}, { rejectWithValue }) => {
      try {
         const response = await lawyerApi.getAllLawyers({ ...initialState.query, ...query })
         return response
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to load lawyers')
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
         return rejectWithValue(error.response?.data?.message || 'Failed to load lawyer')
      }
   }
)

export const createLawyer = createAsyncThunk(
   'lawyers/create',
   async (data: LawyerDto, { rejectWithValue }) => {
      try {
         const response = await lawyerApi.createLawyer(data)
         return response
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to create lawyer')
      }
   }
)

export const updateLawyer = createAsyncThunk(
   'lawyers/update',
   async ({ id, data }: { id: string; data: Partial<Lawyer> }, { rejectWithValue }) => {
      try {
         const response = await lawyerApi.updateLawyer(id, data)
         return response
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to update lawyer')
      }
   }
)

export const deleteLawyer = createAsyncThunk(
   'lawyers/delete',
   async (id: string, { rejectWithValue }) => {
      try {
         await lawyerApi.deleteLawyer(id)
         return id
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to delete lawyer')
      }
   }
)

export const updateProfilePicture = createAsyncThunk(
   'lawyers/updateProfilePicture',
   async ({ id, url }: { id: string; url: string }, { rejectWithValue }) => {
      try {
         const response = await lawyerApi.updateProfilePicture(id, url)
         return response
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to update profile picture')
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
      clearLawyers: (state) => {
         state.lawyers = []
         state.initialized = false
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
            state.initialized = true
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
         // Create lawyer - add to local state
         .addCase(createLawyer.pending, (state) => {
            state.creating = true
            state.error = null
         })
         .addCase(createLawyer.fulfilled, (state, action) => {
            state.creating = false
            state.lawyers = [action.payload.data, ...state.lawyers]
            state.total += 1
         })
         .addCase(createLawyer.rejected, (state, action) => {
            state.creating = false
            state.error = action.payload as string
         })
         // Update lawyer - update in local state
         .addCase(updateLawyer.pending, (state) => {
            state.updating = true
            state.error = null
         })
         .addCase(updateLawyer.fulfilled, (state, action) => {
            state.updating = false
            const index = state.lawyers.findIndex((l) => l.id === action.payload.data.id)
            if (index !== -1) {
               state.lawyers[index] = action.payload.data
            }
            if (state.selectedLawyer?.id === action.payload.data.id) {
               state.selectedLawyer = action.payload.data
            }
         })
         .addCase(updateLawyer.rejected, (state, action) => {
            state.updating = false
            state.error = action.payload as string
         })
         // Delete lawyer - remove from local state
         .addCase(deleteLawyer.pending, (state, action) => {
            state.deleting = action.meta.arg
            state.error = null
         })
         .addCase(deleteLawyer.fulfilled, (state, action) => {
            state.deleting = null
            state.lawyers = state.lawyers.filter((l) => l.id !== action.payload)
            state.total -= 1
         })
         .addCase(deleteLawyer.rejected, (state, action) => {
            state.deleting = null
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

export const { setQuery, setSelectedLawyer, clearError, clearLawyers } = lawyerSlice.actions
export default lawyerSlice.reducer
