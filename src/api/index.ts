enum RESTMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface APIResponse<T> {
  data?: T;
  error?: {
    statusCode: number;
    description: string;
    message: string;
    isOperational: boolean;
  };
}

const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem('token') || '';

const fetcher = async <T>(
  route: string,
  method: RESTMethods = RESTMethods.GET,
  body?: string
): Promise<APIResponse<T>> => {
  const response: Response = await fetch(`${API_URL}${route}`, {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    mode: 'cors',
    cache: 'default',
    credentials: 'include',
    body: body,
  });
  const responseData: APIResponse<T> = await response.json();
  return responseData;
};

const getRequest = async <T>(route: string): Promise<APIResponse<T>> => {
  const getResponseData: APIResponse<T> = await fetcher(route, RESTMethods.GET);
  return getResponseData;
};

const postRequest = async <T>(
  route: string,
  body?: string
): Promise<APIResponse<T>> => {
  const getResponseData: APIResponse<T> = await fetcher(
    route,
    RESTMethods.POST,
    body
  );
  return getResponseData;
};

const deleteRequest = async <T>(route: string): Promise<APIResponse<T>> => {
  const deleteResponseData: APIResponse<T> = await fetcher(
    route,
    RESTMethods.DELETE
  );
  return deleteResponseData;
};

export { getRequest, postRequest, deleteRequest };
