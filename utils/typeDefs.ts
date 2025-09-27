export type Theme = "light" | "dark" | "system";
export type MessageResponseType = {
  status: number;
  message: string;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
};

export type AuthResponseType = {
  user: UserType;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  refreshTokenExpiresAt: number;
};

export type ApiErrorType = {
  code: string;
  message: string;
  details?: string;
};

export type ApiErrorResponseType = {
  response: {
    status: number;
    data: {
      success: false;
      error: ApiErrorType;
    };
  };
};

export type Params = { [key: string]: string };
export type ParamsList = { [key: string]: string[] };
export type SearchParams = {
  [key: string]: string | undefined;
};
