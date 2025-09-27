"use server";

import { cookies } from "next/headers";
import { CookieKeys } from "@/utils/constants";

const isLoggedInAction = async (): Promise<boolean> => {
  const cookie = await cookies();
  const refreshToken = cookie.get(CookieKeys.REFRESH_TOKEN);
  return refreshToken !== undefined;
};

export default isLoggedInAction;
