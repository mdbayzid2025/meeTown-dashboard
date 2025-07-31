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
    })
  }),
});

export const { 
    useGetUsersQuery,
    useGetAdminQuery,
 } = userApi;
