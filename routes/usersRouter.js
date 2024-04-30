import express from "express";

import {
  currentUser,
  loginUser,
  logoutUser,
  registerUser,
  updateSubscription,
} from "../controllers/usersControllers.js";

import validateBody from "../helpers/validateBody.js";

import {
  loginUserSchema,
  registerUserSchema,
  subscriptionUserSchema,
} from "../schemas/usersSchemas.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(registerUserSchema), registerUser);

usersRouter.post("/login", validateBody(loginUserSchema), loginUser);

usersRouter.post("/logout", authMiddleware, logoutUser);

usersRouter.get("/current", authMiddleware, currentUser);

usersRouter.patch(
  "/users",
  validateBody(subscriptionUserSchema),
  authMiddleware,
  updateSubscription
);

export default usersRouter;
