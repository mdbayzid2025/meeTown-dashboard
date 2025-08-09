import { baseApi } from "../../base/baseAPI";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({      
      query: () =>`/users${location.search}`,
      transformResponse: (response: { data: any }) => response.data,
    }),
    getAdmin: build.query({
        query: ()=> `/users${location.search}`,
        transformResponse: (response: {data: any})=> response.data,
    }),
    getProfile: build.query({
        query: ()=> `/users/profile`,
        transformResponse: (response: {data: any})=> response.data,
    }),
    createAdmin: build.mutation({
      query: (data)=>{
        return {
          url: "/users/create-admin",
          method: "POST",
          body: data
        }
      }
    }),
    editProfile: build.mutation({
      query: (data)=>{
        return {
        url: '/users/profile',
        method: "PATCH",
        body: data,
        }
      }
    }),
    updateStatus: build.mutation({
      query: (id)=>{
        console.log("id", id);        
        return {
          url: `/users/toggle-status/${id}`,
          method: "PATCH",
        }
      }
    }),
    deleteUser: build.mutation({
      query: (id)=>{
        return {
          url: `/users/${id}`,
          method: "DELETE"
        }
      }
    }),
    getAllSubscriber: build.query({
      query: ()=>`/subscriptions${location?.search}`,
      transformResponse: (res: {data:any})=>res?.data
    })
  }),
});

export const { 
    useGetUsersQuery,
    useGetAdminQuery,
    useGetProfileQuery,
    useGetAllSubscriberQuery,

    useDeleteUserMutation,
    useEditProfileMutation,
    useCreateAdminMutation,
    useUpdateStatusMutation,
 } = userApi;
