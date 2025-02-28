import jwt from "jsonwebtoken";

export const create = async (user) => {
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "10m",
    });

    return token;
};
