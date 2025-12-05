import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { notesApi } from '../api/notes.api'
import { Note, NotesInput, NoteQuery } from '../models/notes.model'
import { toast } from '@/lib/utils/toast.service'

interface NotesState {
   notes: Note[]
   selectedNote: Note | null
   loading: boolean
   error: string | null
   query: NoteQuery
   total: number
}

const initialState: NotesState = {
   notes: [],
   selectedNote: null,
   loading: false,
   error: null,
   query: {
      search: '',
      page: 1,
      size: 20,
      orderBy: 'desc',
   },
   total: 0,
}

// Async thunks
export const fetchNotes = createAsyncThunk(
   'notes/fetchAll',
   async (query: Partial<NoteQuery>, { rejectWithValue }) => {
      try {
         const response = await notesApi.getAllNotes({ ...initialState.query, ...query })
         return response
      } catch (error: any) {
         toast.error('Failed to load notes', error.message)
         return rejectWithValue(error.message)
      }
   }
)

export const fetchNote = createAsyncThunk(
   'notes/fetchOne',
   async (id: string, { rejectWithValue }) => {
      try {
         const response = await notesApi.getNote(id)
         return response
      } catch (error: any) {
         toast.error('Failed to load note', error.message)
         return rejectWithValue(error.message)
      }
   }
)

export const createNote = createAsyncThunk(
   'notes/create',
   async (data: NotesInput, { rejectWithValue }) => {
      try {
         const response = await notesApi.createNote(data)
         toast.success('Note created successfully')
         return response
      } catch (error: any) {
         toast.error('Failed to create note', error.message)
         return rejectWithValue(error.message)
      }
   }
)

export const updateNote = createAsyncThunk(
   'notes/update',
   async ({ id, data }: { id: string; data: Partial<Note> }, { rejectWithValue }) => {
      try {
         const response = await notesApi.updateNote(id, data)
         toast.success('Note updated successfully')
         return response
      } catch (error: any) {
         toast.error('Failed to update note', error.message)
         return rejectWithValue(error.message)
      }
   }
)

export const deleteNote = createAsyncThunk(
   'notes/delete',
   async (id: string, { rejectWithValue }) => {
      try {
         await notesApi.deleteNote(id)
         toast.success('Note deleted successfully')
         return id
      } catch (error: any) {
         toast.error('Failed to delete note', error.message)
         return rejectWithValue(error.message)
      }
   }
)

// Slice
const notesSlice = createSlice({
   name: 'notes',
   initialState,
   reducers: {
      setQuery: (state, action: PayloadAction<Partial<NoteQuery>>) => {
         state.query = { ...state.query, ...action.payload }
      },
      setSelectedNote: (state, action: PayloadAction<Note | null>) => {
         state.selectedNote = action.payload
      },
      clearError: (state) => {
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         // Fetch all notes
         .addCase(fetchNotes.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchNotes.fulfilled, (state, action) => {
            state.loading = false
            state.notes = action.payload.data
            state.total = action.payload.pagination?.total || 0
         })
         .addCase(fetchNotes.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
         // Fetch single note
         .addCase(fetchNote.pending, (state) => {
            state.loading = true
         })
         .addCase(fetchNote.fulfilled, (state, action) => {
            state.loading = false
            state.selectedNote = action.payload.data
         })
         .addCase(fetchNote.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
         // Create note
         .addCase(createNote.pending, (state) => {
            state.loading = true
         })
         .addCase(createNote.fulfilled, (state, action) => {
            state.loading = false
            state.notes = [action.payload.data, ...state.notes]
         })
         .addCase(createNote.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
         // Update note
         .addCase(updateNote.pending, (state) => {
            state.loading = true
         })
         .addCase(updateNote.fulfilled, (state, action) => {
            state.loading = false
            const index = state.notes.findIndex((n) => n.id === action.payload.data.id)
            if (index !== -1) {
               state.notes[index] = action.payload.data
            }
            if (state.selectedNote?.id === action.payload.data.id) {
               state.selectedNote = action.payload.data
            }
         })
         .addCase(updateNote.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
         // Delete note
         .addCase(deleteNote.pending, (state) => {
            state.loading = true
         })
         .addCase(deleteNote.fulfilled, (state, action) => {
            state.loading = false
            state.notes = state.notes.filter((n) => n.id !== action.payload)
         })
         .addCase(deleteNote.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
   },
})

export const { setQuery, setSelectedNote, clearError } = notesSlice.actions
export default notesSlice.reducer
