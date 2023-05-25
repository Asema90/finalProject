import { restApi } from '@/api';
import { Auth, Cridentials, User } from '@/types';

const authApi = restApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<Auth, Cridentials>({
      query: (cridentials) => ({ url: '/auth/login', method: 'POST', data: cridentials }),
    }),

    register: builder.mutation<Auth, User>({
      query: (data) => ({ url: '/auth/register', method: 'POST', data }),
    }),
  }),
});

export default authApi;
