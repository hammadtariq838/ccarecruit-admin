import { StatusCodes } from "@/utils/constants";

export const statusMessages = (code: number) => {
  if (code === StatusCodes.BAD_REQUEST) {
    return "It seems there’s an issue with your request. Kindly review and try again.";
  }
  if (code === StatusCodes.UNAUTHORIZED) {
    return "Unauthorized, Please log in again to continue";
  }
  if (code === StatusCodes.NOT_FOUND) {
    return "Oops! Record Not found!";
  }
  if (code === StatusCodes.INTERNAL_SERVER_ERROR) {
    return "Something went wrong on our end. We’re working to fix it! Please try again later.";
  }
  if (code === StatusCodes.CONFLICT) {
    return "An account with this email already exists. Please use a different email or log in.";
  }
  return "Encountered error. Please try again.";
};
