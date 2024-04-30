import HttpError from "../helpers/HttpError.js";
import {
  createUser,
  findUserByEmail,
  findUserById,
  logout,
  refreshSubscription,
  signInUser,
  updateUserWithToken,
} from "../services/usersServices.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const newUser = await createUser(req.body);
    res.status(201).json({
      user: { email, subscription: newUser.subscription },
      token: newUser.token,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await signInUser(email, password);
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    await updateUserWithToken(user._id);
    res.status(200).json({
      user: { email, subscription: user.subscription },
      token: user.token,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await logout(_id);
    res.status(204).json({ message: "You are logged out" });
  } catch (error) {
    next(error);
  }
};

export const currentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

export const updateSubscription = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await findUserById(_id);

    const { subscription } = req.body;
    if (!subscription) {
      return res.status(400).json({ message: "Invalid subscription" });
    }
    const updatedUser = await refreshSubscription(_id, subscription);
    res.status(200).json({
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    });
  } catch (error) {
    next(error);
  }
};
