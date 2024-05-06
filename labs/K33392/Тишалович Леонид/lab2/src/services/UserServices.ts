import { Sequelize } from "sequelize-typescript";
import User from "../models/User";
import { Repository } from "sequelize-typescript";

export default class UserService {
  private userRepository: Repository<User>;

  constructor(sequelizeInstance: Sequelize) {
    this.userRepository = sequelizeInstance.getRepository(User);
  }

  async getAllUsers() {
    return this.userRepository.findAll();
  }

  async getUserById(id: number) {
    return this.userRepository.findByPk(id);
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }

  async createUser(userData: any) {
    return this.userRepository.create(userData);
  }

  async updateUser(id: number, userData: any) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.update(userData);
    return user;
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();
  }
}
