import { User } from "../models";

export default class UserRepository {
  static getAllUsers() {
    return User.findAll();
  }

  static getUserById(id: number) {
    return User.findByPk(id);
  }

  static createUser(userData: any) {
    return User.create(userData);
  }

  static async updateUser(id: number, userData: any) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.update(userData);
    return user;
  }

  static async deleteUser(id: number) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();
  }
}
