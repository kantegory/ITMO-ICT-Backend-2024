import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';

class UserService {
  public static async createUser(name: string, email: string): Promise<User> {
    return UserRepository.createUser(name, email);
  }

  public static async getUserById(id: number): Promise<User | null> {
    return UserRepository.getUserById(id);
  }

  public static async deleteUser(id: number): Promise<boolean> {
    return UserRepository.deleteUser(id);
  }
}

export { UserService };