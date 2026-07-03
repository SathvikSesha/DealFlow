import User from "../models/User.js";
import Company from "../models/Company.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateToken } from "../services/AuthService.js";

export const registerAdmin = async (req, res) => {
  try {
    const { companyName, adminName, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const companyIdString = `${companyName.toUpperCase().replace(/\s+/g, "")}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: adminName,
      email,
      password: hashedPassword,
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

export const registerEmployee = async (req, res) => {
  try {
    const { companyId, email, password } = req.body;
    const user = await User.findOne({ email, companyId });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid invite details. Employee not found." });
    }
    if (user.inviteStatus === "ACTIVE") {
      return res
        .status(400)
        .json({ message: "Account already activated. Please login." });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.inviteStatus = "ACTIVE";

    await user.save();

    res.status(200).json({
      message: "Account activated successfully",
      token: generateToken(user._id, user.companyId, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({
      email,
      isActive: true,
    });

    if (!user || user.inviteStatus === "PENDING") {
      return res
        .status(401)
        .json({ message: "Invalid credentials or account pending activation" });
    }

    if (!user.isActive) {
      return res.status(403).json({
        message: "Account has been deactivated. Please contact your admin.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      token: generateToken(user._id, user.companyId, user.role),
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        companyId: user.companyId,
      },
    });
  } catch (error) {
    console.error(`Login error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};
