"use server";

import { cookies } from "next/headers";
import { CookieKeys } from "@/utils/constants";
import { permanentRedirect } from "next/navigation";
import { APP_ROUTES } from "@/utils/appRoutes";

const logoutAction = async () => {
  const cookie = await cookies();
  cookie.delete(CookieKeys.ACCESS_TOKEN);
  cookie.delete(CookieKeys.REFRESH_TOKEN);
  permanentRedirect(APP_ROUTES.SIGN_IN);
};

export default logoutAction;
