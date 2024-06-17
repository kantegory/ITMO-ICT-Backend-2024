import { getRepository } from 'typeorm';
import { User } from '../models/User';

export class UserService {

  public async getAllUsers() {
    const userRepository = getRepository(User);
    return userRepository.find();
  }

  public async createUser(user: Partial<User>) {
    const userRepository = getRepository(User);
    const newUser = userRepository.create(user);
    return userRepository.save(newUser);
  }
}
