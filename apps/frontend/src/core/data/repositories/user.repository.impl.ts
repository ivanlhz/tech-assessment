import { UserRepository } from '../../domain/repositories/user.repository';
import { PaginatedResponse } from '../../domain/entities/paginated-response.entity';
import { User } from '../../domain/entities/user.entity';
import { userApiDataSource } from '../dataSources/user.api.datasource';
import { UserMapper } from '../mappers/user.mapper';

export class UserRepositoryImpl implements UserRepository {
  async getUsers(page: number, limit: number): Promise<PaginatedResponse<User>> {
    const paginatedApiResult = await userApiDataSource.getUsers(page, limit);
    
    // Mapeamos solo el array de datos, manteniendo el resto de la paginación
    const mappedUsers = UserMapper.fromApiToEntityList(paginatedApiResult.data);

    return {
      ...paginatedApiResult,
      data: mappedUsers,
    };
  }

  async findById(id: string): Promise<User | null> {
    const apiUser = await userApiDataSource.findById(id);
    if (!apiUser) {
      return null;
    }
    return UserMapper.fromApiToEntity(apiUser);
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    // El mapper también podría usarse para convertir de entidad a DTO de API si fueran diferentes
    const apiUser = await userApiDataSource.create(user);
    return UserMapper.fromApiToEntity(apiUser);
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const updatedApiUser = await userApiDataSource.update(id, user);
    return UserMapper.fromApiToEntity(updatedApiUser);
  }

  async delete(id: string): Promise<void> {
    return userApiDataSource.delete(id);
  }
}
