export interface Creator {
   id: string
   name: string
   email: string
}

export interface NotesInput {
   title: string
   content?: string
   caseId?: string
}

export interface Note extends NotesInput {
   id: string
   date: string | number | Date
   createdAt: string
   updatedAt: string
   creator?: Creator
}

export interface NoteQuery {
   search?: string
   caseId?: string
   page: number
   size: number
   orderBy?: 'asc' | 'desc'
}

export interface NoteFormData {
   note: Note | null
   caseId?: string
}
