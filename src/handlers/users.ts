import { createToken, hashPassword } from "../middlewares/auth";
import { Context } from "hono";
import { user } from "../db/schema";
import { db } from "../db/db";

export const createUser = async (c: Context) => {
    const body = await c.req.json();
    const { name, email, password } = body;

    const hashedPassword = await hashPassword(password);

    try {
        await db.insert(user).values({
            name,
            email,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    } catch (error: any) {
        return c.json({ message: `Error: ${error.message}` }, 400);
    }

    const token = createToken({ name, password: hashedPassword });

    return c.json({ token });
};
