import { Hono } from "hono";
import { clothes } from "../db/schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";
import { protectRoute } from "../middlewares/auth";

const clothesRoutes = new Hono();

/**
 * Get all clothes or clothes filtered by tags.
 * @param tags - Comma separated list of tags to filter by.
 */
clothesRoutes.get("/all", async (c) => {
    try {
        const tagQuery = c.req.query("tags");
        const allClothes = await db.select().from(clothes);

        if (tagQuery) {
            const tags = tagQuery.split(",");
            let filteredClothes;

            for (const tag of tags) {
                filteredClothes = allClothes.filter((cloth) =>
                    cloth.data!.tags.includes(tag)
                );
            }

            return c.json({ clothes: filteredClothes });
        }

        return c.json({ clothes: allClothes });
    } catch (error: any) {
        return c.json({ message: `Error: ${error.message}` }, 400);
    }
});

/**
 * Get a single cloth by id.
 */
clothesRoutes.get("/:id", async (c) => {
    const id = c.req.param("id");

    try {
        const cloth = await db.query.clothes.findFirst({
            where: eq(clothes.id, id),
        });

        if (!cloth) {
            return c.json({ message: "Cloth not found." }, 400);
        }

        return c.json({ cloth });
    } catch (error: any) {
        return c.json({ message: `Error: ${error.message}` }, 400);
    }
});

/**
 * Add a new cloth to the database.
 * Requires name, description, price, tags and imageUrl.
 */
clothesRoutes.post("/", protectRoute, async (c) => {
    try {
        const { name, description, price, tags, imageUrl } = await c.req.json();

        if (!name || !description || !price || !tags || !imageUrl) {
            return c.json({ message: "Missing field(s)." }, 400);
        }

        const clothCreated = await db
            .insert(clothes)
            .values({
                data: {
                    name,
                    description,
                    price,
                    tags,
                    imageUrl,
                },
            })
            .returning();

        return c.json({ message: "Cloth created successfully.", clothCreated });
    } catch (error: any) {
        return c.json({ message: `Error: ${error.message}` }, 400);
    }
});

/**
 * Delete a cloth by id.
 */
clothesRoutes.delete("/:id", protectRoute, async (c) => {
    const id = c.req.param("id");

    try {
        const deletedCloth = await db.delete(clothes).where(eq(clothes.id, id));

        if (!deletedCloth) {
            return c.json({ message: "Cloth not found." }, 400);
        }

        return c.json({ message: "Cloth deleted successfully." }, 200);
    } catch (error: any) {
        return c.json({ message: `Error: ${error.message}` }, 400);
    }
});

/**
 * Update a cloth by id.
 */
clothesRoutes.patch("/:id", protectRoute, async (c) => {
    const id = c.req.param("id");

    try {
        const { name, description, price, tags, imageUrl } = await c.req.json();

        if (!name || !description || !price || !tags || !imageUrl) {
            return c.json({ message: "Missing field(s)." }, 400);
        }

        const clothExists = await db.query.clothes.findFirst({
            where: eq(clothes.id, id),
        });

        if (!clothExists) {
            return c.json({ message: "Cloth not found." }, 400);
        }

        await db
            .update(clothes)
            .set({
                data: {
                    name,
                    description,
                    price,
                    tags,
                    imageUrl,
                },
            })
            .where(eq(clothes.id, id));

        return c.json({ message: "Cloth updated successfully." }, 200);
    } catch (error: any) {
        return c.json({ message: `Error: ${error.message}` }, 400);
    }
});

export default clothesRoutes;
