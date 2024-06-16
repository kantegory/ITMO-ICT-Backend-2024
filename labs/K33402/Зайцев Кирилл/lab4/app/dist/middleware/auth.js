import jwt from 'jsonwebtoken';
export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    try {
        req.user = jwt.verify(token, 'SECRET_KEY');
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
//# sourceMappingURL=auth.js.map