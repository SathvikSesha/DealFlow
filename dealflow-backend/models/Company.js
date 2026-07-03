import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    companyId: {
      type: String,
      required: true,
      unique: true,
    },

    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const Company = mongoose.model("Company", companySchema);
export default Company;
