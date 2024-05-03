import bcrypt from "bcryptjs";

async function getPasswordCompare(inputPassword, hashedPassword) {
  return await bcrypt.compare(inputPassword, hashedPassword);
}
export default getPasswordCompare;
