import { text, timestamp, pgTable, uuid, json } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: uuid("id").defaultRandom(),
    name: text("name"),
    email: text("email").unique(),
    password: text("password"),
    role: text("role").default("user"),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
});

export const clothes = pgTable("clothes", {
    id: uuid("id").defaultRandom().primaryKey(),
    data: json("data").$type<{
        name: string;
        description: string;
        price: number;
        tags: string[];
        imageUrl: string;
    }>(),
});
