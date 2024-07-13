import { createToken, hashPassword } from "../middlewares/auth";
import { Context } from "hono";
import { user } from "../db/schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";

export const createUser = async (c: Context) => {
    const { name, email, password } = await c.req.json();
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

export const getUser = async (c: Context) => {
    const { name } = await c.req.json();

    if (!name) {
        return c.json(
            { message: "Please, provide a name to search for." },
            400
        );
    }

    try {
        const foundUsers = await db
            .select({
                id: user.id,
                name: user.name,
                email: user.email,
            })
            .from(user)
            .where(eq(user.name, name));

        return c.json({ users: foundUsers });
    } catch (error: any) {
        return c.json({ message: `Error: ${error.message}` }, 400);
    }
};
