import { baseApi } from "../../base/baseAPI";

const tripApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTrips: builder.query({
      query: () => {
        return {
          url: "/trips",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetTripsQuery } = tripApi;
