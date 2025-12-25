// memberApi.ts
import { injectEndpoints } from "../../api/api";

/* =====================
   Member Interface
===================== */
export interface IMember {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  image?: string;
  roleType: string;
  occupation: string;
  title: string;
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
   Get All Members Response
===================== */
interface GetAllMembersResponse {
  data: IMember[];
  meta: Meta;
}

/* =====================
   Member API
===================== */
export const {
  useGetAllMembersQuery,
  useGetMemberByIdQuery,
  useCreateMemberMutation,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
  endpoints: MemberEndpoints,
} = injectEndpoints({
  endpoints: ({ query, mutation }) => ({

    /* =====================
       GET ALL MEMBERS
       (pagination + filter)
    ===================== */
    getAllMembers: query<
      GetAllMembersResponse,
      { page?: number; limit?: string; roleType?: string }
    >({
      query: ({ page, limit, roleType }) => {
        const params = new URLSearchParams({
          ...(page !== undefined ? { page: page.toString() } : {}),
          ...(limit ? { limit } : {}),
          ...(roleType ? { roleType } : {}),
        }).toString();

        return {
          url: `/member?${params}`,
        };
      },
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response,
    }),

    /* =====================
       GET SINGLE MEMBER
       (For Edit Auto-Fill)
    ===================== */
    getMemberById: query<IMember, { id: string }>({
      query: ({ id }) => ({
        url: `/member/${id}`,
      }),
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
    }),

    /* =====================
       CREATE MEMBER
       (Supports FormData)
    ===================== */
    createMember: mutation<any, Partial<IMember> | FormData>({
      query: (data) => ({
        url: "/member/create",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),

    /* =====================
       UPDATE MEMBER
       (Supports FormData)
    ===================== */
    updateMember: mutation<
      any,
      { id: string | undefined; data: Partial<IMember> | FormData }
    >({
      query: ({ id, data }) => ({
        url: `/member/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),

    /* =====================
       DELETE MEMBER
    ===================== */
    deleteMember: mutation<any, string>({
      query: (id) => ({
        url: `/member/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
    }),
  }),
});
