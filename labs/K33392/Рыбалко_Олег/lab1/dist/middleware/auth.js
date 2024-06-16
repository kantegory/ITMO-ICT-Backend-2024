export const authMiddlware = async (req, res, next) => {
    try {
        if (req.path === '/users/auth' ||
            (req.path === '/users' && req.method == 'POST')) {
            next();
            return;
        }
        if (!req.headers.authorization)
            return res.status(401);
        const token = req.headers.authorization.split(' ')[1];
        if (!token)
            return res.status(403).json({ message: 'Unauthorized' });
        console.log(`${req.protocol}://${req.hostname}/users/verify`);
        const resp = await fetch(`${req.protocol}://${req.hostname}/users/verify`, {
            method: 'POST',
            body: JSON.stringify({ token: token }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(await resp.text());
        if (!resp.ok)
            return res.sendStatus(401);
        next();
    }
    catch (e) {
        console.log(e);
        res.sendStatus(401);
    }
};
//# sourceMappingURL=auth.js.map