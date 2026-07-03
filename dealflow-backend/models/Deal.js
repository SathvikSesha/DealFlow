import mongoose from "mongoose";

const dealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    buyer_company: {
      type: String,
      required: true,
      default: "Microsoft",
    },
    target_company: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Closed", "In-Review"],
      default: "Active",
    },
    companyId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Deal = mongoose.model("Deal", dealSchema);
export default Deal;
