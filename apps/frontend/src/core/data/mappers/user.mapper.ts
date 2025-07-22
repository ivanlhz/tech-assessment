import { User } from '../../domain/entities/user.entity';
import { ApiUser } from '../dataSources/user.api.datasource';

export class UserMapper {
  static fromApiToEntity(apiUser: ApiUser): User {
    return {
      id: apiUser._id,
      name: apiUser.name,
      email: apiUser.email,
    };
  }

  static fromApiToEntityList(apiUsers: ApiUser[]): User[] {
    return apiUsers.map(UserMapper.fromApiToEntity);
  }
}
