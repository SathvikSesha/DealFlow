import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["ADMIN", "EXECUTIVE", "LEGAL", "FINANCE", "HR", "SECURITY"],
      required: true,
    },
    companyId: { type: String, required: true },
    inviteStatus: {
      type: String,
      enum: ["PENDING", "ACTIVE"],
      default: "PENDING",
    },
    isActive: { type: Boolean, default: true },
    invitedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
