import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ApiResponse<T> {
   data: T
   message: string
   success: boolean
   pagination?: {
      page: number
      size: number
      total: number
      totalPages: number
   }
}

class HttpClient {
   private instance: AxiosInstance

   constructor() {
      this.instance = axios.create({
         baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
         timeout: 30000,
         headers: {
            'Content-Type': 'application/json',
         },
      })

      this.setupInterceptors()
   }

   private setupInterceptors() {
      // Request interceptor
      this.instance.interceptors.request.use(
         (config) => {
            // Add auth token if available
            const token = localStorage.getItem('auth_token')
            if (token) {
               config.headers.Authorization = `Bearer ${token}`
            }
            return config
         },
         (error) => {
            return Promise.reject(error)
         }
      )

      // Response interceptor
      this.instance.interceptors.response.use(
         (response) => response,
         (error) => {
            // Handle common errors
            if (error.response?.status === 401) {
               // Unauthorized - clear token and redirect to login
               localStorage.removeItem('auth_token')
               window.location.href = '/login'
            }
            return Promise.reject(error)
         }
      )
   }

   async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
      return this.instance.get(url, config)
   }

   async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
      return this.instance.post(url, data, config)
   }

   async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
      return this.instance.put(url, data, config)
   }

   async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
      return this.instance.delete(url, config)
   }

   async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
      return this.instance.patch(url, data, config)
   }
}

export const httpClient = new HttpClient()
