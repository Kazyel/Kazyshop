import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dbCredentials: {
        host: "localhost",
        port: 5432,
        user: "postgres",
        password: "123",
        database: "api_vue",
    },
    dialect: "postgresql",
    schema: "./src/db/schema.ts",
    out: "./drizzle",
});
