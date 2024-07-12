import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const queryClient = postgres("postgres://postgres:123@localhost:5432/api_vue");
export const db = drizzle(queryClient, { schema });
