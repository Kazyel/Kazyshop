import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { createMiddleware } from "hono/factory";

/**
 * Hashes the password using argon2.
 */
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

/**
 * Creates a JWT token.
 */
export const createToken = (user: { name: string; password: string }) => {
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
        const teste = c.get("user");
        console.log(teste);

        await next();
    } catch (error) {
        return c.json({ message: "Invalid token" }, 401);
    }
});
