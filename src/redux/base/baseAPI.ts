// import { createApi } from "@reduxjs/toolkit/query/react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://3aba34079951.ngrok-free.app/api/v1",
        // baseUrl: "http://10.10.7.7:5002/api/v1",
        prepareHeaders: (headers)=>{
            const token = Cookies.get("accessToken");               
            if(token){                
                headers.set("Authorization", `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: ()=>({}),
    tagTypes: ["user", "notifications"]
})

export const imageUrl = "http://10.10.7.7:5002";