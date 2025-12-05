import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/lib/auth/store/auth.slice'
import lawyerReducer from '@/lib/lawyers/store/lawyer.slice'
import notesReducer from '@/lib/notes/store/notes.slice'
import postReducer from '@/lib/posts/store/post.reducer'
import productReducer from '@/lib/products/store/product.reducer'

export const store = configureStore({
   reducer: {
      auth: authReducer,
      lawyers: lawyerReducer,
      notes: notesReducer,
      posts: postReducer,
      products: productReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            // Ignore these action types
            ignoredActions: [
               'lawyers/fetchLawyers/fulfilled',
               'notes/fetchNotes/fulfilled',
               'posts/fetchPosts/fulfilled',
               'products/fetchProducts/fulfilled',
            ],
         },
      }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
