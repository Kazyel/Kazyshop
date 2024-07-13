import { Hono } from "hono";
import { validator } from "hono/validator";
import { createUser, getUsers, searchUsers } from "../handlers/users";
import { validLimit } from "../utils/validators";

const userRoutes = new Hono();

userRoutes.get(
    "/get-users/:limit",
    validator("param", (value, c) => validLimit(value, c)),
    getUsers
);

userRoutes.post("/search-users", searchUsers);
userRoutes.post("/create-user", createUser);

export default userRoutes;
