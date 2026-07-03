import express from "express";
import { inviteEmployee } from "../controllers/userController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const userrouter = express.Router();

userrouter.post("/invite", protect, authorizeRoles("ADMIN"), inviteEmployee);

export default userrouter;
