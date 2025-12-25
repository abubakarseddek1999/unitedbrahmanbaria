// galleryApi.ts
import { injectEndpoints } from "../../api/api";

export interface IGallery {
    _id: string;
    image: string;
    alt: string;
    title?: string;
    purpose?: string;
    date?: string;
    // status?: number;
}
interface Meta {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
}
interface GalleryResponse {
    status: number;
    success: boolean;
    message: string;
    data: IGallery[];
}

interface GetAllGalleryResponse {
    data: IGallery[];
    meta: Meta;
}
export const {
    useGetGalleryQuery,
    useCreateGalleryMutation,
    useUpdateGalleryMutation,
    useDeleteGalleryMutation,
    endpoints: GalleryEndpoints
} = injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        // GET ALL GALLERY IMAGES
        getGallery: query<GetAllGalleryResponse, { page?: number; searchTerm?: string; limit?: number }>({ // limit number now
            query: ({ page, searchTerm, limit }) => {
                const params = new URLSearchParams({
                    ...(page !== undefined ? { page: page.toString() } : {}),
                    ...(limit !== undefined ? { limit: limit.toString() } : {}), // convert number to string
                    ...(searchTerm ? { searchTerm } : {}),
                }).toString();

                return {
                    url: `/gallerydata?${params}`,
                };
            },
            transformErrorResponse: (response: any) => response,
            transformResponse:  (response: any) => response,
        }),


        // CREATE GALLERY IMAGE
        createGallery: mutation<GalleryResponse, FormData>({
            query: (formData) => ({
                url: '/gallerydata/create',
                method: 'POST',
                body: formData, // use FormData to handle image upload
            }),
            transformResponse: (response: GalleryResponse) => response,
            transformErrorResponse: (response: any) => response?.data,
        }),

        // UPDATE GALLERY IMAGE
        updateGallery: mutation<GalleryResponse, { id: string; data: FormData }>({
            query: ({ id, data }) => ({
                url: `/gallerydata/${id}`,
                method: 'PATCH',
                body: data,
            }),
            transformResponse: (response: GalleryResponse) => response,
            transformErrorResponse: (response: any) => response?.data,
        }),

        // DELETE GALLERY IMAGE
        deleteGallery: mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/gallerydata/${id}`,
                method: 'DELETE',
            }),
            transformResponse: (response: any) => response,
            transformErrorResponse: (response: any) => response?.data,
        }),

    }),
});
