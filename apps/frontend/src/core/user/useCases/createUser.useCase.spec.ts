import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateUserUseCase } from './createUser.useCase';
import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';

// Mock del repositorio
const mockUserRepository: UserRepository = {
  getUsers: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn()
};

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase(mockUserRepository);
    vi.clearAllMocks();
  });

  describe('execute', () => {
    it('should create and return new user', async () => {
      const newUserData = {
        name: 'Nuevo Usuario',
        lastName: 'Apellido',
        email: 'nuevo@example.com',
        username: 'nuevo'
      };

      const createdUser: User = {
        id: '507f1f77bcf86cd799439011',
        lastName: 'Apellido',
        name: 'Nuevo Usuario',
        email: 'nuevo@example.com',
        username: 'nuevo'
      };

      vi.mocked(mockUserRepository.create).mockResolvedValue(createdUser);

      const result = await createUserUseCase.execute(newUserData);

      expect(mockUserRepository.create).toHaveBeenCalledWith(newUserData);
      expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(createdUser);
    });

    it('should handle user creation with special characters', async () => {
      const newUserData = {
        name: 'José María Ñoño',
        lastName: 'Apellido',
        email: 'josé.maría@dominio.es',
        username: 'jose'
      };

      const createdUser: User = {
        id: '507f1f77bcf86cd799439012',
        lastName: 'Apellido',
        name: 'José María Ñoño',
        email: 'josé.maría@dominio.es',
        username: 'jose'
      };

      vi.mocked(mockUserRepository.create).mockResolvedValue(createdUser);

      const result = await createUserUseCase.execute(newUserData);

      expect(mockUserRepository.create).toHaveBeenCalledWith(newUserData);
      expect(result).toEqual(createdUser);
    });

    it('should propagate repository errors', async () => {
      const newUserData = {
        name: 'Usuario Test',
        lastName: 'Apellido',
        email: 'test@example.com',
        username: 'testuser'
      };

      const errorMessage = 'Email already exists';
      vi.mocked(mockUserRepository.create).mockRejectedValue(new Error(errorMessage));

      await expect(createUserUseCase.execute(newUserData)).rejects.toThrow(errorMessage);
      expect(mockUserRepository.create).toHaveBeenCalledWith(newUserData);
    });

    it('should create a user with complete data', async () => {
      const newUserData = {
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        username: 'johndoe'
      };

      const createdUser: User = {
        id: '507f1f77bcf86cd799439013',
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        username: 'johndoe'
      };

      vi.mocked(mockUserRepository.create).mockResolvedValue(createdUser);

      const result = await createUserUseCase.execute(newUserData);

      expect(mockUserRepository.create).toHaveBeenCalledWith(newUserData);
      expect(result).toEqual(createdUser);
    });
  });
});
