import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { notesApi } from '../api/notes.api'
import { Note, NotesInput, NoteQuery } from '../models/notes.model'

interface NotesState {
   notes: Note[]
   selectedNote: Note | null
   loading: boolean
   creating: boolean
   updating: boolean
   deleting: string | null
   error: string | null
   query: NoteQuery
   total: number
   initialized: boolean
}

const initialState: NotesState = {
   notes: [],
   selectedNote: null,
   loading: false,
   creating: false,
   updating: false,
   deleting: null,
   error: null,
   query: {
      search: '',
      page: 1,
      size: 20,
      orderBy: 'desc',
   },
   total: 0,
   initialized: false,
}

// Async thunks
export const fetchNotes = createAsyncThunk(
   'notes/fetchAll',
   async (query: Partial<NoteQuery> = {}, { rejectWithValue }) => {
      try {
         const response = await notesApi.getAllNotes({ ...initialState.query, ...query })
         return response
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to load notes')
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
         return rejectWithValue(error.response?.data?.message || 'Failed to load note')
      }
   }
)

export const createNote = createAsyncThunk(
   'notes/create',
   async (data: NotesInput, { rejectWithValue }) => {
      try {
         const response = await notesApi.createNote(data)
         return response
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to create note')
      }
   }
)

export const updateNote = createAsyncThunk(
   'notes/update',
   async ({ id, data }: { id: string; data: Partial<Note> }, { rejectWithValue }) => {
      try {
         const response = await notesApi.updateNote(id, data)
         return response
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to update note')
      }
   }
)

export const deleteNote = createAsyncThunk(
   'notes/delete',
   async (id: string, { rejectWithValue }) => {
      try {
         await notesApi.deleteNote(id)
         return id
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to delete note')
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
      clearNotes: (state) => {
         state.notes = []
         state.initialized = false
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
            state.initialized = true
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
         // Create note - add to local state
         .addCase(createNote.pending, (state) => {
            state.creating = true
            state.error = null
         })
         .addCase(createNote.fulfilled, (state, action) => {
            state.creating = false
            state.notes = [action.payload.data, ...state.notes]
            state.total += 1
         })
         .addCase(createNote.rejected, (state, action) => {
            state.creating = false
            state.error = action.payload as string
         })
         // Update note - update in local state
         .addCase(updateNote.pending, (state) => {
            state.updating = true
            state.error = null
         })
         .addCase(updateNote.fulfilled, (state, action) => {
            state.updating = false
            const index = state.notes.findIndex((n) => n.id === action.payload.data.id)
            if (index !== -1) {
               state.notes[index] = action.payload.data
            }
            if (state.selectedNote?.id === action.payload.data.id) {
               state.selectedNote = action.payload.data
            }
         })
         .addCase(updateNote.rejected, (state, action) => {
            state.updating = false
            state.error = action.payload as string
         })
         // Delete note - remove from local state
         .addCase(deleteNote.pending, (state, action) => {
            state.deleting = action.meta.arg
            state.error = null
         })
         .addCase(deleteNote.fulfilled, (state, action) => {
            state.deleting = null
            state.notes = state.notes.filter((n) => n.id !== action.payload)
            state.total -= 1
         })
         .addCase(deleteNote.rejected, (state, action) => {
            state.deleting = null
            state.error = action.payload as string
         })
   },
})

export const { setQuery, setSelectedNote, clearError, clearNotes } = notesSlice.actions
export default notesSlice.reducer
