import { User } from '../../models/users/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import  sequelize  from '../../providers/db.js';
import dotenv from 'dotenv';
import { Order } from '../../models/orders/Order';

dotenv.config();

const secretKey = process.env.SECRET_KEY;


export class UserService {
  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({ email, password: hashedPassword });
    return user;
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user.id }, secretKey);
    return token;
  }

  async getAllUsersWithOrders() {
    try {
      return await User.findAll({
        include: [{
          model: Order,
          as: 'orders' 
        }]
      });
    } catch (error) {
      throw new Error('Error fetching users with orders');
    }
  }
}