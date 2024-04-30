import { UserModel } from "../db/models/Users.js";
import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import getPasswordCompare from "../helpers/getPAsswordCompare.js";

const { SECRET_KEY } = process.env;

export async function findUserByEmail(email) {
  try {
    const user = await UserModel.findOne({ email });
    return user;
  } catch {
    throw HttpError(401, "Bad Request");
  }
}

export async function findUserById(id) {
  try {
    const user = await UserModel.findById({ id });
    if (!user) {
      throw HttpError(401, "Not authorized");
    }
    return user;
  } catch (error) {
    // throw HttpError(400, "Bad Request");
    console.log(error);
  }
}

export async function updateUserWithToken(id) {
  try {
    const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: "22h" });
    const user = await UserModel.findByIdAndUpdate(
      id,
      { token },
      { new: true }
    );

    return user;
  } catch {
    throw HttpError(400);
  }
}

export async function createUser(userData) {
  try {
    const newUser = new UserModel(userData);
    await newUser.hashPassword();
    await newUser.save();
    const userWithToken = await updateUserWithToken(newUser._id);
    return userWithToken;
  } catch {
    throw HttpError(400);
  }
}

export async function signInUser(email, password) {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      throw HttpError(400);
    }
    const passwordCompare = await getPasswordCompare(password, user.password);
    if (user.email !== email || !passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function logout(id) {
  try {
    await UserModel.findByIdAndUpdate(id, { token: "" });
  } catch {
    throw HttpError(400);
  }
}

export async function refreshSubscription(id, subscription) {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { subscription },
      {
        new: true,
      }
    );
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}
