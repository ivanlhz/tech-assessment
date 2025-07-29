import { GetUsersUseCase } from './user/useCases/getUsers.useCase';
import { FindUserByIdUseCase } from './user/useCases/findUserById.useCase';
import { CreateUserUseCase } from './user/useCases/createUser.useCase';
import { UpdateUserUseCase } from './user/useCases/updateUser.useCase';
import { DeleteUserUseCase } from './user/useCases/deleteUser.useCase';
import { UserRepositoryImpl } from './user/repositories/user.repository.impl';

// ====================================================================================
//                                     REPOSITORIES
// ====================================================================================
// Se crea una única instancia de la implementación del repositorio para toda la app.
const userRepository = new UserRepositoryImpl();

// ====================================================================================
//                                      USE CASES
// ====================================================================================
// Se crean las instancias de los casos de uso, inyectando las dependencias (repositorios).
// La capa de UI (React) solo interactuará con estos casos de uso.
export const getUsersUseCase = new GetUsersUseCase(userRepository);
export const findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
export const createUserUseCase = new CreateUserUseCase(userRepository);
export const updateUserUseCase = new UpdateUserUseCase(userRepository);
export const deleteUserUseCase = new DeleteUserUseCase(userRepository);
