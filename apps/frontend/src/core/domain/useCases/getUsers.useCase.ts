import { UserRepository } from '../repositories/user.repository';

export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(page: number, limit: number) {
    return this.userRepository.getUsers(page, limit);
  }
}
