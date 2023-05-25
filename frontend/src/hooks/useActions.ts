import { useDispatch } from 'react-redux';

import type { AppDispatch } from '@/store';

const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};

export default useAppDispatch;
