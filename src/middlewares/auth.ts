import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { createMiddleware } from "hono/factory";

/**
 * Hashes the password using argon2.
 */
export const hashPassword = async (password: string): Promise<string> => {
    const hash = await argon2.hash(password);
    return hash;
};

export const verifyPassword = async (
    password: string,
    hash: string
): Promise<boolean> => {
    try {
        return argon2.verify(hash, password);
    } catch (error: any) {
        console.log(`Error: ${error.message}`);
        return false;
    }
};

/**
 * Creates a JWT token.
 */
export const createToken = (user: {
    id: string;
    email: string;
    password: string;
}): string => {
    const token = jwt.sign(user, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
    });

    return token;
};

/**
 * Protects the route with a JWT token.
 */
export const protectRoute = createMiddleware(async (c, next) => {
    const bearerToken = c.req.header("Authorization");

    if (!bearerToken) {
        return c.json({ message: "No token provided." }, 401);
    }

    const token = bearerToken.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        c.set("user", decoded);

        await next();
    } catch (error) {
        return c.json({ message: "Invalid token" }, 401);
    }
});
