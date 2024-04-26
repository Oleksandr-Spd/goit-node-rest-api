import { UserModel } from "../db/models/Users.js";
import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

export async function findUserByEmail(email) {
  try {
    const user = await UserModel.findOne({ email });
    return user;
  } catch (error) {
    throw new HttpError(400, "Bad Request");
  }
}
export async function updateUserWithToken(id) {
  const token = jwt.sign({ id }, SECRET_KEY);
  const user = await UserModel.findByIdAndUpdate(id, { token }, { new: true });

  return user;
}

export async function createUser(userData) {
  try {
    const newUser = new User(userData);
    await newUser.hashPassword();
    await newUser.save();
    const userWithToken = await updateUserWithToken(newUser._id);
    return userWithToken;
  } catch (error) {
    throw new HttpError(400, "Bad Request");
  }
}
