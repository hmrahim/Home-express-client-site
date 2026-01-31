import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import auth from "../../../../firebase.init";
import { onAuthStateChanged } from "firebase/auth";


const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,

    prepareHeaders: (headers) => {
      onAuthStateChanged(auth,async(user)=> {
        const token = await user.getIdToken()
        if(token){
          headers.set("Authorization", `Bearer ${token}`);
        }
      })
    
   
      return headers;
    },
  }),
  tagTypes:["settings"],
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => "/settings",
      providesTags:["settings"]
    }),

    updateSettings: builder.mutation({
      query: (formData) => ({
        url: "/settings",
        method: "PUT",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ['settings']
      
    }),
    
  }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = baseApi;

export default baseApi;
