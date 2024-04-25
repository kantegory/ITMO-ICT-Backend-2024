import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv'; 
import process from 'process'; 
import { UserController } from '../controllers/users/userController';
 
dotenv.config(); 
 
const secretKey = process.env.SECRET_KEY; 
 
const authenticateToken = (req, res, next) => { 
    const authHeader = req.headers['authorization']; 
if (authHeader === undefined) return res.sendStatus(401); 
if (!authHeader.startsWith('Bearer')) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];
 
    
   
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(403).send("Access Denied: Invalid Token");
      }
      req.user = user;
      next();
    });
    
    
      
  }; 
 
export default authenticateToken;


