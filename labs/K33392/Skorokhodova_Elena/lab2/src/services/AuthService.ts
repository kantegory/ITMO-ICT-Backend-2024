import { User } from '../models/User';
import bcrypt from 'bcrypt';
import { createUser, getUserByEmail } from '../repositories/UserRepository';
import { ProfileService } from './ProfileService';

class AuthService {
  public static async register(name: string, email: string, password: string): Promise<User> {
   
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = await createUser(name, email, hashedPassword);
    await ProfileService.createOrUpdateProfile(newUser.id, '', '');
    return newUser;
  }

  public static async login(email: string, password: string): Promise<User | null> {
    
    const user = await getUserByEmail(email);
    if (!user) {
      return null; 
    }

    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return null; 
    }

    
    return user;
  }
}

export { AuthService };
