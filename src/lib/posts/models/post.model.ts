export interface Post {
   id: number
   userId: number
   title: string
   body: string
}

export interface PostInput {
   userId: number
   title: string
   body: string
}

export interface PostQuery {
   userId?: number
   page?: number
   limit?: number
}
