import User, { UserAttributes } from "../../models/users/User";
import checkPassword from "../../utils/password/check";
import hashPassword from "../../utils/password/hash";

class UserService {
  async getById(id: number): Promise<User> {
    try {
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        throw new Error("Not Found");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const user = await User.findAll({
        attributes: { exclude: ["password"] },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(
    user: UserAttributes,
    userData: Pick<UserAttributes, "firstname" | "lastname" | "email">
  ): Promise<User> {
    try {
      const [updatedRowsCount, updatedUser] = await User.update(
        {
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email,
        },
        {
          where: { id: user.id },
          returning: true,
        }
      );

      if (updatedRowsCount === 0) {
        throw new Error("User not found");
      }
      return updatedUser[0];
    } catch (error) {
      throw error;
    }
  }

  async changePassword<
    Body extends { oldPassword: string; newPassword: string }
  >(user: UserAttributes, userData: Body): Promise<User> {
    try {
      if (!checkPassword(user, userData.oldPassword)) {
        throw new Error("Password is not correct");
      }
      const [updatedRowsCount, updatedUser] = await User.update(
        { password: hashPassword(userData.newPassword) },
        {
          where: { id: user.id },
          returning: true,
        }
      );

      if (updatedRowsCount === 0) {
        throw new Error("User not found");
      }
      return updatedUser[0];
    } catch (error) {
      throw error;
    }
  }

  async delete(user: UserAttributes): Promise<number> {
    try {
      const deletedRowsCount = await User.destroy({ where: { id: user.id } });
      if (deletedRowsCount === 0) {
        throw new Error("User not found");
      }
      return deletedRowsCount;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
