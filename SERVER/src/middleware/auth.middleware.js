import { verifyToken } from "#services/jwt.service.js";

export const authenticate =  async (req, res, next) => {
    const token = req.cookies.token; //req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = await verifyToken(token);
    if (!decoded) return res.status(403).json({ message: "Forbidden" });
    req.auth = decoded;
    next();
};

export const viewAuthenticate =  async (req, res, next) => {
    const token = req.cookies.token; //req.headers.authorization?.split(" ")[1];
    if (!token) res.render('signin');
    const decoded = await verifyToken(token);
    if (!decoded) res.render('signin');
    req.auth = decoded;
    next();
};
    