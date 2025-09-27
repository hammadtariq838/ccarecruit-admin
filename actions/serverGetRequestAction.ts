"use server";

import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { CookieKeys } from "@/utils/constants";
import { doGet, doPost } from "@/requests";
import { permanentRedirect } from "next/navigation";
import { APP_ROUTES } from "@/utils/appRoutes";

const serverURL = process.env.SERVER_URL as string;

const refreshAuthToken = async (refreshToken: string) => {
  const url = `${serverURL}/auth/refresh-token`;
  const body = {
    refreshToken,
  };
  const requestHeaders = {
    "Content-Type": "application/json",
  };

  try {
    const response = await doPost(url, body, requestHeaders);

    const { accessToken } = response;

    return accessToken;
  } catch (error) {
    permanentRedirect(APP_ROUTES.SIGN_IN);
  }
};

const serverGetRequestAction = async (path: string) => {
  const cookie = await cookies();
  const accessToken = cookie.get(CookieKeys.ACCESS_TOKEN)?.value;
  const refreshToken = cookie.get(CookieKeys.REFRESH_TOKEN)?.value;
  const url = `${serverURL}${path}`;
  const requestHeaders = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  try {
    return await doGet(url, requestHeaders);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        const accessToken = await refreshAuthToken(refreshToken ?? "");
        return await doGet(url, {
          ...requestHeaders,
          Authorization: `Bearer ${accessToken}`,
        });
      }
    }
  }
};

export default serverGetRequestAction;
