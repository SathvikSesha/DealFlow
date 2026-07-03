import User from "../models/User.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";

export const inviteEmployee = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const companyId = req.user.companyId;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists in the system" });
    }
    if (role === "ADMIN") {
      return res.status(400).json({
        message: "Cannot invite another ADMIN",
      });
    }
    const tempPassword = crypto.randomBytes(8).toString("hex");
    const salt = await bcrypt.genSalt(10);
    const hashedTempPassword = await bcrypt.hash(tempPassword, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashedTempPassword,
      role,
      companyId,
      inviteStatus: "PENDING",
    });

    res.status(201).json({
      message: "Employee invited successfully. Share the Company ID with them.",
      invitee: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        companyId: newUser.companyId,
        inviteStatus: newUser.inviteStatus,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
