import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import pg from "pg";

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const { Client } = pg;

const client = new Client({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    database: process.env.PGDATABASE,
});

await client.connect();
export const db = drizzle(client, { schema });
