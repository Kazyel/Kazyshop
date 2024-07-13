import { Hono } from "hono";
import { validator } from "hono/validator";
import { createToken, hashPassword, verifyPassword } from "../middlewares/auth";
import { db } from "../db/db";
import { user } from "../db/schema";
import { eq } from "drizzle-orm";
import { Variables } from "hono/types";
import { UserContext } from "../utils/types";

const userRoutes = new Hono<{ Variables: Variables }>();

/**
 * Create a new user and return a JWT Token.
 * Requires name, email and password.
 * Password is hashed using argon2.
 */

userRoutes.post("/create-user", async (c) => {
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
            .returning({ id: user.id });

        const token = createToken({
            id: userCreated[0].id!,
            email,
            password: hashedPassword,
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
userRoutes.post("/login", async (c) => {
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
            password,
        });

        return c.json({ message: "Login successful.", token }, 200);
    } catch (error: any) {
        return c.json({ message: `Error: ${error.message}` }, 400);
    }
});

/**
 * Get all users.
 * @limit - Number of users to return. Default is 25. Max is 25.
 */
userRoutes.get(
    "/get-users/:limit",
    validator("param", (value, c) => {
        const limit = value["limit"];

        if (!limit || isNaN(Number(limit))) {
            return c.json(
                { message: "Limit must be a number and at most 50 or less." },
                400
            );
        }

        return Number(limit);
    }),
    async (c) => {
        const limit = c.req.valid("param");

        try {
            if (limit <= 25) {
                const users = await db
                    .select({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        createdAt: user.createdAt,
                    })
                    .from(user)
                    .limit(limit);
                return c.json({ users });
            }

            return c.json({ message: "Limit must be less than 50." }, 400);
        } catch (error: any) {
            return c.json({ message: `Error: ${error.message}` }, 400);
        }
    }
);

/**
 * Get a user by id.
 */
userRoutes.get("/get-user/:id", async (c) => {
    const id = c.req.param("id");

    try {
        const foundUser = await db.query.user.findFirst({
            columns: {
                password: false,
            },
            where: eq(user.id, id),
        });

        if (!foundUser) {
            return c.json({ message: "User not found." }, 400);
        }

        return c.json({ user: foundUser });
    } catch (error: any) {
        return c.json({ message: `Error: ${error.message}` }, 400);
    }
});

/**
 * Delete the logged user.
 * Requires the user to be logged in.
 */
userRoutes.delete("/delete-user", async (c) => {
    const { id } = c.get("user") as UserContext;

    try {
        const deletedUser = await db.delete(user).where(eq(user.id, id));

        if (!deletedUser) {
            return c.json({ message: "User not found." }, 400);
        }

        return c.json({ message: "User deleted successfully." }, 200);
    } catch (error: any) {
        return c.json({ message: `Error: ${error.message}` }, 400);
    }
});

/**
 * Update the logged user's information.
 * Requires the user to be logged in.
 */
userRoutes.patch("/update-user/", async (c) => {
    try {
        const { name, email, password } = await c.req.json();
        const { id } = c.get("user") as UserContext;

        if (!name && !email && !password) {
            return c.json({ message: "Missing all fields." }, 400);
        }

        const userExists = await db.query.user.findFirst({
            where: eq(user.id, id),
        });

        if (!userExists) {
            return c.json({ message: "User not found." }, 400);
        }

        const hashedPassword = await hashPassword(password);

        await db
            .update(user)
            .set({
                name,
                email,
                password: hashedPassword,
            })
            .where(eq(user.id, id));

        return c.json({ message: "User updated successfully." }, 200);
    } catch (error: any) {
        return c.json({ message: `Error: ${error.message}` }, 400);
    }
});

export default userRoutes;
