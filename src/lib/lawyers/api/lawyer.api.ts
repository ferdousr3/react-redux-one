import { httpClient, ApiResponse } from '@/lib/api/http-client'
import { Lawyer, LawyerDto, LawyerQuery } from '../models/lawyer.model'

export class LawyerApiService {
   private baseUrl = '/v1/lawyers'

   async getAllLawyers(query: LawyerQuery) {
      const params = new URLSearchParams()

      if (query.search) params.append('search', query.search)
      if (query.page !== undefined) params.append('page', query.page.toString())
      if (query.size !== undefined) params.append('size', query.size.toString())
      if (query.orderBy) params.append('orderBy', query.orderBy)
      if (query.orderDirection) params.append('orderDirection', query.orderDirection.toUpperCase())
      if (query.type) params.append('type', Array.isArray(query.type) ? query.type.join(',') : query.type)
      if (query.district) params.append('district', query.district)
      if (query.experience !== undefined) params.append('experience', query.experience.toString())
      if (query.experienceFrom !== undefined) params.append('experienceFrom', query.experienceFrom.toString())
      if (query.experienceTo !== undefined) params.append('experienceTo', query.experienceTo.toString())
      if (query.status) params.append('status', Array.isArray(query.status) ? query.status.join(',') : query.status)
      if (query.creatorId) params.append('creatorId', query.creatorId)
      if (query.creatorName) params.append('creatorName', query.creatorName)

      const response = await httpClient.get<Lawyer[]>(`${this.baseUrl}?${params.toString()}`)
      return response.data
   }

   async getLawyer(id: string) {
      const response = await httpClient.get<Lawyer>(`${this.baseUrl}/${id}`)
      return response.data
   }

   async createLawyer(data: LawyerDto) {
      const response = await httpClient.post<Lawyer>(this.baseUrl, data)
      return response.data
   }

   async updateLawyer(id: string, data: Partial<Lawyer>) {
      const response = await httpClient.put<Lawyer>(`${this.baseUrl}/${id}`, data)
      return response.data
   }

   async deleteLawyer(id: string) {
      const response = await httpClient.delete<string>(`${this.baseUrl}/${id}`)
      return response.data
   }

   async updateProfilePicture(id: string, profilePictureUrl: string) {
      const response = await httpClient.put<Lawyer>(`${this.baseUrl}/upload-profile-picture`, {
         id,
         profilePictureUrl,
      })
      return response.data
   }

   async updateCoverImage(id: string, coverImageUrl: string) {
      const response = await httpClient.put<Lawyer>(`${this.baseUrl}/upload-cover-image`, {
         id,
         coverImageUrl,
      })
      return response.data
   }
}

export const lawyerApi = new LawyerApiService()
