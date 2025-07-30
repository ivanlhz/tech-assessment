import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const mockUser = {
  _id: 'some-id',
  name: 'Test',
  lastName: 'User',
  email: 'test@example.com',
};

const mockUsersService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        username: 'testuser',
      };
      mockUsersService.create.mockResolvedValue(mockUser);

      const result = await controller.create(createUserDto);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const paginatedResult = {
        data: [mockUser],
        total: 1,
        page: 1,
        limit: 10,
        lastPage: 1,
      };
      mockUsersService.findAll.mockResolvedValue(paginatedResult);
      const paginationQuery = { page: 1, limit: 10 };
      const result = await controller.findAll(paginationQuery);
      expect(service.findAll).toHaveBeenCalledWith(paginationQuery);
      expect(result).toEqual(paginatedResult);
    });
  });

  describe('findOne()', () => {
    it('should return a single user', async () => {
      mockUsersService.findOne.mockResolvedValue(mockUser);
      const result = await controller.findOne('some-id');
      expect(service.findOne).toHaveBeenCalledWith('some-id');
      expect(result).toEqual(mockUser);
    });
  });

  describe('update()', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = { name: 'Updated Name' };
      const updatedUser = { ...mockUser, ...updateUserDto };
      mockUsersService.update.mockResolvedValue(updatedUser);

      const result = await controller.update('some-id', updateUserDto);
      expect(service.update).toHaveBeenCalledWith('some-id', updateUserDto);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('remove()', () => {
    it('should remove a user', async () => {
      mockUsersService.remove.mockResolvedValue(mockUser);
      const result = await controller.remove('some-id');
      expect(service.remove).toHaveBeenCalledWith('some-id');
      expect(result).toEqual(mockUser);
    });
  });
});
