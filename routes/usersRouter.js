import express from "express";
import { registerUser } from "../controllers/usersControllers.js";
import { validateBody } from "../helpers/validateBody.js";
import { registerUserSchema } from "../schemas/usersSchemas.js";

const usersRouter = express.Router();

usersRouter.post(
  "/users/register",
  validateBody(registerUserSchema),
  registerUser
);
usersRouter.post("/users/login");
usersRouter.post("/users/logout");
usersRouter.get("/users/current");

export default usersRouter;
