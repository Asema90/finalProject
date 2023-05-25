import { AxiosRequestConfig } from 'axios';

import { restApi } from '@/api';
import { Child, ListResponse } from '@/types';

const childApi = restApi.injectEndpoints({
  endpoints: (builder) => ({
    getChildren: builder.query<ListResponse<Child>, AxiosRequestConfig<Child>>({
      query: (config) => ({ url: '/children', ...config }),
      providesTags: ['Children'],
    }),

    getChild: builder.query<Child, { id: Child['_id']; config?: AxiosRequestConfig<Child> }>({
      query: ({ id, config }) => ({ url: '/children/' + id, ...config }),
      providesTags: ['Child'],
    }),

    createChild: builder.mutation<Child, Child>({
      query: (child) => ({ url: `/children`, method: 'POST', data: child }),
      invalidatesTags: ['Children'],
    }),

    updateChild: builder.mutation<Child, Child>({
      query: (child) => ({ url: '/children/' + child._id, method: 'PUT', data: child }),
      invalidatesTags: ['Child'],
    }),

    deleteChild: builder.mutation<unknown, Child>({
      query: (child) => ({ url: '/children/' + child._id, method: 'DELETE' }),
      invalidatesTags: ['Children'],
    }),
  }),
});

export default childApi;
