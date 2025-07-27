import { baseApi } from "../../base/baseAPI";

export type UserType = {
  _id: string;
  name: string;
  role: string;
  email: string;
  password: string;
  image: string;
  status: string;
  verified: boolean; 
  contact ?: string
};

const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        registerUser: build.mutation({
            query: (data)=>({
                url: "/auth/signup",
                method: "POST",
                body: data
            })
        }),
        loginAdmin: build.mutation({
            query: (data)=>({
                url: "/auth/login",
                method: "POST",
                body: data
            })
        }),
        getProfile: build.query({
            query: ()=>({
                url: "/user/profile",                
            }),
            transformResponse: (res: {data: UserType})=>res?.data
        })
    })
})

export const {
    useLoginAdminMutation,
    useRegisterUserMutation,
    useGetProfileQuery
} = authApi;