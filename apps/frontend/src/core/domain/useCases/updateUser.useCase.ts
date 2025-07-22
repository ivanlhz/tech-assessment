import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(id: string, user: Partial<Omit<User, 'id'>>) {
    return this.userRepository.update(id, user);
  }
}
