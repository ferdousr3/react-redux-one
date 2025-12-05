export interface LawyerDto {
   name: string
   instituteName?: string
   practiceStartYear?: number
   lawyerType?: string
   phoneNumber?: string
   email?: string
   profileImageUrl?: string
   coverImageUrl?: string
   description?: string
   rating?: number
   address?: string
   city?: string
   district?: string
   postCode?: string
   website?: string
   businessHours?: string
   sponsored?: boolean
   sponsoredUntil?: Date | null
   interestedArea?: string
   institutionId?: string
   latitude?: number
   longitude?: number
   status?: LawyerStatus
   verified?: boolean
}

export enum LawyerStatus {
   PENDING = 'pending',
   APPROVED = 'approved',
   HIDDEN = 'hidden',
}

export interface Lawyer {
   id: string
   name: string
   instituteName?: string | null
   practiceStartYear?: number | null
   lawyerType?: string | null
   phoneNumber?: string | null
   email?: string | null
   profileImageUrl?: string | null
   coverImageUrl?: string | null
   description?: string | null
   rating?: number | null
   address?: string | null
   city?: string | null
   district?: string | null
   postCode?: string | null
   website?: string | null
   businessHours?: string | null
   sponsored?: boolean
   sponsoredUntil?: Date | null
   interestedArea?: string | null
   institutionId?: string | null
   latitude?: number | null
   longitude?: number | null
   status?: LawyerStatus
   verified?: boolean
   createdAt: string
   updatedAt: string
}

export interface LawyerQuery {
   search?: string
   page?: number
   size?: number
   orderBy?: string
   orderDirection?: 'asc' | 'desc'
   type?: string | string[]
   district?: string
   experience?: number | number[]
   experienceFrom?: number
   experienceTo?: number
   status?: LawyerStatus | LawyerStatus[]
   creatorId?: string
   creatorName?: string
}

export interface LawyerFormData {
   lawyer: Lawyer | null
}

export interface LawyerMarker<T> {
   position: T
   title: string
   content: string
}
