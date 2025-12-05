import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post, PostQuery } from '../models/post.model'
import { fetchPosts, fetchPost, createPost, updatePost, deletePost } from './post.actions'

interface PostState {
   posts: Post[]
   selectedPost: Post | null
   loading: boolean
   creating: boolean
   updating: boolean
   deleting: string | null // Store the ID being deleted
   error: string | null
   query: PostQuery
   initialized: boolean // Track if initial fetch has been done
}

const initialState: PostState = {
   posts: [],
   selectedPost: null,
   loading: false,
   creating: false,
   updating: false,
   deleting: null,
   error: null,
   query: {
      page: 1,
      limit: 10,
   },
   initialized: false,
}

const postSlice = createSlice({
   name: 'posts',
   initialState,
   reducers: {
      setQuery: (state, action: PayloadAction<Partial<PostQuery>>) => {
         state.query = { ...state.query, ...action.payload }
      },
      setSelectedPost: (state, action: PayloadAction<Post | null>) => {
         state.selectedPost = action.payload
      },
      clearError: (state) => {
         state.error = null
      },
      clearPosts: (state) => {
         state.posts = []
         state.initialized = false
      },
   },
   extraReducers: (builder) => {
      builder
         // Fetch all posts
         .addCase(fetchPosts.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload
            state.initialized = true
         })
         .addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
         // Fetch single post
         .addCase(fetchPost.pending, (state) => {
            state.loading = true
         })
         .addCase(fetchPost.fulfilled, (state, action) => {
            state.loading = false
            state.selectedPost = action.payload
         })
         .addCase(fetchPost.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
         // Create post - add to local state
         .addCase(createPost.pending, (state) => {
            state.creating = true
            state.error = null
         })
         .addCase(createPost.fulfilled, (state, action) => {
            state.creating = false
            state.posts = [action.payload, ...state.posts] // Add new post to beginning
         })
         .addCase(createPost.rejected, (state, action) => {
            state.creating = false
            state.error = action.payload as string
         })
         // Update post - update in local state
         .addCase(updatePost.pending, (state) => {
            state.updating = true
            state.error = null
         })
         .addCase(updatePost.fulfilled, (state, action) => {
            state.updating = false
            const index = state.posts.findIndex((p) => p.id === action.payload.id)
            if (index !== -1) {
               state.posts[index] = action.payload
            }
            if (state.selectedPost?.id === action.payload.id) {
               state.selectedPost = action.payload
            }
         })
         .addCase(updatePost.rejected, (state, action) => {
            state.updating = false
            state.error = action.payload as string
         })
         // Delete post - remove from local state
         .addCase(deletePost.pending, (state, action) => {
            state.deleting = action.meta.arg // Store the ID being deleted
            state.error = null
         })
         .addCase(deletePost.fulfilled, (state, action) => {
            state.deleting = null
            state.posts = state.posts.filter((p) => p.id !== action.payload)
         })
         .addCase(deletePost.rejected, (state, action) => {
            state.deleting = null
            state.error = action.payload as string
         })
   },
})

export const { setQuery, setSelectedPost, clearError, clearPosts } = postSlice.actions
export { fetchPosts, fetchPost, createPost, updatePost, deletePost }
export default postSlice.reducer
