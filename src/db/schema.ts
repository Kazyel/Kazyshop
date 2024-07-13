import { text, timestamp, pgTable, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: uuid("id").defaultRandom(),
    name: text("name"),
    email: text("email").unique(),
    password: text("password"),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
});
