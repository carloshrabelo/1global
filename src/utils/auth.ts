import { NextRequest } from "next/server";
import Cookies from "universal-cookie";

import { USER_TOKEN } from "@/utils/constants";

const cookies = new Cookies();

export const login = (token: string) => cookies.set(USER_TOKEN, token);

export const logout = () => cookies.remove(USER_TOKEN);

export const verifyAuthFE = () => !!cookies.get(USER_TOKEN);

export const verifyAuth = (req: NextRequest) => {
  const token = req.cookies.get(USER_TOKEN);
  return !!token?.value;
};
