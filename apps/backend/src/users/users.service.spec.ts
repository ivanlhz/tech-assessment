import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

// Interfaz para el mock del modelo de Mongoose
interface MockUserModel {
  new (createUserDto: CreateUserDto): { save: jest.Mock };
  find: jest.Mock;
  findById: jest.Mock;
  create: jest.Mock;
  findByIdAndUpdate: jest.Mock;
  findByIdAndDelete: jest.Mock;
  countDocuments: jest.Mock;
  exec: jest.Mock;
}

const mockUser = {
  _id: 'some-id',
  name: 'Test User',
  lastName: 'User lastname',
  email: 'test@example.com',
  password: 'password',
};

describe('UsersService', () => {
  let service: UsersService;

  const mockUserModel = jest.fn().mockImplementation((createUserDto) => ({
    ...createUserDto,
    save: jest.fn().mockResolvedValue(mockUser),
  })) as unknown as MockUserModel;

  mockUserModel.find = jest.fn();
  mockUserModel.findById = jest.fn();
  mockUserModel.create = jest.fn().mockResolvedValue(mockUser);
  mockUserModel.findByIdAndUpdate = jest.fn();
  mockUserModel.findByIdAndDelete = jest.fn();
  mockUserModel.countDocuments = jest.fn();
  mockUserModel.exec = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name), //Esto crea el token que NestJS usa para identificar qué dependencia inyectar
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = { name: 'Test User', lastName: 'User lastname', email: 'test@example.com', password: 'password' };
      
      const result = await service.create(createUserDto);

      expect(mockUserModel).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [mockUser];
      const total = 1;
      mockUserModel.find.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(users),
      });
      mockUserModel.countDocuments.mockResolvedValue(total);

      const result = await service.findAll({ page: 1, limit: 10 });
      expect(result.data).toEqual(users);
      expect(result.total).toEqual(total);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      mockUserModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      });
      const result = await service.findOne('some-id');
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updatedUser = { ...mockUser, name: 'Updated Name' };
      mockUserModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedUser),
      });
      const result = await service.update('some-id', { name: 'Updated Name' });
      expect(result).toEqual(updatedUser);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      mockUserModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      });
      const result = await service.remove('some-id');
      expect(result).toEqual(mockUser);
    });
  });
});
