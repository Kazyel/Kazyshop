import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { Next } from "hono";
import { env } from "hono/adapter";

export const hashPassword = async (password: string) => {
    const hash = await argon2.hash(password);
    return hash;
};

export const verifyPassword = async (password: string, hash: string) => {
    try {
        return argon2.verify(password, hash);
    } catch (error) {
        console.log(error);
    }
};

export const createToken = (c: any, userId: string) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
    });

    return token;
};

export const protectRoute = (c: any, next: Next) => {
    const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c);

    const bearerToken = c.req.header("Authorization");

    if (!bearerToken) {
        return c.json({ message: "No token provided." }, 401);
    }

    const token = bearerToken.split(" ")[1];

    if (token !== "Bearer ") {
        return c.json({ message: "Please provide a valid bearer token." }, 401);
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        c.user = decoded;
        next();
    } catch (error) {
        return c.json({ message: "Invalid token" }, 401);
    }

    next();
};
