import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoritesSchema,
} from "../schemas/contactsSchemas.js";

export const validCreateContact = (req, res, next) => {
  validateBody(createContactSchema)(req, res, next);
};
export const validateUpdateContact = (req, res, next) => {
  validateBody(updateContactSchema)(req, res, next);
};
export const validateFavorites = (req, res, next) => {
  validateBody(updateFavoritesSchema)(req, res, next);
};
