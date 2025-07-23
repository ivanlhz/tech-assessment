import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserRepositoryImpl } from './user.repository.impl';
import { ApiUser, userApiDataSource } from '../dataSources/user.api.datasource';
import { UserMapper } from '../mappers/user.mapper';
import { PaginatedResponse } from '../../domain/entities/paginated-response.entity';
import { User } from '../../domain/entities/user.entity';

// Mock del data source
vi.mock('../dataSources/user.api.datasource', () => ({
  userApiDataSource: {
    getUsers: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
  }
}));

// Mock del mapper
vi.mock('../mappers/user.mapper', () => ({
  UserMapper: {
    fromApiToEntity: vi.fn(),
    fromApiToEntityList: vi.fn()
  }
}));

describe('UserRepositoryImpl', () => {
  let userRepository: UserRepositoryImpl;

  beforeEach(() => {
    userRepository = new UserRepositoryImpl();
    vi.clearAllMocks();
  });

  describe('getUsers', () => {
    it('should return paginated users correctly', async () => {
      const mockApiResponse: PaginatedResponse<ApiUser> = {
        data: [
          { _id: '1', name: 'Juan', email: 'juan@test.com', createdAt: '2023-01-01' },
          { _id: '2', name: 'María', email: 'maria@test.com', createdAt: '2023-01-02' }
        ],
        total: 2,
        page: 1,
        limit: 10,
        lastPage: 1
      };

      const mockMappedUsers: User[] = [
        { id: '1', name: 'Juan', email: 'juan@test.com' },
        { id: '2', name: 'María', email: 'maria@test.com' }
      ];

      vi.mocked(userApiDataSource.getUsers).mockResolvedValue(mockApiResponse);
      vi.mocked(UserMapper.fromApiToEntityList).mockReturnValue(mockMappedUsers);

      const result = await userRepository.getUsers(1, 10);

      expect(userApiDataSource.getUsers).toHaveBeenCalledWith(1, 10);
      expect(UserMapper.fromApiToEntityList).toHaveBeenCalledWith(mockApiResponse.data);
      expect(result).toEqual({
        ...mockApiResponse,
        data: mockMappedUsers
      });
    });

    it('should handle API errors correctly', async () => {
      const errorMessage = 'API Error';
      vi.mocked(userApiDataSource.getUsers).mockRejectedValue(new Error(errorMessage));

      await expect(userRepository.getUsers(1, 10)).rejects.toThrow(errorMessage);
      expect(userApiDataSource.getUsers).toHaveBeenCalledWith(1, 10);
    });
  });

  describe('findById', () => {
    it('should return mapped user when found', async () => {
      const mockApiUser = { _id: '1', name: 'Juan', email: 'juan@test.com', createdAt: '2023-01-01' };
      const mockMappedUser: User = { id: '1', name: 'Juan', email: 'juan@test.com' };

      vi.mocked(userApiDataSource.findById).mockResolvedValue(mockApiUser);
      vi.mocked(UserMapper.fromApiToEntity).mockReturnValue(mockMappedUser);

      const result = await userRepository.findById('1');

      expect(userApiDataSource.findById).toHaveBeenCalledWith('1');
      expect(UserMapper.fromApiToEntity).toHaveBeenCalledWith(mockApiUser);
      expect(result).toEqual(mockMappedUser);
    });

    it('should return null when user not found', async () => {
      vi.mocked(userApiDataSource.findById).mockResolvedValue(null);

      const result = await userRepository.findById('nonexistent');

      expect(userApiDataSource.findById).toHaveBeenCalledWith('nonexistent');
      expect(UserMapper.fromApiToEntity).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('should handle API errors correctly', async () => {
      const errorMessage = 'API Error';
      vi.mocked(userApiDataSource.findById).mockRejectedValue(new Error(errorMessage));

      await expect(userRepository.findById('1')).rejects.toThrow(errorMessage);
      expect(userApiDataSource.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create and return mapped user', async () => {
      const newUser = { name: 'Nuevo Usuario', email: 'nuevo@test.com' };
      const mockApiUser = { _id: '3', name: 'Nuevo Usuario', email: 'nuevo@test.com', createdAt: '2023-01-03' };
      const mockMappedUser: User = { id: '3', name: 'Nuevo Usuario', email: 'nuevo@test.com' };

      vi.mocked(userApiDataSource.create).mockResolvedValue(mockApiUser);
      vi.mocked(UserMapper.fromApiToEntity).mockReturnValue(mockMappedUser);

      const result = await userRepository.create(newUser);

      expect(userApiDataSource.create).toHaveBeenCalledWith(newUser);
      expect(UserMapper.fromApiToEntity).toHaveBeenCalledWith(mockApiUser);
      expect(result).toEqual(mockMappedUser);
    });

    it('should handle creation errors correctly', async () => {
      const newUser = { name: 'Usuario', email: 'usuario@test.com' };
      const errorMessage = 'Creation failed';
      vi.mocked(userApiDataSource.create).mockRejectedValue(new Error(errorMessage));
      await expect(userRepository.create(newUser)).rejects.toThrow(errorMessage);
      expect(userApiDataSource.create).toHaveBeenCalledWith(newUser);
    });
  });

  describe('update', () => {
    it('should update and return mapped user', async () => {
      const userId = '1';
      const updateData = { name: 'Nombre Actualizado' };
      const mockUpdatedApiUser = { _id: '1', name: 'Nombre Actualizado', email: 'juan@test.com', createdAt: '2023-01-01' };
      const mockMappedUser: User = { id: '1', name: 'Nombre Actualizado', email: 'juan@test.com' };

      vi.mocked(userApiDataSource.update).mockResolvedValue(mockUpdatedApiUser);
      vi.mocked(UserMapper.fromApiToEntity).mockReturnValue(mockMappedUser);

      const result = await userRepository.update(userId, updateData);

      expect(userApiDataSource.update).toHaveBeenCalledWith(userId, updateData);
      expect(UserMapper.fromApiToEntity).toHaveBeenCalledWith(mockUpdatedApiUser);
      expect(result).toEqual(mockMappedUser);
    });

    it('should handle update errors correctly', async () => {
      const userId = '1';
      const updateData = { name: 'Nuevo Nombre' };
      const errorMessage = 'Update failed';
      vi.mocked(userApiDataSource.update).mockRejectedValue(new Error(errorMessage));
      await expect(userRepository.update(userId, updateData)).rejects.toThrow(errorMessage);
      expect(userApiDataSource.update).toHaveBeenCalledWith(userId, updateData);
    });
  });

  describe('delete', () => {
    it('should delete user successfully', async () => {
      const userId = '1';
      vi.mocked(userApiDataSource.delete).mockResolvedValue();

      await userRepository.delete(userId);

      expect(userApiDataSource.delete).toHaveBeenCalledWith(userId);
    });

    it('should handle deletion errors correctly', async () => {
      const userId = '1';
      const errorMessage = 'Deletion failed';
      vi.mocked(userApiDataSource.delete).mockRejectedValue(new Error(errorMessage));
      await expect(userRepository.delete(userId)).rejects.toThrow(errorMessage);
      expect(userApiDataSource.delete).toHaveBeenCalledWith(userId);
    });
  });
});
