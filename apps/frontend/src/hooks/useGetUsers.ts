import { useQuery } from '@tanstack/react-query';
import { getUsersUseCase } from '../core/dependencies';

export const useGetUsers = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['users', page, limit],
    queryFn: () => getUsersUseCase.execute(page, limit),
  });
};
