import { createUser, findUserByEmail } from "../services/usersServices.js";

export const registerUser = async (req, res) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  if (user) {
    res.status(409).json({ error: "Email in use" });
  }
  const newUser = await createUser(req.body);
  res.status(201).json({ user: { email }, token: newUser.token });
};
