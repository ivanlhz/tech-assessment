import axios from 'axios';
import { PaginatedResponse } from '../domain/paginated-response.entity';

export interface ApiUser {
  _id: string;
  id?: string; // ID opcional del DB.json original
  name: string;
  lastName: string;
  email: string;
  username: string;
  phone?: string;
  createdAt: string;
  isActive: boolean;
}

class UserApiDataSource {
  private apiClient = axios.create({
    baseURL: 'http://localhost:3000/api',
  });

  async getUsers(page: number, limit: number): Promise<PaginatedResponse<ApiUser>> {
    try {
      const response = await this.apiClient.get('/users', { params: { page, limit } });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Could not fetch users from API.');
    }
  }

  async findById(id: string): Promise<ApiUser | null> {
    try {
      const response = await this.apiClient.get<ApiUser>(`/users/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      console.error(`Error fetching user ${id}:`, error);
      throw new Error('Could not fetch user from API.');
    }
  }

  async create(user: Omit<ApiUser, '_id' | 'createdAt'>): Promise<ApiUser> {
    try {
      const response = await this.apiClient.post<ApiUser>('/users', user);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Could not create user.');
    }
  }

  async update(id: string, user: Partial<Omit<ApiUser, '_id'>>): Promise<ApiUser> {
    try {
      const response = await this.apiClient.patch<ApiUser>(`/users/${id}`, user);
      return response.data;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw new Error('Could not update user.');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.apiClient.delete(`/users/${id}`);
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw new Error('Could not delete user.');
    }
  }
}

export const userApiDataSource = new UserApiDataSource();
