export interface Product {
   id: string
   name: string
   description: string | null
   price: string
   stock: number
   image: string | null
   creatorId: string | null
   createdAt: string
   updatedAt: string
}

export interface ProductInput {
   name: string
   description?: string
   price: string
   stock?: number
   image?: string
}

export interface ProductQuery {
   search?: string
   page?: number
   size?: number
}

export interface ProductsResponse {
   products: Product[]
   total: number
}
