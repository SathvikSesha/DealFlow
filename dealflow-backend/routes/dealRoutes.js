import express from "express";
import {
  createDeal,
  getDeals,
  getDealById,
  getDealMembers,
  updateDeal,
  deleteDeal,
  assignMemberToDeal,
  removeMemberFromDeal,
} from "../controllers/dealController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Workspace queries (Controller handles role filtering)
router.get("/", protect, getDeals);
router.get("/:id", protect, getDealById);
router.get("/:id/members", protect, getDealMembers); // Mounted here

// Admin-only deal mutations
router.post("/create", protect, authorizeRoles("ADMIN"), createDeal);
router.put("/:id", protect, authorizeRoles("ADMIN"), updateDeal);
router.delete("/:id", protect, authorizeRoles("ADMIN"), deleteDeal);

// Admin-only team assignment routes
router.post(
  "/:id/assign",
  protect,
  authorizeRoles("ADMIN"),
  assignMemberToDeal,
);
router.delete(
  "/:id/members/:userId",
  protect,
  authorizeRoles("ADMIN"),
  removeMemberFromDeal,
);

export default router;
