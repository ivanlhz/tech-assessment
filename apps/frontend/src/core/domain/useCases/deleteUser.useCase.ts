import { UserRepository } from '../repositories/user.repository';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(id: string) {
    return this.userRepository.delete(id);
  }
}
