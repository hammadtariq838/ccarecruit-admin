import isLoggedInAction from "@/actions/isLoggedInAction";
import { fetchUserDetailsOnServer } from "@/requests/server/user";
import { APP_ROUTES } from "@/utils/appRoutes";
import { permanentRedirect } from "next/navigation";

export default async function Home() {
  const loggedIn = await isLoggedInAction();
  if (!loggedIn) return permanentRedirect(APP_ROUTES.SIGN_IN);

  const userData = await fetchUserDetailsOnServer();
  if (!userData) return permanentRedirect(APP_ROUTES.SIGN_IN);

  return permanentRedirect(APP_ROUTES.DASHBOARD);
}
