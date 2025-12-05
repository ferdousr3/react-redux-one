import { createAsyncThunk } from '@reduxjs/toolkit'
import { productApi } from '../api/product.api'
import { Product, ProductInput, ProductQuery } from '../models/product.model'

// Fetch all products - only called on initial load or page refresh
export const fetchProducts = createAsyncThunk(
   'products/fetchAll',
   async (query: ProductQuery = {}, { rejectWithValue }) => {
      try {
         const data = await productApi.getAllProducts(query)
         return data
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to load products')
      }
   }
)

// Fetch single product
export const fetchProduct = createAsyncThunk(
   'products/fetchOne',
   async (id: string, { rejectWithValue }) => {
      try {
         const data = await productApi.getProduct(id)
         return data
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to load product')
      }
   }
)

// Create product - returns created product to add to state
export const createProduct = createAsyncThunk(
   'products/create',
   async (data: ProductInput, { rejectWithValue }) => {
      try {
         const result = await productApi.createProduct(data)
         return result
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to create product')
      }
   }
)

// Update product - returns updated product to update in state
export const updateProduct = createAsyncThunk(
   'products/update',
   async ({ id, data }: { id: string; data: Partial<Product> }, { rejectWithValue }) => {
      try {
         const result = await productApi.updateProduct(id, data)
         return result
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to update product')
      }
   }
)

// Delete product - returns id to remove from state
export const deleteProduct = createAsyncThunk(
   'products/delete',
   async (id: string, { rejectWithValue }) => {
      try {
         await productApi.deleteProduct(id)
         return id
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to delete product')
      }
   }
)

// Fetch categories (if needed)
export const fetchCategories = createAsyncThunk(
   'products/fetchCategories',
   async (_, { rejectWithValue }) => {
      try {
         // This can be implemented if backend supports it
         return [] as string[]
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to load categories')
      }
   }
)
