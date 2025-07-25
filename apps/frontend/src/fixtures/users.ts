import { User } from '../components/organisms/UserTable/UserTable.types';

import { faker } from '@faker-js/faker';

export const mockUsers: User[] = Array.from({ length: 4 }).map((_, i) => ({
  id: String(i + 1),
  fullName: faker.person.fullName(),
  username: faker.internet.displayName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  status: faker.datatype.boolean() ? 'active' : 'inactive',
}));
