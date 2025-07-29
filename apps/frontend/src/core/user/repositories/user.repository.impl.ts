
import {  userApiDataSource } from '../dataSources/user.api.datasource';
import { PaginatedResponse } from '../domain/paginated-response.entity';
import { User } from '../domain/user.entity';
import { UserRepository } from '../domain/user.repository';

export class UserRepositoryImpl implements UserRepository {
  async getUsers(page: number, limit: number): Promise<PaginatedResponse<User>> {
    const paginatedApiResult = await userApiDataSource.getUsers(page, limit);
    
    return {
      ...paginatedApiResult,
      data: paginatedApiResult.data.map((user) => ({
        id: user._id,
        ...user
      })),
    };
  }

  async findById(id: string): Promise<User | null> {
    const apiUser = await userApiDataSource.findById(id);
    if (!apiUser) {
      return null;
    }
    return  {
      id: apiUser._id,
      ...apiUser
    }
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const apiUser = await userApiDataSource.create(user);
    return {
      id: apiUser._id,
      ...apiUser
    };
  }

  async update(id: string, user: Partial<Omit<User, 'id'>>): Promise<User> {
    const updatedApiUser = await userApiDataSource.update(id, user);
    return {
      id: updatedApiUser._id,
      ...updatedApiUser
    };
  }

  async delete(id: string): Promise<void> {
    return userApiDataSource.delete(id);
  }
}
