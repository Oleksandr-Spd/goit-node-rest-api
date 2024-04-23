import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

export const validCreateContact = (req, res, next) => {
  validateBody(createContactSchema)(req, res, next);
};
export const validateUpdateContact = (req, res, next) => {
  validateBody(updateContactSchema)(req, res, next);
};
