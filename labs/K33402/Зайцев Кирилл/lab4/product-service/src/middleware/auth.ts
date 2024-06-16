import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Получаем токен без "Bearer "

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, 'SECRET_KEY', (err: VerifyErrors | null, decoded: any) => { // Используйте тот же секретный ключ
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        (req as any).user = decoded;
        next();
    });
};

