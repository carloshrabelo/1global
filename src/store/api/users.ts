import { User } from "@/types/user";
import { PaginationParams, PaginationResponse } from "@/types/utils";
import { baseApi } from ".";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<PaginationResponse<User>, PaginationParams>({
      query: (params = {}) => ({
        url: "users",
        params,
      }),
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
