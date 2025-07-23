import { describe, it, expect } from 'vitest';
import { 
  getUsersUseCase, 
  findUserByIdUseCase, 
  createUserUseCase, 
  updateUserUseCase, 
  deleteUserUseCase 
} from './dependencies';
import { GetUsersUseCase } from './domain/useCases/getUsers.useCase';
import { FindUserByIdUseCase } from './domain/useCases/findUserById.useCase';
import { CreateUserUseCase } from './domain/useCases/createUser.useCase';
import { UpdateUserUseCase } from './domain/useCases/updateUser.useCase';
import { DeleteUserUseCase } from './domain/useCases/deleteUser.useCase';

describe('Dependencies', () => {
  describe('Use Cases Instances', () => {
    it('should create GetUsersUseCase instance correctly', () => {
      expect(getUsersUseCase).toBeInstanceOf(GetUsersUseCase);
      expect(getUsersUseCase).toBeDefined();
    });

    it('should create FindUserByIdUseCase instance correctly', () => {
      expect(findUserByIdUseCase).toBeInstanceOf(FindUserByIdUseCase);
      expect(findUserByIdUseCase).toBeDefined();
    });

    it('should create CreateUserUseCase instance correctly', () => {
      expect(createUserUseCase).toBeInstanceOf(CreateUserUseCase);
      expect(createUserUseCase).toBeDefined();
    });

    it('should create UpdateUserUseCase instance correctly', () => {
      expect(updateUserUseCase).toBeInstanceOf(UpdateUserUseCase);
      expect(updateUserUseCase).toBeDefined();
    });

    it('should create DeleteUserUseCase instance correctly', () => {
      expect(deleteUserUseCase).toBeInstanceOf(DeleteUserUseCase);
      expect(deleteUserUseCase).toBeDefined();
    });
  });

  describe('Dependency Injection', () => {
    it('should ensure all use cases are different instances', () => {
      expect(getUsersUseCase).not.toBe(findUserByIdUseCase);
      expect(getUsersUseCase).not.toBe(createUserUseCase);
      expect(findUserByIdUseCase).not.toBe(createUserUseCase);
      expect(updateUserUseCase).not.toBe(deleteUserUseCase);
    });

    it('should ensure use cases are singleton instances', async () => {
      const { 
        getUsersUseCase: getUsersUseCase2,
        findUserByIdUseCase: findUserByIdUseCase2 
      } = await import('./dependencies');

      expect(getUsersUseCase).toBe(getUsersUseCase2);
      expect(findUserByIdUseCase).toBe(findUserByIdUseCase2);
    });
  });
});
