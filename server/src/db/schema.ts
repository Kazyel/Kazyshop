import { int } from "drizzle-orm/mysql-core";
import {
    text,
    timestamp,
    pgTable,
    uuid,
    json,
    integer,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name"),
    email: text("email").unique(),
    password: text("password"),
    role: text("role").default("user"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
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
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    trending_score: integer("trending_score").default(0),
});
