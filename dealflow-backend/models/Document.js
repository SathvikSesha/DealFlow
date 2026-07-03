import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
  {
    file_name: {
      type: String,
      required: true,
    },
    file_url: {
      type: String,
      required: true,
    },
    uploaded_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

const Document = mongoose.model("Document", DocumentSchema);
export default Document;
