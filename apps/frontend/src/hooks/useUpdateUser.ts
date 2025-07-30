import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserUseCase } from '../core/dependencies';
import { User } from '../core/user/domain/user.entity';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, User>({
    mutationFn: (user) => updateUserUseCase.execute(user.id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
