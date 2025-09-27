"use server";

import { CookieKeys } from "@/utils/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { APP_ROUTES } from "@/utils/appRoutes";
import { AuthResponseType, UserType } from "@/utils/typeDefs";

const setCookiesOnServerAction = async (
  response: AuthResponseType
): Promise<UserType | null> => {
  try {
    const cookie = await cookies();

    const {
      user,
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
    } = response;

    if (!user || !accessToken || !refreshToken) redirect(APP_ROUTES.SIGN_IN);

    cookie.set({
      name: CookieKeys.ACCESS_TOKEN,
      value: accessToken,
      httpOnly: true,
      secure: true,
      expires: new Date(accessTokenExpiresAt),
    });

    cookie.set({
      name: CookieKeys.REFRESH_TOKEN,
      value: refreshToken,
      httpOnly: true,
      secure: true,
      expires: new Date(refreshTokenExpiresAt),
    });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default setCookiesOnServerAction;
