import { QueryLifecyclePromises } from "@/types/utils";
import { login, logout } from "@/utils/auth";
import { baseApi } from ".";

export type SignUpData = {
  email: string;
  password: string;
};

export type SignInResponse = {
  token: string;
};

export type SignUpResponse = SignInResponse & {
  id: string;
};

const authOnQueryEnd = (
  _: SignUpData,
  { queryFulfilled }: QueryLifecyclePromises<SignInResponse>,
) => {
  queryFulfilled.then(({ data }) => data?.token && login(data.token));
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<SignUpResponse, SignUpData>({
      query: (body) => ({
        url: "register",
        method: "POST",
        body,
      }),
      onQueryStarted: authOnQueryEnd,
    }),
    signIn: build.mutation<SignInResponse, SignUpData>({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),
      onQueryStarted: authOnQueryEnd,
    }),
    signOut: build.query<void, void>({
      query: () => ({
        url: "logout",
        method: "DELETE",
      }),
      onQueryStarted: (_, { queryFulfilled }) => queryFulfilled.then(logout),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutQuery,
  useLazySignOutQuery,
} = authApi;
