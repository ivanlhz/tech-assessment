import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(user: Omit<User, 'id'>) {
    return this.userRepository.create(user);
  }
}
