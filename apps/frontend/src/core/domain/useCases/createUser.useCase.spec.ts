import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateUserUseCase } from './createUser.useCase';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';

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
        email: 'nuevo@example.com'
      };

      const createdUser: User = {
        id: '507f1f77bcf86cd799439011',
        name: 'Nuevo Usuario',
        email: 'nuevo@example.com'
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
        email: 'josé.maría@dominio.es'
      };

      const createdUser: User = {
        id: '507f1f77bcf86cd799439012',
        name: 'José María Ñoño',
        email: 'josé.maría@dominio.es'
      };

      vi.mocked(mockUserRepository.create).mockResolvedValue(createdUser);

      const result = await createUserUseCase.execute(newUserData);

      expect(mockUserRepository.create).toHaveBeenCalledWith(newUserData);
      expect(result).toEqual(createdUser);
    });

    it('should propagate repository errors', async () => {
      const newUserData = {
        name: 'Usuario Test',
        email: 'test@example.com'
      };

      const errorMessage = 'Email already exists';
      vi.mocked(mockUserRepository.create).mockRejectedValue(new Error(errorMessage));

      await expect(createUserUseCase.execute(newUserData)).rejects.toThrow(errorMessage);
      expect(mockUserRepository.create).toHaveBeenCalledWith(newUserData);
    });

    it('should handle empty name and email', async () => {
      const newUserData = {
        name: '',
        email: ''
      };

      const createdUser: User = {
        id: '507f1f77bcf86cd799439013',
        name: '',
        email: ''
      };

      vi.mocked(mockUserRepository.create).mockResolvedValue(createdUser);

      const result = await createUserUseCase.execute(newUserData);

      expect(mockUserRepository.create).toHaveBeenCalledWith(newUserData);
      expect(result).toEqual(createdUser);
    });
  });
});
