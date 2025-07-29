import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUserUseCase } from '../core/dependencies';
import { User } from '../core/user/domain/user.entity';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, Omit<User, 'id'>>({
    mutationFn: (user) => createUserUseCase.execute(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
