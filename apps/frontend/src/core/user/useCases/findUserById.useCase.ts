import { UserRepository } from '../repositories/user.repository';

export class FindUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(id: string) {
    return this.userRepository.findById(id);
  }
}
