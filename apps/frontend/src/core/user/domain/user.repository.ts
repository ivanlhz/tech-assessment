import { User } from './user.entity';
import { PaginatedResponse } from './paginated-response.entity';

export interface UserRepository {
  getUsers(page: number, limit: number): Promise<PaginatedResponse<User>>;
  findById(id: string): Promise<User | null>;
  create(user: Omit<User, 'id'>): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}
