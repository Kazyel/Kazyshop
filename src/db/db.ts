import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const queryClient = postgres(process.env.DB_FULL as string);
export const db = drizzle(queryClient, { schema });
