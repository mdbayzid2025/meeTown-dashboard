import { baseApi } from "../../base/baseAPI";

const userApi = baseApi.injectEndpoints({
    endpoints: (build)=>({
        getUsers: build.query({
            query: ()=> "/users?role=USER",
            transformResponse: (response: {data: any})=> response.data,
        }),
    })
})


export const {
    useGetUsersQuery
} = userApi;