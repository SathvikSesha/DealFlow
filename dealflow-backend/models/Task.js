import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Completed"],
      default: "To Do",
    },
    deal_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deal",
      required: true,
    },
    assigned_to: {
      type: String,
      enum: ["ADMIN", "EXECUTIVE", "LEGAL", "FINANCE", "HR"],
      required: true,
    },
  },
  { timestamps: true },
);
const Task = mongoose.model("Task", TaskSchema);
export default Task;
