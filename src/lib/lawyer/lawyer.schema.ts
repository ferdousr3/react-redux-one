import { z } from 'zod';

export const lawyerSchema = z.object({
   name: z.string().min(1, 'Name is required'),
   email: z.string().min(1, 'Email is required').email('Invalid email address'),
   phoneNumber: z.string().min(1, 'Phone number is required'),
   instituteName: z.string().min(1, 'Institute name is required'),
   lawyerType: z.string().min(1, 'Lawyer type is required'),
   practiceStartYear: z.date({ message: 'Practice start year is required' }).or(z.null()),
   rating: z.coerce.number().min(0).max(5),
   website: z.string().optional(),
   businessHours: z.string().optional(),
   institutionId: z.string().optional(),
   latitude: z.coerce.number().optional(),
   longitude: z.coerce.number().optional(),
   address: z.string().min(1, 'Address is required'),
   city: z.string().min(1, 'City is required'),
   district: z.string().min(1, 'District is required'),
   postCode: z.string().min(1, 'Post code is required'),
   interestedArea: z.string().optional(),
   description: z.string().optional(),
   sponsoredUntil: z.date().or(z.null()).optional(),
   sponsored: z.boolean().optional(),
   status: z.enum(['pending', 'approved', 'rejected', 'suspended']).default('pending'),
});

export type LawyerFormValues = z.infer<typeof lawyerSchema>;
