import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db/db";
import { user } from "../db/schema";
import { createToken, hashPassword, verifyPassword } from "../middlewares/auth";

const authRoutes = new Hono();

/**
 * Create a new user and return a JWT Token.
 * Requires name, email and password.
 * Password is hashed using argon2.
 */
authRoutes.post("/create-user", async (c) => {
    try {
        const { name, email, password } = await c.req.json();

        const emailExist = await db.query.user.findFirst({
            where: eq(user.email, email),
        });

        if (emailExist) {
            return c.json({ message: "Email already exists." }, 400);
        }

        const hashedPassword = await hashPassword(password);
        const userCreated = await db
            .insert(user)
            .values({
                name,
                email,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning({ id: user.id, role: user.role });

        const token = createToken({
            id: userCreated[0].id!,
            email,
            role: userCreated[0].role!,
        });

        return c.json({ message: "User created successfully.", token }, 200);
    } catch (error: any) {
        return c.json({ message: `Error: ${error.message}` }, 400);
    }
});

/**
 * Login a user and return a JWT Token.
 * Requires email and password.
 */
authRoutes.post("/login", async (c) => {
    try {
        const { email, password } = await c.req.json();

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

        if (!isPasswordValid) {
            return c.json({ message: "Incorrect password." }, 400);
        }

        const token = createToken({
            id: currentUser.id!,
            email: currentUser.email!,
            role: currentUser.role!,
        });

        return c.json({ message: "Login successful.", token }, 200);
    } catch (error: any) {
        return c.json({ message: `Error: ${error.message}` }, 400);
    }
});

export default authRoutes;
