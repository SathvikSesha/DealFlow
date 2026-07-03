import mongoose from "mongoose";

const dealMemberSchema = new mongoose.Schema(
  {
    dealId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deal",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    roleInDeal: {
      type: String,
      enum: ["LEGAL", "FINANCE", "HR", "SECURITY", "EXECUTIVE"],
    },

    assignedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const DealMember = mongoose.model("DealMember", dealMemberSchema);
export default DealMember;
