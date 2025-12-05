import { createAsyncThunk } from '@reduxjs/toolkit'
import { productApi } from '../api/product.api'
import { Product, ProductInput, ProductQuery } from '../models/product.model'
import { toast } from '@/lib/utils/toast.service'

// Fetch all products
export const fetchProducts = createAsyncThunk(
   'products/fetchAll',
   async (query: ProductQuery = {}, { rejectWithValue }) => {
      try {
         const data = await productApi.getAllProducts(query)
         return data
      } catch (error: any) {
         toast.error('Failed to load products', error.message)
         return rejectWithValue(error.message)
      }
   }
)

// Fetch single product
export const fetchProduct = createAsyncThunk(
   'products/fetchOne',
   async (id: number, { rejectWithValue }) => {
      try {
         const data = await productApi.getProduct(id)
         return data
      } catch (error: any) {
         toast.error('Failed to load product', error.message)
         return rejectWithValue(error.message)
      }
   }
)

// Create product
export const createProduct = createAsyncThunk(
   'products/create',
   async (data: ProductInput, { rejectWithValue }) => {
      try {
         const result = await productApi.createProduct(data)
         toast.success('Product created successfully')
         return result
      } catch (error: any) {
         toast.error('Failed to create product', error.message)
         return rejectWithValue(error.message)
      }
   }
)

// Update product
export const updateProduct = createAsyncThunk(
   'products/update',
   async ({ id, data }: { id: number; data: Partial<Product> }, { rejectWithValue }) => {
      try {
         const result = await productApi.updateProduct(id, data)
         toast.success('Product updated successfully')
         return result
      } catch (error: any) {
         toast.error('Failed to update product', error.message)
         return rejectWithValue(error.message)
      }
   }
)

// Delete product
export const deleteProduct = createAsyncThunk(
   'products/delete',
   async (id: number, { rejectWithValue }) => {
      try {
         await productApi.deleteProduct(id)
         toast.success('Product deleted successfully')
         return id
      } catch (error: any) {
         toast.error('Failed to delete product', error.message)
         return rejectWithValue(error.message)
      }
   }
)

// Fetch categories
export const fetchCategories = createAsyncThunk(
   'products/fetchCategories',
   async (_, { rejectWithValue }) => {
      try {
         const data = await productApi.getCategories()
         return data
      } catch (error: any) {
         toast.error('Failed to load categories', error.message)
         return rejectWithValue(error.message)
      }
   }
)
