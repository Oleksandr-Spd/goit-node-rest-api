import isValid from "./validateId.js";

const validateIdContact = async (req, res, service) => {
  const { id } = req.params;

  try {
    if (!isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const contact = await service(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    throw error;
  }
};
export default validateIdContact;
