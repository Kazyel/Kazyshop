import { Hono } from "hono";

const clothesRoutes = new Hono();

clothesRoutes.get("/", async (c) => {
    return c.json({ message: "Hello, world!" });
});

export default clothesRoutes;
