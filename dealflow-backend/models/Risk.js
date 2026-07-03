import mongoose from "mongoose";

const RiskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    severity: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    deal_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deal",
      required: true,
    },
  },
  { timestamps: true },
);
const Risk = mongoose.model("Risk", RiskSchema);
export default Risk;
