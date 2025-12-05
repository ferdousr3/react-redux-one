import axios from 'axios'
import { Post, PostInput, PostQuery } from '../models/post.model'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export class PostApiService {
   async getAllPosts(query?: PostQuery) {
      const params = new URLSearchParams()
      if (query?.userId) params.append('userId', query.userId.toString())
      if (query?.page) params.append('_page', query.page.toString())
      if (query?.limit) params.append('_limit', query.limit.toString())

      const response = await axios.get<Post[]>(`${BASE_URL}/posts?${params.toString()}`)
      return response.data
   }

   async getPost(id: number) {
      const response = await axios.get<Post>(`${BASE_URL}/posts/${id}`)
      return response.data
   }

   async createPost(data: PostInput) {
      const response = await axios.post<Post>(`${BASE_URL}/posts`, data)
      return response.data
   }

   async updatePost(id: number, data: Partial<Post>) {
      const response = await axios.put<Post>(`${BASE_URL}/posts/${id}`, data)
      return response.data
   }

   async deletePost(id: number) {
      await axios.delete(`${BASE_URL}/posts/${id}`)
      return id
   }
}

export const postApi = new PostApiService()
