import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API = process.env.NEXT_PUBLIC_API;

export interface SignUpData {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}

export interface SignUpResponse extends SignInResponse {
  id: string;
}

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: () => ({}),
});
