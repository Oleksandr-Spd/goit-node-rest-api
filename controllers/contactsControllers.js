import isValid from "../helpers/validateId.js";
import validateIdContact from "../helpers/validateIdContact.js";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateStatus,
  updatingContact,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const contacts = await listContacts(owner, page, limit);
  res.status(200).json(contacts);
};

export const getOneContact = async (req, res) => {
  validateIdContact(req, res, getContactById);
};

export const deleteContact = async (req, res) => {
  validateIdContact(req, res, removeContact);
};

export const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { name, email, phone } = req.body;
  const newContact = await addContact(name, email, phone, owner);

  res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  if (!isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    res.status(400).json({ error: "Body must have at least one field" });
    return;
  }

  const contact = await getContactById(id);

  if (!contact) {
    res.status(404).json({ error: "Contact not found" });
    return;
  }

  const updatedContact = await updatingContact(id, { name, email, phone });

  res.status(200).json(updatedContact);
};

export const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  if (!isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  const body = req.body;

  const contact = await updateStatus(id, body);

  if (!contact) {
    res.status(404).json({ error: "Contact not found" });
    return;
  }

  res.status(200).json(contact);
};
