import { verifyToken } from "#services/jwt.service.js";
export const authenticate =  async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = await verifyToken(token);
    if (!decoded) return res.status(403).json({ message: "Forbidden" });
    req.auth = decoded;
    next();
};
