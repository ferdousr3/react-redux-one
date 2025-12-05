import { httpClient } from '@/lib/api/http-client'

export interface AuthUser {
   id: string
   email: string
   firstName: string
   lastName: string
   profilePhoto: string | null
   verified: boolean
   status: 'active' | 'inactive' | 'banned'
   createdAt: string
}

export interface AuthTokens {
   accessToken: string
   refreshToken: string
}

export interface LoginCredentials {
   email: string
   password: string
}

export interface RegisterData {
   firstName: string
   lastName: string
   email: string
   password: string
}

export interface ChangePasswordData {
   currentPassword: string
   newPassword: string
}

export interface ForgotPasswordData {
   email: string
}

export interface ResetPasswordData {
   token: string
   password: string
}

export interface AuthResponse {
   accessToken: string
   refreshToken: string
   user: AuthUser
}

class AuthApiService {
   private baseUrl = '/v1/auth'

   async login(credentials: LoginCredentials): Promise<AuthResponse> {
      const response = await httpClient.post<AuthResponse>(`${this.baseUrl}/login`, credentials)
      return response.data.data
   }

   async register(data: RegisterData): Promise<{ message: string }> {
      const response = await httpClient.post<{ message: string }>(`${this.baseUrl}/register`, data)
      return response.data.data
   }

   async refreshToken(refreshToken: string): Promise<AuthTokens> {
      const response = await httpClient.post<AuthTokens>(`${this.baseUrl}/refresh-token`, { refreshToken })
      return response.data.data
   }

   async changePassword(data: ChangePasswordData): Promise<{ message: string }> {
      const response = await httpClient.post<{ message: string }>(`${this.baseUrl}/change-password`, data)
      return response.data.data
   }

   async forgotPassword(data: ForgotPasswordData): Promise<{ message: string }> {
      const response = await httpClient.post<{ message: string }>(`${this.baseUrl}/forgot-password`, data)
      return response.data.data
   }

   async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
      const response = await httpClient.post<{ message: string }>(`${this.baseUrl}/reset-password`, data)
      return response.data.data
   }

   async verifyEmail(token: string): Promise<{ message: string }> {
      const response = await httpClient.post<{ message: string }>(`${this.baseUrl}/verify-email`, { token })
      return response.data.data
   }
}

export const authApi = new AuthApiService()
