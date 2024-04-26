import HttpError from "../helpers/HttpError.js";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateStatus,
  updatingContact,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);

  if (!contact) {
    res.status(404).json({ error: "Contact not found" });
    return;
  }

  res.status(200).json(contact);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await removeContact(id);

  if (!contact) {
    res.status(404).json({ error: "Contact not found" });
    return;
  }

  res.status(200).json(contact);
};

export const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = await addContact(name, email, phone);

  res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
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
  const body = req.body;
  const contact = await updateStatus(id, body);

  res.status(200).json(contact);
};
