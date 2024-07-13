import { Hono } from "hono";
import { validator } from "hono/validator";
import { validLimit } from "../middlewares/validators";
import {
    createUser,
    deleteUser,
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
userRoutes.delete("/delete-user/:id", deleteUser);

/**
 * TODO: Implement the update specific user route.
 */
userRoutes.patch("/update-user/:id");

export default userRoutes;
