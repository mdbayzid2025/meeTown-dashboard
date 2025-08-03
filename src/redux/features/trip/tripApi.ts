import { baseApi } from "../../base/baseAPI";

const tripApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTrips: builder.query({
      query: () => {
        return {
          url: `/trips${location.search}`,
          method: "GET",
        };
      },
    }),    
    getPopularTrips: builder.query({
      query: ()=>`/trips/popular-trips`,      
      transformResponse: (res: {data: any})=> res?.data
    })
  }),
});

export const { useGetTripsQuery, useGetPopularTripsQuery } = tripApi;
