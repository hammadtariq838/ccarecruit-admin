import { toast } from 'sonner';
import { statusMessages } from './statusMessages';
import { ApiErrorResponseType, UserType } from './typeDefs';

export interface ErrorHandlerResponseType {
  status: number;
  message: string;
}

export const isErrorHandlerResponseType = (
  response: ErrorHandlerResponseType | UserType
): response is ErrorHandlerResponseType => {
  return 'message' in response;
};

const showErrorNotification = (errorMessage?: string) => {
  if (typeof window !== 'undefined') {
    toast.error(
      errorMessage ?? 'An unexpected error occurred'
    );
  }
};

export const handleApiError = (
  error: unknown
): ErrorHandlerResponseType => {
  const apiError = error as ApiErrorResponseType;

  if (apiError.response?.data?.error) {
    const errorMessage =
      apiError.response.data?.error.message ??
      statusMessages(apiError.response.status);
    showErrorNotification(errorMessage);
    return {
      status: apiError.response.status,
      message: errorMessage,
    };
  } else {
    showErrorNotification();
    return {
      status: 500,
      message: 'An unexpected error occurred',
    };
  }
};
