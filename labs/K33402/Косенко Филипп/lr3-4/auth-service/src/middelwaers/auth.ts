import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UserService from '../service/users';
import { UserAtributes } from '../model/users';
// import 'dotenv/config';


// if (!process.env.SECRET_KEY) {
//   throw new Error('Missing SECRET_KEY in environment variables');
// }

export const SECRET_KEY: Secret = "TEST_MARKET_FOR_LESSON";
export interface CustomRequest extends Request {
  user: UserAtributes;
}

const userService = new UserService();

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error('Missing token');
    }

    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    const userData = await userService.getIdWithPassword(decoded.id);
  
    if (!userData) {
      throw new Error('User not found');
    }

    (req as CustomRequest).user = userData;
    next();
  } catch (err) {
    res.status(401).send({ "error": 'Please authenticate' });
  }
};



export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try{
      const token = req.header('Authorization');

      if (!token) {
        throw new Error('Missing token');
      }

      const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
      const {role} = await userService.getById(decoded.id)

      if (role != "ADMIN" ) {
        res.status(401).send("You are not an admin!")
        return
      }
      next();  
  }catch{
    res.status(401).send({ "error": 'Please send correct request' });
  }
}

export default auth