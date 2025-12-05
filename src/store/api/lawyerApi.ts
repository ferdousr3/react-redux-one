import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse, Lawyer, LawyerDto, LawyerQuery } from '@/types/lawyer.model';


const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const lawyerApi = createApi({
   reducerPath: 'lawyerApi',
   baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
   tagTypes: ['Lawyer'],
   endpoints: (builder) => ({
      getAllLawyers: builder.query<ApiResponse<Lawyer[]>, LawyerQuery>({
         query: (params) => {
            const queryParams: Record<string, string | number> = {};

            if (params.search) queryParams.search = params.search;
            if (params.page) queryParams._page = params.page;
            if (params.size) queryParams._limit = params.size;
            if (params.orderBy) queryParams._sort = params.orderBy;
            if (params.orderDirection) queryParams._order = params.orderDirection;

          
            if (params.type) queryParams.type = params.type;
            if (params.district) queryParams.district = params.district;
            if (params.rating) queryParams.rating = params.rating;
            if (params.status) queryParams.status = params.status;

            return {
               url: '/users',
               params: queryParams,
            };
         },
         transformResponse: (response: any[], _meta, arg) => {
            return {
               data: response.map(user => ({
                  id: user.id.toString(),
                  name: user.name,
                  email: user.email,
                  phoneNumber: user.phone,
                  instituteName: user.company.name,
                  lawyerType: 'Supreme Court',
                  practiceStartYear: new Date().toISOString(),
                  rating: 4.5,
                  address: user.address.street,
                  city: user.address.city,
                  district: user.address.city,
                  postCode: user.address.zipcode,
                  sponsored: false,
                  status: 'approved',
               } as Lawyer)),
               success: true,
               pagination: {
                  total: 100, // Mock total
                  page: arg.page || 1,
                  size: arg.size || 10,
                  totalPages: 10,
               }
            };
         },
         providesTags: ['Lawyer'],
      }),
      getLawyer: builder.query<ApiResponse<Lawyer>, string>({
         query: (id) => `/users/${id}`,
         transformResponse: (user: any) => ({
            data: {
               id: user.id.toString(),
               name: user.name,
               email: user.email,
               phoneNumber: user.phone,
               instituteName: user.company.name,
               lawyerType: 'Supreme Court',
               practiceStartYear: new Date().toISOString(),
               rating: 4.5,
               address: user.address.street,
               city: user.address.city,
               district: user.address.city,
               postCode: user.address.zipcode,
               sponsored: false,
               status: 'approved',
            } as Lawyer,
            success: true,
         }),
         providesTags: (_result, _error, id) => [{ type: 'Lawyer', id }],
      }),
      createLawyer: builder.mutation<ApiResponse<Lawyer>, LawyerDto>({
         query: (data) => ({
            url: '/users',
            method: 'POST',
            body: data,
         }),
         invalidatesTags: ['Lawyer'],
      }),
      updateLawyer: builder.mutation<ApiResponse<Lawyer>, { id: string; data: Lawyer }>({
         query: ({ id, data }) => ({
            url: `/users/${id}`,
            method: 'PUT',
            body: data,
         }),
         invalidatesTags: (_result, _error, { id }) => [{ type: 'Lawyer', id }, 'Lawyer'],
      }),
      deleteLawyer: builder.mutation<ApiResponse<string>, string>({
         query: (id) => ({
            url: `/users/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Lawyer'],
      }),
      updateProfilePicture: builder.mutation<ApiResponse<Lawyer>, { id: string; profilePictureUrl: string }>({
         query: ({ id, profilePictureUrl }) => ({
            url: `/users/${id}`, // JSONPlaceholder doesn't have specific upload endpoints
            method: 'PATCH',
            body: { profilePictureUrl },
         }),
         invalidatesTags: (_result, _error, { id }) => [{ type: 'Lawyer', id }],
      }),
      updateCoverImage: builder.mutation<ApiResponse<Lawyer>, { id: string; coverImageUrl: string }>({
         query: ({ id, coverImageUrl }) => ({
            url: `/users/${id}`,
            method: 'PATCH',
            body: { coverImageUrl },
         }),
         invalidatesTags: (_result, _error, { id }) => [{ type: 'Lawyer', id }],
      }),
   }),
});

export const {
   useGetAllLawyersQuery,
   useGetLawyerQuery,
   useCreateLawyerMutation,
   useUpdateLawyerMutation,
   useDeleteLawyerMutation,
   useUpdateProfilePictureMutation,
   useUpdateCoverImageMutation,
} = lawyerApi;
