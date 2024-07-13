import { createToken, hashPassword, verifyPassword } from "../middlewares/auth";
import { Context } from "hono";
import { user } from "../db/schema";
import { db } from "../db/db";
import { eq, like } from "drizzle-orm";

export const createUser = async (c: Context) => {
    const { name, email, password } = await c.req.json();
    const hashedPassword = await hashPassword(password);

    try {
        const emailExist = await db.query.user.findFirst({
            where: eq(user.email, email),
        });

        if (emailExist) {
            return c.json({ message: "Email already exists." }, 400);
        }

        await db.insert(user).values({
            name,
            email,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const token = createToken({ email, password: hashedPassword });

        return c.json({ message: "User created successfully.", token }, 200);
    } catch (error: any) {
        return c.json({ message: `Error: ${error.message}` }, 400);
    }
};

export const getUsers = async (c: Context) => {
    const limit = c.req.valid("param" as never);

    try {
        if (limit <= 50) {
            const users = await db.select().from(user).limit(limit);
            return c.json({ users });
        }

        return c.json({ message: "Limit must be less than 50." }, 400);
    } catch (error: any) {
        return c.json({ message: `Error: ${error.message}` }, 400);
    }
};

export const searchUsers = async (c: Context) => {
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
            .where(like(user.name, `%${name}%`));

        return c.json({ users: foundUsers });
    } catch (error: any) {
        return c.json({ message: `Error: ${error.message}` }, 400);
    }
};

/**
 * TODO: Implement the delete specific user route.
 * TODO: Implement the update specific user route.
 * TODO: Implement the get specific user route.
 */

export const loginUser = async (c: Context) => {
    const { email, password } = await c.req.json();

    try {
        const currentUser = await db.query.user.findFirst({
            where: eq(user.email, email),
        });

        if (!currentUser) {
            return c.json({ message: "User not found." }, 400);
        }

        const isPasswordValid = await verifyPassword(
            password,
            currentUser.password!
        );

        console.log(isPasswordValid);

        if (!isPasswordValid) {
            return c.json({ message: "Incorrect password." }, 400);
        }

        const token = createToken({ email: currentUser.email!, password });

        return c.json({ message: "Login successful.", token }, 200);
    } catch (error: any) {
        return c.json({ message: `Error: ${error.message}` }, 400);
    }
};
