import { Hono } from "hono";
import { validator } from "hono/validator";
import { Variables } from "../utils/types";
import { hashPassword, protectRoute } from "../middlewares/auth";
import { db } from "../db/db";
import { user } from "../db/schema";
import { eq } from "drizzle-orm";

const userRoutes = new Hono<{ Variables: Variables }>();

/**
 * Get all users up to a maximum of the provided limit or 25 if no limit is provided.
 * @param limit - Number of users to return. Default is 25. Max is 25.
 */
userRoutes.get(
    "/all/:limit",
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
userRoutes.get("/:id", async (c) => {
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
userRoutes.delete("/", protectRoute, async (c) => {
    const { id } = c.get("user");

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
userRoutes.patch("/", protectRoute, async (c) => {
    try {
        const { name, email, password } = await c.req.json();
        const { id } = c.get("user");

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
                updatedAt: new Date(),
            })
            .where(eq(user.id, id));

        return c.json({ message: "User updated successfully." }, 200);
    } catch (error: any) {
        return c.json({ message: `Error: ${error.message}` }, 400);
    }
});

export default userRoutes;
