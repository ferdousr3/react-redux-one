export type LawyerStatus = 'pending' | 'approved' | 'rejected' | 'suspended';

export type OrderBy = 'name' | 'rating' | 'experience' | 'createdAt';

export interface ApiResponse<T> {
   data: T;
   message?: string;
   success: boolean;
   pagination?: {
      total: number;
      page: number;
      size: number;
      totalPages: number;
   };
}

export interface Lawyer {
   id: string;
   name: string;
   email: string;
   phoneNumber: string;
   instituteName: string;
   lawyerType: string;
   practiceStartYear: Date | string | null;
   rating: number;
   website?: string;
   businessHours?: string;
   institutionId?: string;
   latitude?: number;
   longitude?: number;
   address: string;
   city: string;
   district: string;
   postCode: string;
   interestedArea?: string;
   description?: string;
   sponsoredUntil?: Date | string | null;
   sponsored: boolean;
   status: LawyerStatus;
   profilePictureUrl?: string;
   coverImageUrl?: string;
   experience?: number;
   creatorId?: string;
   creatorName?: string;
   createdAt?: string;
   updatedAt?: string;
}

export interface LawyerDto extends Omit<Lawyer, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'sponsored' | 'status'> {
   rating?: number;
   sponsored?: boolean;
   status?: LawyerStatus;
}

export interface LawyerQuery {
   search?: string;
   size?: number;
   page?: number;
   orderBy?: OrderBy | 'experience';
   orderDirection?: 'asc' | 'desc';
   type?: string;
   district?: string;
   rating?: number;
   experience?: number;
   experienceFrom?: number;
   experienceTo?: number;
   status?: LawyerStatus;
   creatorId?: string;
   creatorName?: string;
}
