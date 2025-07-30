
import {  userApiDataSource } from '../dataSources/user.api.datasource';
import { PaginatedResponse } from '../domain/paginated-response.entity';
import { User } from '../domain/user.entity';
import { UserRepository } from '../domain/user.repository';

export class UserRepositoryImpl implements UserRepository {
  async getUsers(page: number, limit: number): Promise<PaginatedResponse<User>> {
    const paginatedApiResult = await userApiDataSource.getUsers(page, limit);
    
    return {
      ...paginatedApiResult,
      data: paginatedApiResult.data.map((user) => {
        // Usar siempre _id de MongoDB, ignorar cualquier campo 'id' del DB.json original
        const { id: originalId, ...userWithoutId } = user;
        return {
          id: user._id,
          ...userWithoutId
        };
      }),
    };
  }

  async findById(id: string): Promise<User | null> {
    const apiUser = await userApiDataSource.findById(id);
    if (!apiUser) {
      return null;
    }
    // Usar siempre _id de MongoDB, ignorar cualquier campo 'id' del DB.json original
    const { id: originalId, ...userWithoutId } = apiUser;
    return {
      id: apiUser._id,
      ...userWithoutId
    };
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const apiUser = await userApiDataSource.create(user);
    // Usar siempre _id de MongoDB, ignorar cualquier campo 'id' del DB.json original
    const { id: originalId, ...userWithoutId } = apiUser;
    return {
      id: apiUser._id,
      ...userWithoutId
    };
  }

  async update(id: string, user: Partial<Omit<User, 'id'>>): Promise<User> {
    const updatedApiUser = await userApiDataSource.update(id, user);
    // Usar siempre _id de MongoDB, ignorar cualquier campo 'id' del DB.json original
    const { id: originalId, ...userWithoutId } = updatedApiUser;
    return {
      id: updatedApiUser._id,
      ...userWithoutId
    };
  }

  async delete(id: string): Promise<void> {
    return userApiDataSource.delete(id);
  }
}
