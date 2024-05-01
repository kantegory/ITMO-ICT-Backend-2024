import jwt from 'jsonwebtoken';
import process from 'process';
export const authMiddlware = (req, res, next) => {
    try {
        console.log(req.path);
        if (req.path === '/users/auth' ||
            (req.path === '/users' && req.method == 'POST')) {
            next();
            return;
        }
        if (!req.headers.authorization)
            return res.status(403).json({ message: 'Unauthorized' });
        const token = req.headers.authorization.split(' ')[1];
        if (!token)
            return res.status(403).json({ message: 'Unauthorized' });
        req['user'] = jwt.verify(token, process.env.SECRET_KEY);
        next();
    }
    catch (e) {
        res.sendStatus(401);
    }
};
//# sourceMappingURL=auth.js.map