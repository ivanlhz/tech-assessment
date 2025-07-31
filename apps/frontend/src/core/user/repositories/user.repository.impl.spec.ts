import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserRepositoryImpl } from './user.repository.impl';
import { userApiDataSource } from '../dataSources/user.api.datasource';
import { User } from '../domain/user.entity';
import { PaginatedResponse } from '../domain/paginated-response.entity';

// Mock del datasource
vi.mock('../dataSources/user.api.datasource', () => ({
  userApiDataSource: {
    getUsers: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
  }
}));

describe('UserRepositoryImpl', () => {
  let userRepository: UserRepositoryImpl;

  beforeEach(() => {
    userRepository = new UserRepositoryImpl();
    vi.clearAllMocks();
  });

  describe('getUsers', () => {
    it('should return paginated users with transformed ids', async () => {
      // Arrange
      const page = 1;
      const limit = 10;
      const mockApiResponse = {
        data: [
          {
            _id: '507f1f77bcf86cd799439011',
            id: 'old-id-1',
            name: 'Juan',
            lastName: 'Pérez',
            email: 'juan@test.com',
            username: 'juan.perez',
            phone: '123456789',
            createdAt: '2023-01-01T00:00:00.000Z',
            isActive: true
          },
          {
            _id: '507f1f77bcf86cd799439012',
            id: 'old-id-2',
            name: 'María',
            lastName: 'García',
            email: 'maria@test.com',
            username: 'maria.garcia',
            createdAt: '2023-01-02T00:00:00.000Z',
            isActive: false
          }
        ],
        total: 2,
        page: 1,
        limit: 10,
        lastPage: 1
      };

      const expectedResponse: PaginatedResponse<User> = {
        data: [
          {
            id: '507f1f77bcf86cd799439011',
            name: 'Juan',
            lastName: 'Pérez',
            email: 'juan@test.com',
            username: 'juan.perez',
            phone: '123456789',
            isActive: true
          },
          {
            id: '507f1f77bcf86cd799439012',
            name: 'María',
            lastName: 'García',
            email: 'maria@test.com',
            username: 'maria.garcia',
            isActive: false
          }
        ],
        total: 2,
        page: 1,
        limit: 10,
        lastPage: 1
      };

      vi.mocked(userApiDataSource.getUsers).mockResolvedValue(mockApiResponse);

      // Act
      const result = await userRepository.getUsers(page, limit);

      // Assert
      expect(userApiDataSource.getUsers).toHaveBeenCalledWith(page, limit);
      expect(userApiDataSource.getUsers).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResponse);
      expect(result.data[0].id).toBe('507f1f77bcf86cd799439011');
      expect(result.data[1].id).toBe('507f1f77bcf86cd799439012');
    });

    it('should handle empty user list', async () => {
      // Arrange
      const page = 1;
      const limit = 10;
      const mockApiResponse = {
        data: [],
        total: 0,
        page: 1,
        limit: 10,
        lastPage: 1
      };

      vi.mocked(userApiDataSource.getUsers).mockResolvedValue(mockApiResponse);

      // Act
      const result = await userRepository.getUsers(page, limit);

      // Assert
      expect(result.data).toEqual([]);
      expect(result.total).toBe(0);
    });
  });

  describe('findById', () => {
    it('should return user with transformed id when user exists', async () => {
      // Arrange
      const userId = '507f1f77bcf86cd799439011';
      const mockApiUser = {
        _id: '507f1f77bcf86cd799439011',
        id: 'old-id-1',
        name: 'Juan',
        lastName: 'Pérez',
        email: 'juan@test.com',
        username: 'juan.perez',
        phone: '123456789',
        createdAt: '2023-01-01T00:00:00.000Z',
        isActive: true
      };

      const expectedUser: User = {
        id: '507f1f77bcf86cd799439011',
        name: 'Juan',
        lastName: 'Pérez',
        email: 'juan@test.com',
        username: 'juan.perez',
        phone: '123456789',
        isActive: true
      };

      vi.mocked(userApiDataSource.findById).mockResolvedValue(mockApiUser);

      // Act
      const result = await userRepository.findById(userId);

      // Assert
      expect(userApiDataSource.findById).toHaveBeenCalledWith(userId);
      expect(userApiDataSource.findById).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedUser);
      expect(result?.id).toBe('507f1f77bcf86cd799439011');
    });

    it('should return null when user does not exist', async () => {
      // Arrange
      const userId = 'non-existent-id';
      vi.mocked(userApiDataSource.findById).mockResolvedValue(null);

      // Act
      const result = await userRepository.findById(userId);

      // Assert
      expect(userApiDataSource.findById).toHaveBeenCalledWith(userId);
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create user and return with transformed id', async () => {
      // Arrange
      const newUserData: Omit<User, 'id'> = {
        name: 'Carlos',
        lastName: 'López',
        email: 'carlos@test.com',
        username: 'carlos.lopez',
        phone: '987654321',
        isActive: true
      };

      const mockApiUser = {
        _id: '507f1f77bcf86cd799439013',
        id: 'old-id-3',
        name: 'Carlos',
        lastName: 'López',
        email: 'carlos@test.com',
        username: 'carlos.lopez',
        phone: '987654321',
        createdAt: '2023-01-03T00:00:00.000Z',
        isActive: true
      };

      const expectedUser: User = {
        id: '507f1f77bcf86cd799439013',
        name: 'Carlos',
        lastName: 'López',
        email: 'carlos@test.com',
        username: 'carlos.lopez',
        phone: '987654321',
        isActive: true
      };

      vi.mocked(userApiDataSource.create).mockResolvedValue(mockApiUser);

      // Act
      const result = await userRepository.create(newUserData);

      // Assert
      expect(userApiDataSource.create).toHaveBeenCalledWith(newUserData);
      expect(userApiDataSource.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedUser);
      expect(result.id).toBe('507f1f77bcf86cd799439013');
    });

    it('should create user without optional fields', async () => {
      // Arrange
      const newUserData: Omit<User, 'id'> = {
        name: 'Ana',
        lastName: 'Martín',
        email: 'ana@test.com',
        username: 'ana.martin',
        isActive: false
      };

      const mockApiUser = {
        _id: '507f1f77bcf86cd799439014',
        name: 'Ana',
        lastName: 'Martín',
        email: 'ana@test.com',
        username: 'ana.martin',
        createdAt: '2023-01-04T00:00:00.000Z',
        isActive: false
      };

      const expectedUser: User = {
        id: '507f1f77bcf86cd799439014',
        name: 'Ana',
        lastName: 'Martín',
        email: 'ana@test.com',
        username: 'ana.martin',
        isActive: false
      };

      vi.mocked(userApiDataSource.create).mockResolvedValue(mockApiUser);

      // Act
      const result = await userRepository.create(newUserData);

      // Assert
      expect(result).toEqual(expectedUser);
      expect(result.phone).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update user and return with transformed id', async () => {
      // Arrange
      const userId = '507f1f77bcf86cd799439011';
      const updateData: Partial<Omit<User, 'id'>> = {
        name: 'Juan Carlos',
        isActive: false
      };

      const mockUpdatedApiUser = {
        _id: '507f1f77bcf86cd799439011',
        id: 'old-id-1',
        name: 'Juan Carlos',
        lastName: 'Pérez',
        email: 'juan@test.com',
        username: 'juan.perez',
        phone: '123456789',
        createdAt: '2023-01-01T00:00:00.000Z',
        isActive: false
      };

      const expectedUser: User = {
        id: '507f1f77bcf86cd799439011',
        name: 'Juan Carlos',
        lastName: 'Pérez',
        email: 'juan@test.com',
        username: 'juan.perez',
        phone: '123456789',
        isActive: false
      };

      vi.mocked(userApiDataSource.update).mockResolvedValue(mockUpdatedApiUser);

      // Act
      const result = await userRepository.update(userId, updateData);

      // Assert
      expect(userApiDataSource.update).toHaveBeenCalledWith(userId, updateData);
      expect(userApiDataSource.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedUser);
      expect(result.id).toBe('507f1f77bcf86cd799439011');
    });

    it('should update only isActive field', async () => {
      // Arrange
      const userId = '507f1f77bcf86cd799439011';
      const updateData: Partial<Omit<User, 'id'>> = {
        isActive: true
      };

      const mockUpdatedApiUser = {
        _id: '507f1f77bcf86cd799439011',
        name: 'Juan',
        lastName: 'Pérez',
        email: 'juan@test.com',
        username: 'juan.perez',
        phone: '123456789',
        createdAt: '2023-01-01T00:00:00.000Z',
        isActive: true
      };

      const expectedUser: User = {
        id: '507f1f77bcf86cd799439011',
        name: 'Juan',
        lastName: 'Pérez',
        email: 'juan@test.com',
        username: 'juan.perez',
        phone: '123456789',
        isActive: true
      };

      vi.mocked(userApiDataSource.update).mockResolvedValue(mockUpdatedApiUser);

      // Act
      const result = await userRepository.update(userId, updateData);

      // Assert
      expect(result.isActive).toBe(true);
      expect(result).toEqual(expectedUser);
    });
  });

  describe('delete', () => {
    it('should call datasource delete method', async () => {
      // Arrange
      const userId = '507f1f77bcf86cd799439011';
      vi.mocked(userApiDataSource.delete).mockResolvedValue(undefined);

      // Act
      await userRepository.delete(userId);

      // Assert
      expect(userApiDataSource.delete).toHaveBeenCalledWith(userId);
      expect(userApiDataSource.delete).toHaveBeenCalledTimes(1);
    });

    it('should not return any value', async () => {
      // Arrange
      const userId = '507f1f77bcf86cd799439011';
      vi.mocked(userApiDataSource.delete).mockResolvedValue(undefined);

      // Act
      const result = await userRepository.delete(userId);

      // Assert
      expect(result).toBeUndefined();
    });
  });
});
