import { Hono, Next } from "hono";
import { createUser } from "../handlers/users";

const userRoutes = new Hono();

userRoutes.get("/", async (c) => {
    console.log(process.env.DB_URL);
    return c.text("Hello users!", 200);
});

userRoutes.post("/", createUser);

export default userRoutes;
