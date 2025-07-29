import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FindUserByIdUseCase } from './findUserById.useCase';
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

describe('FindUserByIdUseCase', () => {
  let findUserByIdUseCase: FindUserByIdUseCase;

  beforeEach(() => {
    findUserByIdUseCase = new FindUserByIdUseCase(mockUserRepository);
    vi.clearAllMocks();
  });

  describe('execute', () => {
    it('should return user when found', async () => {
      const userId = '507f1f77bcf86cd799439011';
      const mockUser: User = {
        id: userId,
        name: 'Juan Pérez',
        email: 'juan.perez@example.com'
      };

      vi.mocked(mockUserRepository.findById).mockResolvedValue(mockUser);

      const result = await findUserByIdUseCase.execute(userId);

      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUser);
    });

    it('should return null when user not found', async () => {
      const userId = 'nonexistent-id';
      vi.mocked(mockUserRepository.findById).mockResolvedValue(null);

      const result = await findUserByIdUseCase.execute(userId);

      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
      expect(result).toBeNull();
    });

    it('should propagate repository errors', async () => {
      const userId = '507f1f77bcf86cd799439011';
      const errorMessage = 'Database connection error';
      vi.mocked(mockUserRepository.findById).mockRejectedValue(new Error(errorMessage));
      await expect(findUserByIdUseCase.execute(userId)).rejects.toThrow(errorMessage);
      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
    });

    it('should handle empty string id', async () => {
      const userId = '';
      vi.mocked(mockUserRepository.findById).mockResolvedValue(null);

      const result = await findUserByIdUseCase.execute(userId);

      expect(mockUserRepository.findById).toHaveBeenCalledWith('');
      expect(result).toBeNull();
    });
  });
});
