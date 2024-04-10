import { readFile, writeFile } from "fs/promises";
import path from "path";

const contactsPath = path.resolve("./db", "contacts.json");

export async function listContacts() {
  try {
    const data = await readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const foundContact = contacts.find((contact) => contact.id === contactId);
    return foundContact || null;
  } catch (error) {
    return null;
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index !== -1) {
      const deletedContact = contacts.splice(index, 1)[0];
      await writeFile(contactsPath, JSON.stringify(contacts));
      return deletedContact;
    } else return null;
  } catch (error) {
    return null;
  }
}

export async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: Date.now().toString(), name, email, phone };

    contacts.push(newContact);

    await writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    return null;
  }
}
