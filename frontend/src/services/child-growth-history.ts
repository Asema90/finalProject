import { AxiosRequestConfig } from 'axios';

import { restApi } from '@/api';
import { Child, ChildGrowthHistory, ListResponse } from '@/types';

const childGrowthHistoryApi = restApi.injectEndpoints({
  endpoints: (builder) => ({
    getChildGrowthHistories: builder.query<ListResponse<ChildGrowthHistory>, AxiosRequestConfig<ChildGrowthHistory>>({
      query: (config) => ({ url: '/child-growth-histories', ...config }),
      providesTags: ['ChildGrowthHistories'],
    }),

    getChildGrowthHistory: builder.query<
      ChildGrowthHistory,
      { id: ChildGrowthHistory['_id']; config?: AxiosRequestConfig<ChildGrowthHistory> }
    >({
      query: ({ id, config }) => ({ url: '/child-growth-histories/' + id, ...config }),
      providesTags: ['ChildGrowthHistory'],
    }),

    createChildGrowthHistory: builder.mutation<
      ChildGrowthHistory,
      { childId: Child['_id']; childGrowthHistory: ChildGrowthHistory }
    >({
      query: ({ childId, childGrowthHistory }) => ({
        url: `/child-growth-histories/` + childId,
        method: 'POST',
        data: childGrowthHistory,
      }),
      invalidatesTags: ['ChildGrowthHistories'],
    }),

    updateChildGrowthHistory: builder.mutation<ChildGrowthHistory, ChildGrowthHistory>({
      query: (childGrowthHistory) => ({
        url: '/child-growth-histories/' + childGrowthHistory._id,
        method: 'PUT',
        data: childGrowthHistory,
      }),
      invalidatesTags: ['ChildGrowthHistories'],
    }),

    deleteChildGrowthHistory: builder.mutation<unknown, ChildGrowthHistory>({
      query: (childGrowthHistory) => ({ url: '/child-growth-histories/' + childGrowthHistory._id, method: 'DELETE' }),
      invalidatesTags: ['ChildGrowthHistories'],
    }),
  }),
});

export default childGrowthHistoryApi;
