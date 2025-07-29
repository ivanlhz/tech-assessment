import { UserRepository } from "../domain/user.repository";
import { User } from "../domain/user.entity";

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(user: Omit<User, 'id'>) {
    return this.userRepository.create(user);
  }
}
