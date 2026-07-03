import User from "../models/User.js";
import Company from "../models/Company.js";
import crypto from "crypto";
import { generateToken } from "../services/AuthService.js";

export const registerAdmin = async (req, res) => {
  try {
    const { companyName, adminName, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const companyIdString = `${companyName.toUpperCase().replace(/\s+/g, "")}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;

    const user = await User.create({
      name: adminName,
      email,
      password: password,
      role: "ADMIN",
      companyId: companyIdString,
      inviteStatus: "ACTIVE",
    });

    await Company.create({
      name: companyName,
      companyId: companyIdString,
      adminId: user._id,
    });

    res.status(201).json({
      message: "Company and Admin registered successfully",
      companyId: companyIdString,
      token: generateToken(user._id, user.companyId, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
