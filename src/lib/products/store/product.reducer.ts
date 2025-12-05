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
   creating: boolean
   updating: boolean
   deleting: string | null
   error: string | null
   query: ProductQuery
   total: number
   initialized: boolean
}

const initialState: ProductState = {
   products: [],
   selectedProduct: null,
   categories: [],
   loading: false,
   creating: false,
   updating: false,
   deleting: null,
   error: null,
   query: {
      page: 1,
      size: 12,
   },
   total: 0,
   initialized: false,
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
         state.initialized = false
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
            state.initialized = true
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
         // Create product - add to local state
         .addCase(createProduct.pending, (state) => {
            state.creating = true
            state.error = null
         })
         .addCase(createProduct.fulfilled, (state, action) => {
            state.creating = false
            state.products = [action.payload, ...state.products]
            state.total += 1
         })
         .addCase(createProduct.rejected, (state, action) => {
            state.creating = false
            state.error = action.payload as string
         })
         // Update product - update in local state
         .addCase(updateProduct.pending, (state) => {
            state.updating = true
            state.error = null
         })
         .addCase(updateProduct.fulfilled, (state, action) => {
            state.updating = false
            const index = state.products.findIndex((p) => p.id === action.payload.id)
            if (index !== -1) {
               state.products[index] = action.payload
            }
            if (state.selectedProduct?.id === action.payload.id) {
               state.selectedProduct = action.payload
            }
         })
         .addCase(updateProduct.rejected, (state, action) => {
            state.updating = false
            state.error = action.payload as string
         })
         // Delete product - remove from local state
         .addCase(deleteProduct.pending, (state, action) => {
            state.deleting = action.meta.arg
            state.error = null
         })
         .addCase(deleteProduct.fulfilled, (state, action) => {
            state.deleting = null
            state.products = state.products.filter((p) => p.id !== action.payload)
            state.total -= 1
         })
         .addCase(deleteProduct.rejected, (state, action) => {
            state.deleting = null
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
export { fetchProducts, fetchProduct, createProduct, updateProduct, deleteProduct, fetchCategories }
export default productSlice.reducer
