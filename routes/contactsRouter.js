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

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validCreateContact, createContact);

contactsRouter.put("/:id", validateUpdateContact, updateContact);

contactsRouter.patch("/:id/favorite", validateFavorites, updateStatusContact);

export default contactsRouter;
