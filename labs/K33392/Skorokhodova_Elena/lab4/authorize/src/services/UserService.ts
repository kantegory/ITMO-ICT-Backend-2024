import { User } from '../models/User'; 

class UserService {
  public static async createUser(name: string, email: string, password: string): Promise<User> {
    return User.create({ name, email, password }); 
  }

  public static async getUserById(id: number): Promise<User | null> {
    return User.findByPk(id); 
  }

  public static async deleteUser(id: number): Promise<boolean> {
    const deletedCount = await User.destroy({ where: { id } }); 
    return deletedCount > 0;
  }
}

export { UserService };
