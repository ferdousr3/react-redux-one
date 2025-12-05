import { createAsyncThunk } from '@reduxjs/toolkit'
import { postApi } from '../api/post.api'
import { Post, PostInput, PostQuery } from '../models/post.model'

// Fetch all posts - only called on initial load or page refresh
export const fetchPosts = createAsyncThunk(
   'posts/fetchAll',
   async (query: PostQuery = {}, { rejectWithValue }) => {
      try {
         const data = await postApi.getAllPosts(query)
         return data
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to load posts')
      }
   }
)

// Fetch single post
export const fetchPost = createAsyncThunk(
   'posts/fetchOne',
   async (id: string, { rejectWithValue }) => {
      try {
         const data = await postApi.getPost(id)
         return data
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to load post')
      }
   }
)

// Create post - returns created post to add to state
export const createPost = createAsyncThunk(
   'posts/create',
   async (data: PostInput, { rejectWithValue }) => {
      try {
         const result = await postApi.createPost(data)
         return result
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to create post')
      }
   }
)

// Update post - returns updated post to update in state
export const updatePost = createAsyncThunk(
   'posts/update',
   async ({ id, data }: { id: string; data: Partial<Post> }, { rejectWithValue }) => {
      try {
         const result = await postApi.updatePost(id, data)
         return result
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to update post')
      }
   }
)

// Delete post - returns id to remove from state
export const deletePost = createAsyncThunk(
   'posts/delete',
   async (id: string, { rejectWithValue }) => {
      try {
         await postApi.deletePost(id)
         return id // Return the id to remove from local state
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to delete post')
      }
   }
)
