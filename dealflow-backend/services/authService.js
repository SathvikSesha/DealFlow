import jwt from "jsonwebtoken";

export const generateToken = (userId, companyId, role) => {
  return jwt.sign({ userId, companyId, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
