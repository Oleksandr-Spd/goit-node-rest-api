import HttpError from "../helpers/HttpError.js";
import { ContactModel } from "../db/models/Contacts.js";

export async function listContacts() {
  try {
    const data = await ContactModel.find();
    return data;
  } catch (error) {
    return [];
  }
}

export async function getContactById(contactId) {
  try {
    const foundContact = await ContactModel.findById(contactId);
    return foundContact || null;
  } catch (error) {
    return null;
  }
}

export async function removeContact(contactId) {
  try {
    const deletedContact = await ContactModel.findByIdAndDelete(contactId);
    return deletedContact;
  } catch (error) {
    return null;
  }
}

export async function addContact(name, email, phone) {
  try {
    const newContact = await ContactModel.create({ name, email, phone });
    return newContact;
  } catch (error) {
    return null;
  }
}
export async function updatingContact(contactId, { name, email, phone }) {
  try {
    const updatedContact = await ContactModel.findByIdAndUpdate(
      contactId,
      { name, email, phone },
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    throw new HttpError(404, "Not found");
  }
}
export async function updateStatus(contactId, body) {
  try {
    const updatedContact = await ContactModel.findByIdAndUpdate(
      contactId,
      body,
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    throw new HttpError(404, "Not found");
  }
}
