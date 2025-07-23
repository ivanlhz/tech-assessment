import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetUsersUseCase } from './getUsers.useCase';
import { UserRepository } from '../repositories/user.repository';
import { PaginatedResponse } from '../entities/paginated-response.entity';
import { User } from '../entities/user.entity';

// Mock del repositorio
const mockUserRepository: UserRepository = {
  getUsers: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn()
};

describe('GetUsersUseCase', () => {
  let getUsersUseCase: GetUsersUseCase;

  beforeEach(() => {
    getUsersUseCase = new GetUsersUseCase(mockUserRepository);
    vi.clearAllMocks();
  });

  describe('execute', () => {
    it('should return paginated users from repository', async () => {
      // Arrange
      const page = 1;
      const limit = 10;
      const mockPaginatedResponse: PaginatedResponse<User> = {
        data: [
          { id: '1', name: 'Juan Pérez', email: 'juan@test.com' },
          { id: '2', name: 'María García', email: 'maria@test.com' }
        ],
        total: 2,
        page: 1,
        limit: 10,
        lastPage: 1
      };

      vi.mocked(mockUserRepository.getUsers).mockResolvedValue(mockPaginatedResponse);

      const result = await getUsersUseCase.execute(page, limit);

      expect(mockUserRepository.getUsers).toHaveBeenCalledWith(page, limit);
      expect(mockUserRepository.getUsers).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockPaginatedResponse);
    });

    it('should handle different page and limit values', async () => {
      const page = 2;
      const limit = 5;
      const mockPaginatedResponse: PaginatedResponse<User> = {
        data: [
          { id: '6', name: 'Usuario 6', email: 'user6@test.com' }
        ],
        total: 11,
        page: 2,
        limit: 5,
        lastPage: 3
      };

      vi.mocked(mockUserRepository.getUsers).mockResolvedValue(mockPaginatedResponse);

      const result = await getUsersUseCase.execute(page, limit);

      expect(mockUserRepository.getUsers).toHaveBeenCalledWith(2, 5);
      expect(result).toEqual(mockPaginatedResponse);
    });

    it('should propagate repository errors', async () => {
      const page = 1;
      const limit = 10;
      const errorMessage = 'Repository error';
      vi.mocked(mockUserRepository.getUsers).mockRejectedValue(new Error(errorMessage));

      await expect(getUsersUseCase.execute(page, limit)).rejects.toThrow(errorMessage);
      expect(mockUserRepository.getUsers).toHaveBeenCalledWith(page, limit);
    });

    it('should handle empty results', async () => {
      const page = 1;
      const limit = 10;
      const mockEmptyResponse: PaginatedResponse<User> = {
        data: [],
        total: 0,
        page: 1,
        limit: 10,
        lastPage: 0
      };

      vi.mocked(mockUserRepository.getUsers).mockResolvedValue(mockEmptyResponse);

      const result = await getUsersUseCase.execute(page, limit);

      expect(mockUserRepository.getUsers).toHaveBeenCalledWith(page, limit);
      expect(result).toEqual(mockEmptyResponse);
      expect(result.data).toHaveLength(0);
    });
  });
});
