import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { CookieKeys } from "@/utils/constants";
import { NextRequest, NextResponse } from "next/server";
import { doDelete, doGet, doPatch, doPost, doPut } from "@/requests";
import { permanentRedirect } from "next/navigation";
import { APP_ROUTES } from "@/utils/appRoutes";

type RouteContext = { params: Promise<{ slug: string[] }> };

const serverURL = process.env.SERVER_URL as string;

const getTokens = async () => {
  const cookie = await cookies();
  const accessToken = cookie.get(CookieKeys.ACCESS_TOKEN)?.value;
  const refreshToken = cookie.get(CookieKeys.REFRESH_TOKEN)?.value;
  return { accessToken, refreshToken };
};

const createRoute = (slug: string[]) => {
  return slug.join("/");
};

const responseError = (msg: string | null, error: unknown) => {
  const status =
    error instanceof AxiosError ? error.response?.status || 500 : 500;

  const errorCode =
    error instanceof AxiosError && error.response?.data?.error?.code
      ? error.response.data.error.code
      : "INTERNAL_SERVER_ERROR";

  const errorMessage =
    error instanceof AxiosError && error.response?.data?.error?.message
      ? error.response.data.error.message
      : "Your session has expired, please login to continue.";

  const errorDetails =
    error instanceof AxiosError && error.response?.data?.error?.details
      ? error.response.data.error.details
      : null;

  return NextResponse.json(
    {
      success: false,
      error: {
        code: errorCode,
        message: errorMessage,
        details: errorDetails,
      },
    },
    { status }
  );
};

const logUserOut = async () => {
  const cookie = await cookies();
  cookie.delete(CookieKeys.ACCESS_TOKEN);
  cookie.delete(CookieKeys.REFRESH_TOKEN);
  permanentRedirect(APP_ROUTES.SIGN_IN);
};

const refreshToken = async (refreshToken: string) => {
  const cookie = await cookies();
  const url = `${serverURL}/auth/refresh-token`;
  const body = {
    refreshToken,
  };
  const requestHeaders = {
    "Content-Type": "application/json",
  };

  try {
    const response = await doPost(url, body, requestHeaders);

    const {
      accessToken,
      refreshToken: newRefreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
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
      value: newRefreshToken,
      httpOnly: true,
      secure: true,
      expires: new Date(refreshTokenExpiresAt),
    });

    return accessToken;
  } catch (error: unknown) {
    if (error instanceof AxiosError) console.error(error?.response);
    logUserOut();
    throw error;
  }
};

const handleRequestBody = async (request: NextRequest) => {
  const headers = request.headers;
  const contentType = headers.get("Content-Type") || "";
  let body: any;

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    body = new FormData();

    for (const [key, value] of formData.entries()) {
      body.append(key, value);
    }
  } else {
    body = await request.json();
  }

  return body;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const route = createRoute(slug);
  const searchParams = request.nextUrl.searchParams.toString();
  const headers = request.headers;
  const tokens = await getTokens();
  const url = `${serverURL}/${route}${searchParams ? `?${searchParams}` : ""}`;
  const requestHeaders = {
    Authorization: `Bearer ${tokens.accessToken}`,
    "Content-Type": headers.get("Content-Type"),
  };

  try {
    const result = await doGet(url, requestHeaders);
    return Response.json(result);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        try {
          const accessToken = await refreshToken(tokens.refreshToken ?? "");

          const result = await doGet(url, {
            ...requestHeaders,
            Authorization: `Bearer ${accessToken}`,
          });

          return Response.json(result);
        } catch (e) {
          return responseError("Request Failed", e);
        }
      } else {
        return responseError("Request Failed", error);
      }
    }
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const route = createRoute(slug);
  const headers = request.headers;
  const tokens = await getTokens();
  const url = `${serverURL}/${route}`;
  const requestHeaders = {
    Authorization: `Bearer ${tokens.accessToken}`,
    "Content-Type": headers.get("Content-Type"),
  };
  const body = await handleRequestBody(request);

  try {
    const result = await doPost(url, body, requestHeaders);
    return Response.json(result);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        try {
          const accessToken = await refreshToken(tokens.refreshToken ?? "");
          const result = await doPost(url, body, {
            ...requestHeaders,
            Authorization: `Bearer ${accessToken}`,
          });

          return Response.json(result);
        } catch (e) {
          return responseError("Request Failed", e);
        }
      } else {
        return responseError("Request Failed", error);
      }
    }
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const route = createRoute(slug);
  const searchParams = request.nextUrl.searchParams.toString();
  const headers = request.headers;
  const tokens = await getTokens();
  const url = `${serverURL}/${route}${searchParams ? `?${searchParams}` : ""}`;
  const requestHeaders = {
    Authorization: `Bearer ${tokens.accessToken}`,
    "Content-Type": headers.get("Content-Type"),
  };
  const body = await handleRequestBody(request);

  try {
    const result = await doPut(url, body, requestHeaders);
    return Response.json(result);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        try {
          const accessToken = await refreshToken(tokens.refreshToken ?? "");
          const result = await doPut(url, body, {
            ...requestHeaders,
            Authorization: `Bearer ${accessToken}`,
          });
          return Response.json(result);
        } catch (e) {
          return responseError("Request Failed", e);
        }
      } else {
        return responseError("Request Failed", error);
      }
    }
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const route = createRoute(slug);
  const searchParams = request.nextUrl.searchParams.toString();
  const headers = request.headers;
  const tokens = await getTokens();
  const url = `${serverURL}/${route}${searchParams ? `?${searchParams}` : ""}`;
  const requestHeaders = {
    Authorization: `Bearer ${tokens.accessToken}`,
    "Content-Type": headers.get("Content-Type"),
  };
  const body = await handleRequestBody(request);

  try {
    const result = await doPatch(url, body, requestHeaders);
    return Response.json(result);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        try {
          const accessToken = await refreshToken(tokens.refreshToken ?? "");
          const result = await doPatch(url, body, {
            ...requestHeaders,
            Authorization: `Bearer ${accessToken}`,
          });
          return Response.json(result);
        } catch (e) {
          return responseError("Request Failed", e);
        }
      } else {
        return responseError("Request Failed", error);
      }
    }
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const route = createRoute(slug);
  const searchParams = request.nextUrl.searchParams.toString();
  const headers = request.headers;
  const tokens = await getTokens();
  const url = `${serverURL}/${route}${searchParams ? `?${searchParams}` : ""}`;
  const requestHeaders = {
    Authorization: `Bearer ${tokens.accessToken}`,
    "Content-Type": headers.get("Content-Type"),
  };

  try {
    const result = await doDelete(url, requestHeaders);
    return Response.json(result);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        try {
          const accessToken = await refreshToken(tokens.refreshToken ?? "");
          const result = await doDelete(url, {
            ...requestHeaders,
            Authorization: `Bearer ${accessToken}`,
          });
          return Response.json(result);
        } catch (e) {
          return responseError("Request Failed", e);
        }
      } else {
        return responseError("Request Failed", error);
      }
    }
  }
}
