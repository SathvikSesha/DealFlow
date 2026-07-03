import express from "express";
import {
  registerAdmin,
  registerEmployee,
  login,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register/admin", registerAdmin);
router.post("/register/employee", registerEmployee);
router.post("/login", login);

export default router;
