import { createAsyncThunk } from '@reduxjs/toolkit'
import { postApi } from '../api/post.api'
import { Post, PostInput, PostQuery } from '../models/post.model'
import { toast } from '@/lib/utils/toast.service'

// Fetch all posts
export const fetchPosts = createAsyncThunk(
   'posts/fetchAll',
   async (query: PostQuery = {}, { rejectWithValue }) => {
      try {
         const data = await postApi.getAllPosts(query)
         return data
      } catch (error: any) {
         toast.error('Failed to load posts', error.message)
         return rejectWithValue(error.message)
      }
   }
)

// Fetch single post
export const fetchPost = createAsyncThunk(
   'posts/fetchOne',
   async (id: number, { rejectWithValue }) => {
      try {
         const data = await postApi.getPost(id)
         return data
      } catch (error: any) {
         toast.error('Failed to load post', error.message)
         return rejectWithValue(error.message)
      }
   }
)

// Create post
export const createPost = createAsyncThunk(
   'posts/create',
   async (data: PostInput, { rejectWithValue }) => {
      try {
         const result = await postApi.createPost(data)
         toast.success('Post created successfully')
         return result
      } catch (error: any) {
         toast.error('Failed to create post', error.message)
         return rejectWithValue(error.message)
      }
   }
)

// Update post
export const updatePost = createAsyncThunk(
   'posts/update',
   async ({ id, data }: { id: number; data: Partial<Post> }, { rejectWithValue }) => {
      try {
         const result = await postApi.updatePost(id, data)
         toast.success('Post updated successfully')
         return result
      } catch (error: any) {
         toast.error('Failed to update post', error.message)
         return rejectWithValue(error.message)
      }
   }
)

// Delete post
export const deletePost = createAsyncThunk(
   'posts/delete',
   async (id: number, { rejectWithValue }) => {
      try {
         await postApi.deletePost(id)
         toast.success('Post deleted successfully')
         return id
      } catch (error: any) {
         toast.error('Failed to delete post', error.message)
         return rejectWithValue(error.message)
      }
   }
)
