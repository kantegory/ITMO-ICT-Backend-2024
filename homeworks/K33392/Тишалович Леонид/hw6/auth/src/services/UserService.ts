import { Sequelize } from "sequelize-typescript";
import User from "../models/User";
import { Repository } from "sequelize-typescript";

export default class UserService {
  private userRepository: Repository<User>;

  constructor(sequelizeInstance: Sequelize) {
    this.userRepository = sequelizeInstance.getRepository(User);
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }

  async createUser(userData: any) {
    return this.userRepository.create(userData);
  }
}
