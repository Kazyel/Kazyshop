import { Hono } from "hono";
import { clothes } from "../db/schema";
import { db } from "../db/db";
import { inArray } from "drizzle-orm";

const clothesRoutes = new Hono();

/**
 * Get all clothes or filtered clothes by tags.
 */
clothesRoutes.get("/get-clothes", async (c) => {
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
 * Add a new cloth to the database.
 * TODO: Add validation.
 */
clothesRoutes.post("/add-clothes", async (c) => {
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

export default clothesRoutes;
