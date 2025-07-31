
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
        // Transformar ApiUser a User, usando solo los campos necesarios
        return {
          id: user._id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
          phone: user.phone,
          isActive: user.isActive
        };
      }),
    };
  }

  async findById(id: string): Promise<User | null> {
    const apiUser = await userApiDataSource.findById(id);
    if (!apiUser) {
      return null;
    }
    // Transformar ApiUser a User, usando solo los campos necesarios
    return {
      id: apiUser._id,
      name: apiUser.name,
      lastName: apiUser.lastName,
      email: apiUser.email,
      username: apiUser.username,
      phone: apiUser.phone,
      isActive: apiUser.isActive
    };
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const apiUser = await userApiDataSource.create(user);
    // Transformar ApiUser a User, usando solo los campos necesarios
    return {
      id: apiUser._id,
      name: apiUser.name,
      lastName: apiUser.lastName,
      email: apiUser.email,
      username: apiUser.username,
      phone: apiUser.phone,
      isActive: apiUser.isActive
    };
  }

  async update(id: string, user: Partial<Omit<User, 'id'>>): Promise<User> {
    const updatedApiUser = await userApiDataSource.update(id, user);
    // Transformar ApiUser a User, usando solo los campos necesarios
    return {
      id: updatedApiUser._id,
      name: updatedApiUser.name,
      lastName: updatedApiUser.lastName,
      email: updatedApiUser.email,
      username: updatedApiUser.username,
      phone: updatedApiUser.phone,
      isActive: updatedApiUser.isActive
    };
  }

  async delete(id: string): Promise<void> {
    return userApiDataSource.delete(id);
  }
}
