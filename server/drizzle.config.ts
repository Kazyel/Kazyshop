import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dbCredentials: {
        host: process.env.PGHOST as string,
        port: process.env.PGPORT as unknown as number,
        user: process.env.PGUSER as string,
        password: process.env.PGPASSWORD as string,
        database: process.env.PGDATABASE as string,
        ssl: false,
    },
    dialect: "postgresql",
    schema: "./src/db/schema.ts",
    out: "./src/db/migrations",
});
