import { describe, it, expect } from 'vitest';
import { UserMapper } from './user.mapper';
import { ApiUser } from '../dataSources/user.api.datasource';

describe('UserMapper', () => {
  describe('fromApiToEntity', () => {
    it('should map ApiUser to User entity correctly', () => {
      const apiUser: ApiUser = {
        _id: '507f1f77bcf86cd799439011',
        name: 'Juan Pérez',
        email: 'juan.perez@example.com',
        createdAt: '2023-01-01'
      };

      const result = UserMapper.fromApiToEntity(apiUser);

      expect(result).toEqual({
        id: '507f1f77bcf86cd799439011',
        name: 'Juan Pérez',
        email: 'juan.perez@example.com'
      });
    });

    it('should handle empty strings correctly', () => {
      const apiUser: ApiUser = {
        _id: '',
        name: '',
        email: '',
        createdAt: ''
      };

      const result = UserMapper.fromApiToEntity(apiUser);

      expect(result).toEqual({
        id: '',
        name: '',
        email: ''
      });
    });

    it('should preserve special characters in name and email', () => {
      const apiUser: ApiUser = {
        _id: '507f1f77bcf86cd799439011',
        name: 'José María Ñoño',
        email: 'josé.maría@dominio.es',
        createdAt: '2023-01-01'
      };

      const result = UserMapper.fromApiToEntity(apiUser);

      expect(result.name).toBe('José María Ñoño');
      expect(result.email).toBe('josé.maría@dominio.es');
      expect(result.id).toBe('507f1f77bcf86cd799439011');
    });
  });

  describe('fromApiToEntityList', () => {
    it('should map array of ApiUsers to array of User entities', () => {
      const apiUsers: ApiUser[] = [
        {
          _id: '507f1f77bcf86cd799439011',
          name: 'Juan Pérez',
          email: 'juan.perez@example.com',
          createdAt: '2023-01-01'
        },
        {
          _id: '507f1f77bcf86cd799439012',
          name: 'María García',
          email: 'maria.garcia@example.com',
          createdAt: '2023-01-02'
        }
      ];

      const result = UserMapper.fromApiToEntityList(apiUsers);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: '507f1f77bcf86cd799439011',
        name: 'Juan Pérez',
        email: 'juan.perez@example.com'
      });
      expect(result[1]).toEqual({
        id: '507f1f77bcf86cd799439012',
        name: 'María García',
        email: 'maria.garcia@example.com'
      });
    });

    it('should return empty array when input is empty', () => {
      const apiUsers: ApiUser[] = [];

      const result = UserMapper.fromApiToEntityList(apiUsers);

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should handle single item array', () => {
      const apiUsers: ApiUser[] = [
        {
          _id: '507f1f77bcf86cd799439011',
          name: 'Usuario Único',
          email: 'unico@example.com',
          createdAt: '2023-01-01'
        }
      ];

      const result = UserMapper.fromApiToEntityList(apiUsers);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: '507f1f77bcf86cd799439011',
        name: 'Usuario Único',
        email: 'unico@example.com'
      });
    });
  });
});
