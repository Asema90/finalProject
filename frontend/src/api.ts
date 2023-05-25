import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import cookies from 'js-cookie';
import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';

import { ServerError } from '@/types';
import { Cookies, HOST_NAME } from '@/utils/constants';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? HOST_NAME + '/api/' : '/api/',
});

axiosInstance.interceptors.request.use((config) => {
  const { headers } = config;
  const token = JSON.parse(cookies.get(Cookies.TOKEN) || 'null');

  if (token) headers['Authorization'] = 'Bearer ' + token;
  return config;
});

axiosInstance.interceptors.response.use(
  (config) => config,
  async (error) => {
    if (error.response.status === 401) {
      try {
        cookies.remove(Cookies.TOKEN, { path: '/' });
      } catch (error) {
        console.error(error);
      }
    }

    throw error;
  },
);

const axiosBaseQuery = (): BaseQueryFn<AxiosRequestConfig, unknown, unknown> => async (config) => {
  try {
    return await axiosInstance(config);
  } catch (error) {
    const { response, message } = error as AxiosError<{ message: string }>;

    return {
      error: {
        status: response?.status,
        data: response?.data?.message ?? message ?? response?.data,
      } as ServerError,
    };
  }
};

export const restApi = createApi({
  reducerPath: 'restApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['User', 'Users', 'Child', 'Children', 'ChildGrowthHistory', 'ChildGrowthHistories'],
  endpoints: () => ({}),
});
