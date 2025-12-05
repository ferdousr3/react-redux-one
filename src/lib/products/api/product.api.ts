import axios from 'axios'
import { Product, ProductInput, ProductQuery, ProductsResponse } from '../models/product.model'

const BASE_URL = 'https://dummyjson.com'

export class ProductApiService {
   async getAllProducts(query?: ProductQuery) {
      const params = new URLSearchParams()
      if (query?.limit) params.append('limit', query.limit.toString())
      if (query?.skip) params.append('skip', query.skip.toString())

      let url = `${BASE_URL}/products`

      if (query?.search) {
         url = `${BASE_URL}/products/search?q=${query.search}`
      } else if (query?.category) {
         url = `${BASE_URL}/products/category/${query.category}`
      }

      const response = await axios.get<ProductsResponse>(`${url}${query?.search || query?.category ? '&' : '?'}${params.toString()}`)
      return response.data
   }

   async getProduct(id: number) {
      const response = await axios.get<Product>(`${BASE_URL}/products/${id}`)
      return response.data
   }

   async createProduct(data: ProductInput) {
      const response = await axios.post<Product>(`${BASE_URL}/products/add`, data)
      return response.data
   }

   async updateProduct(id: number, data: Partial<Product>) {
      const response = await axios.put<Product>(`${BASE_URL}/products/${id}`, data)
      return response.data
   }

   async deleteProduct(id: number) {
      const response = await axios.delete<Product>(`${BASE_URL}/products/${id}`)
      return id
   }

   async getCategories() {
      const response = await axios.get<string[]>(`${BASE_URL}/products/categories`)
      return response.data
   }
}

export const productApi = new ProductApiService()
