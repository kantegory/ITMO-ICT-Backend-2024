import { User } from '../models/User';

class UserService {
  async createUser(userData: { username: string; email: string; password: string }) {
    try {
      return await User.create(userData);
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  async getUserById(id: number) {
    try {
      return await User.findByPk(id);
    } catch (error) {
      throw new Error('Failed to fetch user');
    }
  }

   async deleteUser(userId: number) {
    try {
      const user = await User.findByPk(userId);
      if (user) {
        await user.destroy();
        return true; 
      }
      return false;
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  }
}

export { UserService };
