import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import {
  validCreateContact,
  validateFavorites,
  validateUpdateContact,
} from "../middlewares/contactMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authMiddleware, getAllContacts);

contactsRouter.get("/:id", authMiddleware, getOneContact);

contactsRouter.delete("/:id", authMiddleware, deleteContact);

contactsRouter.post("/", authMiddleware, validCreateContact, createContact);

contactsRouter.put(
  "/:id",
  authMiddleware,
  validateUpdateContact,
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  authMiddleware,
  validateFavorites,
  updateStatusContact
);

export default contactsRouter;
