// import { createApi } from "@reduxjs/toolkit/query/react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://10.10.7.7:5002/api/v1",
        prepareHeaders: (headers)=>{
            const token = Cookies.get("accessToken");
            console.log('asdasd', token)
            if(token){
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: ()=>({}),
    tagTypes: ["user"]
})