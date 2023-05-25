import { Attachment } from '@/types';
import { restApi } from '@/api';

const fileApi = restApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<Attachment, Blob>({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: '/upload/file',
          method: 'POST',
          data: formData,
        };
      },
    }),
  }),
});

export default fileApi;
