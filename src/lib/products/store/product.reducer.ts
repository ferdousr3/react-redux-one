import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product, ProductQuery } from '../models/product.model'
import {
   fetchProducts,
   fetchProduct,
   createProduct,
   updateProduct,
   deleteProduct,
   fetchCategories,
} from './product.actions'

interface ProductState {
   products: Product[]
   selectedProduct: Product | null
   categories: string[]
   loading: boolean
   error: string | null
   query: ProductQuery
   total: number
}

const initialState: ProductState = {
   products: [],
   selectedProduct: null,
   categories: [],
   loading: false,
   error: null,
   query: {
      limit: 12,
      skip: 0,
   },
   total: 0,
}

const productSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {
      setQuery: (state, action: PayloadAction<Partial<ProductQuery>>) => {
         state.query = { ...state.query, ...action.payload }
      },
      setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
         state.selectedProduct = action.payload
      },
      clearError: (state) => {
         state.error = null
      },
      clearProducts: (state) => {
         state.products = []
      },
   },
   extraReducers: (builder) => {
      builder
         // Fetch all products
         .addCase(fetchProducts.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload.products
            state.total = action.payload.total
         })
         .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
         // Fetch single product
         .addCase(fetchProduct.pending, (state) => {
            state.loading = true
         })
         .addCase(fetchProduct.fulfilled, (state, action) => {
            state.loading = false
            state.selectedProduct = action.payload
         })
         .addCase(fetchProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
         // Create product
         .addCase(createProduct.pending, (state) => {
            state.loading = true
         })
         .addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false
            state.products = [action.payload, ...state.products]
         })
         .addCase(createProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
         // Update product
         .addCase(updateProduct.pending, (state) => {
            state.loading = true
         })
         .addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false
            const index = state.products.findIndex((p) => p.id === action.payload.id)
            if (index !== -1) {
               state.products[index] = action.payload
            }
            if (state.selectedProduct?.id === action.payload.id) {
               state.selectedProduct = action.payload
            }
         })
         .addCase(updateProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
         // Delete product
         .addCase(deleteProduct.pending, (state) => {
            state.loading = true
         })
         .addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false
            state.products = state.products.filter((p) => p.id !== action.payload)
         })
         .addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
         // Fetch categories
         .addCase(fetchCategories.pending, (state) => {
            state.loading = true
         })
         .addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false
            state.categories = action.payload
         })
         .addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
   },
})

export const { setQuery, setSelectedProduct, clearError, clearProducts } = productSlice.actions
export default productSlice.reducer
