"use server";

import { AuthResponseType, UserType } from "@/utils/typeDefs";
import { register } from "@/requests/client/auth";
import { ErrorHandlerResponseType, handleApiError } from "@/utils/errorHandler";
import { cookies } from "next/headers";
import { CookieKeys } from "@/utils/constants";

const getTokenOnSignupAction = async (
  name: string,
  email: string,
  password: string
): Promise<UserType | ErrorHandlerResponseType> => {
  try {
    const response: AuthResponseType = await register({
      name,
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

export default getTokenOnSignupAction;
