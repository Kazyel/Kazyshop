import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { protectRoute } from "./middlewares/auth";
import * as dotenv from "dotenv";
import userRoutes from "./routes/users";

dotenv.config();
const app = new Hono();
const port = 3000;

// Middlewares
app.use(logger());
app.use("/api/*", cors());
app.use("/api/clothes/*", protectRoute);

// Routes
app.get("/", (c) => {
    return c.html(`<h1>Hello Hono!</h1>`);
});

app.route("/api/users", userRoutes);

console.log(`Server is running on port ${port}`);
serve({
    fetch: app.fetch,
    port,
});
