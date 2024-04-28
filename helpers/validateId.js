import mongoose from "mongoose";

const isValid = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};
export default isValid;
