import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dealRoutes from "./routes/dealRoutes.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/deals", dealRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "M&A Platform API Running",
  });
});
export default app;
