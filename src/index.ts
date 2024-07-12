import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { protectRoute } from "./middlewares/auth";
import dotenv from "dotenv";
import userRoutes from "./routes/users";
import clothesRoutes from "./routes/clothes";

dotenv.config({ path: "./.env" });
type Variables = {
    user: { name: string; password: string };
};

const app = new Hono<{ Variables: Variables }>();
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
app.route("/api/clothes", clothesRoutes);

console.log(`Server is running on port ${port}`);
serve({
    fetch: app.fetch,
    port,
});
