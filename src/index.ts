import dotenv from "dotenv";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";

import { Variables } from "./utils/types";
import userRoutes from "./routes/users";
import clothesRoutes from "./routes/clothes";
import { serveStatic } from "@hono/node-server/serve-static";
import authRoutes from "./routes/auth";

/**
 *  Basic configuration
 */
dotenv.config();
const app = new Hono<{ Variables: Variables }>({ strict: false });

/**
 * Middlewares
 */
app.use(logger());
app.use(
    csrf({
        origin: "http://localhost:5173",
    })
);
app.use("/*", cors());
app.use("/static/*", serveStatic({ root: "./src/" }));

/**
 * Routes
 */
app.route("/auth", authRoutes);
app.route("/api/users", userRoutes);
app.route("/api/clothes", clothesRoutes);

serve(
    {
        fetch: app.fetch,
        port: Number(process.env.PORT) || 3000,
    },
    () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    }
);
