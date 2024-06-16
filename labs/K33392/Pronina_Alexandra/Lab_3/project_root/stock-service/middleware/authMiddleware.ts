import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send('Access denied');
    }

    try {
        req.user = jwt.verify(token, 'secret-key');
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
};
