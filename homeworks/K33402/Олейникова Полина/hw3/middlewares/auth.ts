import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UserService from '../services/users/UserService';
import { UserAttributes } from '../models/users/User';

require('dotenv').config();

if (!process.env.SECRET_KEY) {
  throw new Error('Missing SECRET_KEY in environment variables');
}

export const SECRET_KEY: Secret = process.env.SECRET_KEY;
export interface CustomRequest extends Request {
  user: UserAttributes;
}

const userService = new UserService();

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error('Missing token');
    }

    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    const userData = await userService.getById(decoded.id);

    if (!userData) {
      throw new Error('User not found');
    }

    (req as CustomRequest).user = userData;
    next();
  } catch (err) {
    res.status(401).send({ "error": 'Please authenticate' });
  }
};
