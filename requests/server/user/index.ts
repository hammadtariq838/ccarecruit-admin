import ServerGetRequestAction from "@/actions/serverGetRequestAction";
import { UserType } from "@/utils/typeDefs";

export const fetchUserDetailsOnServer = async () => {
  return (await ServerGetRequestAction("/user/me")) as UserType;
};

export const fetchUsersOnServer = async () => {
  return (await ServerGetRequestAction("/user")) as UserType[];
};
