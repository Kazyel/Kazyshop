import { Hono } from "hono";
import { createUser, getUser } from "../handlers/users";

const userRoutes = new Hono();

userRoutes.post("/get-user", getUser);
userRoutes.post("/create-user", createUser);

export default userRoutes;
