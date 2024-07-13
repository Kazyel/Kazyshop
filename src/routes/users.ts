import { Hono } from "hono";
import { validator } from "hono/validator";
import {
    createUser,
    getUsers,
    loginUser,
    searchUsers,
} from "../handlers/users";
import { validLimit } from "../middlewares/validators";

const userRoutes = new Hono();

userRoutes.get(
    "/get-users/:limit",
    validator("param", (value, c) => validLimit(value, c)),
    getUsers
);

userRoutes.post("/login", loginUser);
userRoutes.post("/search-users", searchUsers);
userRoutes.post("/create-user", createUser);

export default userRoutes;
