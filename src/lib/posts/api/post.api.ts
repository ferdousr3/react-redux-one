import { httpClient } from '@/lib/api/http-client'
import { Post, PostInput, PostQuery } from '../models/post.model'

export class PostApiService {
   private baseUrl = '/v1/posts'

   async getAllPosts(query?: PostQuery) {
      const params = new URLSearchParams()
      if (query?.search) params.append('search', query.search)
      if (query?.page) params.append('page', query.page.toString())
      if (query?.limit) params.append('size', query.limit.toString())
      if (query?.published !== undefined) params.append('published', query.published.toString())

      const response = await httpClient.get<Post[]>(`${this.baseUrl}?${params.toString()}`)
      return response.data.data
   }

   async getPost(id: string) {
      const response = await httpClient.get<Post>(`${this.baseUrl}/${id}`)
      return response.data.data
   }

   async createPost(data: PostInput) {
      const response = await httpClient.post<Post>(this.baseUrl, data)
      return response.data.data
   }

   async updatePost(id: string, data: Partial<Post>) {
      // Backend uses PATCH method
      const response = await httpClient.patch<Post>(`${this.baseUrl}/${id}`, data)
      return response.data.data
   }

   async deletePost(id: string) {
      const response = await httpClient.delete<void>(`${this.baseUrl}/${id}`)
      return response.data
   }
}

export const postApi = new PostApiService()
