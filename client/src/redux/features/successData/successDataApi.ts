import { injectEndpoints } from "../../api/api";

/* =====================
   Success Data Interface
===================== */
export interface ISuccessData {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  content?: string;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
  slug: string;
}

/* =====================
   Pagination Meta
===================== */
interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

/* =====================
   Get All Success Data Response
===================== */
interface GetAllSuccessDataResponse {
  data: ISuccessData[];
  meta: Meta;
}

/* =====================
   Success Data API
===================== */
export const {
  useGetAllSuccessDataQuery,
  useGetSuccessDataBySlugQuery,
  useCreateSuccessDataMutation,
  useUpdateSuccessDataMutation,
  useDeleteSuccessDataMutation,
  endpoints: SuccessDataEndpoints,
} = injectEndpoints({
  endpoints: ({ query, mutation }) => ({

    /* =====================
       GET ALL SUCCESS DATA
    ===================== */
    getAllSuccessData: query<
      GetAllSuccessDataResponse,
      { page?: number; searchTerm?: string; limit?: string }
    >({
      query: ({ page, searchTerm, limit }) => {
        const params = new URLSearchParams({
          ...(page !== undefined ? { page: page.toString() } : {}),
          ...(limit ? { limit } : {}),
          ...(searchTerm ? { searchTerm } : {}),
        }).toString();

        return {
          url: `/successdata?${params}`,
        };
      },
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response,
    }),

    /* =====================
       GET SINGLE SUCCESS DATA
       (By Slug)
    ===================== */
    getSuccessDataBySlug: query<ISuccessData, { slug: string }>({
      query: ({ slug }) => ({
        url: `/successdata/${slug}`,
      }),
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
    }),

    /* =====================
       CREATE SUCCESS DATA
       (Supports FormData)
    ===================== */
    createSuccessData: mutation<any, Partial<ISuccessData> | FormData>({
      query: (data) => ({
        url: "/successdata/create",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),

    /* =====================
       UPDATE SUCCESS DATA
    ===================== */
    updateSuccessData: mutation<
      any,
      { id: string | undefined; data: Partial<ISuccessData> | FormData }
    >({
      query: ({ id, data }) => ({
        url: `/successdata/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),

    /* =====================
       DELETE SUCCESS DATA
    ===================== */
    deleteSuccessData: mutation<any, string>({
      query: (id) => ({
        url: `/successdata/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
    }),
  }),
});
