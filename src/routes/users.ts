import { Hono } from "hono";
import { validator } from "hono/validator";
import { validLimit } from "../middlewares/validators";
import {
    createUser,
    getUserByID,
    getUsers,
    loginUser,
} from "../handlers/users";

const userRoutes = new Hono();

userRoutes.get(
    "/get-users/:limit",
    validator("param", (value, c) => validLimit(value, c)),
    getUsers
);
userRoutes.get("/get-user/:id", getUserByID);

userRoutes.post("/create-user", createUser);
userRoutes.post("/login", loginUser);

/**
 * TODO: Implement the delete specific user route.
 * TODO: Implement the update specific user route.
 * TODO: Implement the get specific user route.
 */
userRoutes.get("/delete-user/:id");
userRoutes.get("/update-user/:id");

export default userRoutes;
