import { Next } from "hono";
import { db } from "../db/db";
import { user } from "../db/schema";
import { createToken } from "../middlewares/auth";

export const createUser = async (c: any, next: Next) => {
    const body = await c.req.json();
    const { name, email, password } = body;

    const newUser = await db.insert(user).values({
        name,
        email,
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const token = createToken(c, "teste");

    return c.json({ token });
};
