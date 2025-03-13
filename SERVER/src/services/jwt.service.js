import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET;

// 1. Create (Sign) JWT Token
// This function generates a JWT token using user details.
export const createToken = async (user) => {
    const token = jwt.sign({ id: user.id,name:user.name, email: user.email,img:user.img }, SECRET_KEY, {
        expiresIn: "1h",
    });
    return token;
};
// 2. Verify JWT Token
// This function verifies whether a given token is valid.
export const verifyToken = async (token) => {
    try {
         const decoded = jwt.verify(token, SECRET_KEY);
        return decoded; // Returns decoded token data if valid
    } catch (error) {
        return null; // Returns null if the token is invalid or expired
    }
};

// 3. Decode JWT Token (Without Verification)
// This function decodes a JWT token without verifying its signature.
export const decodeToken = (token) => {
    return jwt.decode(token); // Returns payload without verifying integrity
};

// 4. Refresh JWT Token
// This function generates a new token using old token data.
export const refreshToken = async (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY, {
            ignoreExpiration: true,
        });
        return create({ id: decoded.id, email: decoded.email }); // Generate new token
    } catch (error) {
        return null;
    }
};

// 5. Destroy (Invalidate) JWT Token
// Note: JWT is stateless; tokens cannot be directly invalidated.
// Typically, token invalidation is managed using a blacklist in a database.
export const destroyToken = async (token, blacklist) => {
    blacklist.push(token); // Add token to a blacklist array
};
