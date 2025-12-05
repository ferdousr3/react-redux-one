export interface Product {
   id: number
   title: string
   description: string
   price: number
   discountPercentage: number
   rating: number
   stock: number
   brand: string
   category: string
   thumbnail: string
   images: string[]
}

export interface ProductInput {
   title: string
   description: string
   price: number
   brand: string
   category: string
}

export interface ProductQuery {
   limit?: number
   skip?: number
   search?: string
   category?: string
}

export interface ProductsResponse {
   products: Product[]
   total: number
   skip: number
   limit: number
}
