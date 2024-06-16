import { User } from '../models/User';

const createUser = async (name: string, email: string, password: string): Promise<User> => {
  const user = await User.create({ name, email, password });
  return user;
};

const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const getUserById = async (id: number): Promise<User | null> => {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error: any) { 
    throw new Error('Error getting user by id: ' + error.message);
  }
}

const deleteUser = async (id: number): Promise<boolean> => {
  try {
    const deletedCount = await User.destroy({ where: { id } });
    return deletedCount > 0;
  } catch (error: any) { 
    throw new Error('Error deleting user: ' + error.message);
  }
}

export { createUser, getUserById, deleteUser, getUserByEmail };
