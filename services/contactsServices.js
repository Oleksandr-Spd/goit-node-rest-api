import HttpError from "../helpers/HttpError.js";
import { ContactModel } from "../db/models/Contacts.js";

export async function listContacts(owner, page, limit, favorite) {
  try {
    const skip = (page - 1) * limit;

    if (favorite !== undefined) {
      query.favorite = favorite === "true";
    }
    const data = await ContactModel.find({ owner }).skip(skip).limit(limit);
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

export async function addContact(name, email, phone, owner) {
  try {
    const newContact = await ContactModel.create({ name, email, phone, owner });
    return newContact;
  } catch (error) {
    console.log(error.message);
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
    throw HttpError(404, "Not found");
  }
}
export async function updateStatus(contactId, subscription) {
  try {
    const updatedContact = await ContactModel.findByIdAndUpdate(
      contactId,
      subscription,
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    return null;
  }
}
