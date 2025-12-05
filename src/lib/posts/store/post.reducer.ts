import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post, PostQuery } from '../models/post.model'
import { fetchPosts, fetchPost, createPost, updatePost, deletePost } from './post.actions'

interface PostState {
   posts: Post[]
   selectedPost: Post | null
   loading: boolean
   error: string | null
   query: PostQuery
}

const initialState: PostState = {
   posts: [],
   selectedPost: null,
   loading: false,
   error: null,
   query: {
      page: 1,
      limit: 10,
   },
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
         // Create post
         .addCase(createPost.pending, (state) => {
            state.loading = true
         })
         .addCase(createPost.fulfilled, (state, action) => {
            state.loading = false
            state.posts = [action.payload, ...state.posts]
         })
         .addCase(createPost.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
         // Update post
         .addCase(updatePost.pending, (state) => {
            state.loading = true
         })
         .addCase(updatePost.fulfilled, (state, action) => {
            state.loading = false
            const index = state.posts.findIndex((p) => p.id === action.payload.id)
            if (index !== -1) {
               state.posts[index] = action.payload
            }
            if (state.selectedPost?.id === action.payload.id) {
               state.selectedPost = action.payload
            }
         })
         .addCase(updatePost.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
         // Delete post
         .addCase(deletePost.pending, (state) => {
            state.loading = true
         })
         .addCase(deletePost.fulfilled, (state, action) => {
            state.loading = false
            state.posts = state.posts.filter((p) => p.id !== action.payload)
         })
         .addCase(deletePost.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
   },
})

export const { setQuery, setSelectedPost, clearError, clearPosts } = postSlice.actions
export default postSlice.reducer
