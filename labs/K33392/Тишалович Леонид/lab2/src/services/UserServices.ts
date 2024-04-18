import { Sequelize } from "sequelize-typescript";
import User from "../models/User";
import { Repository } from "sequelize-typescript";

export default class UserService {
  private static userRepository: Repository<User>;

  static initialize(sequelizeInstance: Sequelize): void {
    UserService.userRepository = sequelizeInstance.getRepository(User);
  }
  static async getAllUsers() {
    return this.userRepository.findAll();
  }

  static async getUserById(id: number) {
    return this.userRepository.findByPk(id);
  }

  static async getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }

  static async createUser(userData: any) {
    return this.userRepository.create(userData);
  }

  static async updateUser(id: number, userData: any) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.update(userData);
    return user;
  }

  static async deleteUser(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();
  }
}
