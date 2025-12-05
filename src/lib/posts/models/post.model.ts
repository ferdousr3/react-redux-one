export interface Post {
   id: string
   title: string
   content: string | null
   published: boolean
   authorId: string | null
   creatorId?: string | null
   createdAt: string
   updatedAt: string
}

export interface PostInput {
   title: string
   content?: string
   published?: boolean
}

export interface PostQuery {
   search?: string
   page?: number
   limit?: number
   published?: boolean
}
