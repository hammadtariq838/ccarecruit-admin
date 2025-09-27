"use server";

import { cookies } from "next/headers";
import { CookieKeys } from "@/utils/constants";
import { AuthResponseType, UserType } from "@/utils/typeDefs";
import { login } from "@/requests/client/auth";
import { ErrorHandlerResponseType, handleApiError } from "@/utils/errorHandler";

const getTokenOnLoginAction = async (
  email: string,
  password: string
): Promise<UserType | ErrorHandlerResponseType> => {
  try {
    const response: AuthResponseType = await login({
      email,
      password,
    });

    const cookie = await cookies();

    const {
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
      user,
    } = response;

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
    return handleApiError(error);
  }
};

export default getTokenOnLoginAction;
