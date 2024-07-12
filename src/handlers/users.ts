import { createToken, hashPassword } from "../middlewares/auth";
import { Context } from "hono";
import { user } from "../db/schema";
import { db } from "../db/db";

export const createUser = async (c: Context) => {
    const { name, email, password } = await c.req.json();
    const hashedPassword = await hashPassword(password);

    await db.insert(user).values({
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const token = createToken({ name, password: hashedPassword });

    return c.json({ token });
};
