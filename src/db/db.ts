import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import pg from "pg";

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const { Client } = pg;

const client = new Client({
    user: process.env.PGUSER as string,
    password: process.env.PGPASSWORD as string,
    host: process.env.PGHOST as string,
    port: process.env.PGPORT as unknown as number,
    database: process.env.PGDATABASE as string,
});

await client.connect();
export const db = drizzle(client, { schema });
