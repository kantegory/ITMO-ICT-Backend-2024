import UserRepository from "../repositories/UserRepository";

export default class UserService {
  static async getAllUsers() {
    return UserRepository.getAllUsers();
  }

  static async getUserById(id: number) {
    return UserRepository.getUserById(id);
  }

  static async createUser(userData: any) {
    return UserRepository.createUser(userData);
  }

  static async updateUser(id: number, userData: any) {
    return UserRepository.updateUser(id, userData);
  }

  static async deleteUser(id: number) {
    return UserRepository.deleteUser(id);
  }
}
