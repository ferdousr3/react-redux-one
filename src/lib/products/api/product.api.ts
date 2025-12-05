import { httpClient } from '@/lib/api/http-client'
import { Product, ProductInput, ProductQuery, ProductsResponse } from '../models/product.model'

export class ProductApiService {
   private baseUrl = '/v1/products'

   async getAllProducts(query?: ProductQuery) {
      const params = new URLSearchParams()
      if (query?.search) params.append('search', query.search)
      if (query?.page) params.append('page', query.page.toString())
      if (query?.size) params.append('size', query.size.toString())

      const response = await httpClient.get<Product[]>(`${this.baseUrl}?${params.toString()}`)
      return { products: response.data.data, total: response.data.pagination?.total || response.data.data.length }
   }

   async getProduct(id: string) {
      const response = await httpClient.get<Product>(`${this.baseUrl}/${id}`)
      return response.data.data
   }

   async createProduct(data: ProductInput) {
      const response = await httpClient.post<Product>(this.baseUrl, data)
      return response.data.data
   }

   async updateProduct(id: string, data: Partial<Product>) {
      // Backend uses PATCH method
      const response = await httpClient.patch<Product>(`${this.baseUrl}/${id}`, data)
      return response.data.data
   }

   async deleteProduct(id: string) {
      const response = await httpClient.delete<Product>(`${this.baseUrl}/${id}`)
      return response.data.data
   }
}

export const productApi = new ProductApiService()
