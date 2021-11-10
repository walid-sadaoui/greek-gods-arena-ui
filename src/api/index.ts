enum RESTMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface APIResponse<DataResponseType> {
  data?: DataResponseType;
  error?: {
    code: number;
    description: string;
    message: string;
    isOperational: boolean;
  };
}
export interface ResponseData {
  code: number;
  message: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const fetcher = async <DataResponseType>(
  route: string,
  method: RESTMethods = RESTMethods.GET,
  body?: string
): Promise<APIResponse<DataResponseType>> => {
  const token = localStorage.getItem('token') || '';
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
  const responseData: APIResponse<DataResponseType> = await response.json();
  return responseData;
};

const getRequest = async <DataResponseType>(
  route: string
): Promise<APIResponse<DataResponseType>> => {
  const getResponseData: APIResponse<DataResponseType> = await fetcher(
    route,
    RESTMethods.GET
  );
  return getResponseData;
};

const postRequest = async <DataResponseType>(
  route: string,
  body?: string
): Promise<APIResponse<DataResponseType>> => {
  const getResponseData: APIResponse<DataResponseType> = await fetcher(
    route,
    RESTMethods.POST,
    body
  );
  return getResponseData;
};

const deleteRequest = async <DataResponseType>(
  route: string
): Promise<APIResponse<DataResponseType>> => {
  const deleteResponseData: APIResponse<DataResponseType> = await fetcher(
    route,
    RESTMethods.DELETE
  );
  return deleteResponseData;
};

export { getRequest, postRequest, deleteRequest };
