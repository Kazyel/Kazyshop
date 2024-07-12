import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dbCredentials: {
        host: process.env.DB_HOST as string,
        port: process.env.DB_PORT as unknown as number,
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        database: process.env.DB_NAME as string,
    },
    dialect: "postgresql",
    schema: "./src/db/schema.ts",
    out: "./src/db/migrations",
});
