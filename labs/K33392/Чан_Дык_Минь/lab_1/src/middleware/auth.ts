import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from "express";
import dotenv from 'dotenv';
dotenv.config();

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}

export const auth: RequestHandler = async(req, res, next) => {
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');
   if (!token) {
     throw new Error();
   }
   const decoded = jwt.verify(token, process.env.SECRET_KEY as Secret);
   (req as CustomRequest).token = decoded;
   next();
 } catch (err) {
   res.status(401).send('Please authenticate');
 }
};