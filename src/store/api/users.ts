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
    createUsers: build.mutation<
      User,
      Omit<User, "id" | "avatar"> & PaginationParams
    >({
      // page only for cache
      query: ({ page: _page, ...body }) => ({
        url: "users",
        method: "POST",
        body,
      }),
      async onQueryStarted({ page }, { dispatch, queryFulfilled }) {
        const response = await queryFulfilled;
        const patchResult = dispatch(
          userApi.util.updateQueryData(
            "getUsers",
            { page },
            (draft: PaginationResponse<User>) => ({
              ...draft,
              data: [...draft.data, response.data],
            }),
          ),
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
    updateUser: build.mutation<User, User & PaginationParams>({
      // page only for cache
      query: ({ id, page: _page, ...body }) => ({
        url: `users/${id}`,
        method: "PUT",
        body,
      }),
      onQueryStarted({ id, page, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userApi.util.updateQueryData(
            "getUsers",
            { page },
            (draft: PaginationResponse<User>) => ({
              ...draft,
              data: draft.data.map((item) =>
                item.id === id ? { ...item, ...patch } : item,
              ),
            }),
          ),
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserMutation } = userApi;
