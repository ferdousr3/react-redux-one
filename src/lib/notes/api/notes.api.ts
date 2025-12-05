import { httpClient } from '@/lib/api/http-client'
import { Note, NotesInput, NoteQuery } from '../models/notes.model'

export class NotesApiService {
   private baseUrl = '/v1/notes'

   async getAllNotes(query: NoteQuery) {
      const params = new URLSearchParams()

      if (query.search) params.append('search', query.search)
      if (query.caseId) params.append('caseId', query.caseId)
      if (query.page !== undefined) params.append('page', query.page.toString())
      if (query.size !== undefined) params.append('size', query.size.toString())
      if (query.orderBy) params.append('orderBy', query.orderBy)

      const response = await httpClient.get<Note[]>(`${this.baseUrl}?${params.toString()}`)
      return response.data
   }

   async getNote(id: string) {
      const response = await httpClient.get<Note>(`${this.baseUrl}/${id}`)
      return response.data
   }

   async createNote(data: NotesInput) {
      const response = await httpClient.post<Note>(this.baseUrl, data)
      return response.data
   }

   async updateNote(id: string, data: Partial<Note>) {
      const response = await httpClient.put<Note>(`${this.baseUrl}/${id}`, data)
      return response.data
   }

   async deleteNote(id: string) {
      const response = await httpClient.delete<string>(`${this.baseUrl}/${id}`)
      return response.data
   }
}

export const notesApi = new NotesApiService()
