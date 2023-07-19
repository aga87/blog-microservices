import axios, { AxiosInstance } from 'axios';

type Headers = {
  [key: string]: string;
};

const createApiInstance = (
  baseURL: string,
  headers: Headers
): AxiosInstance => {
  return axios.create({
    baseURL,
    headers
  });
};

export const getApiInstance = () => {
  const baseURL = process.env.POSTS_SERVICE_BASE_URL || 'http://posts.com';
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  return createApiInstance(baseURL, headers);
};

export const getError = (err: unknown): string => {
  if (axios.isAxiosError(err) && err.response)
    return err.response.data.error as string; // we are returning an error object from the API
  if (err instanceof Error) return err.message;
  return 'Unknown server error';
};
