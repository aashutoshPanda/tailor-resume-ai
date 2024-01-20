// routes/resumeRoutes.js
import express from "express";
import {
  createResume,
  getAllResumes,
  getResumeById,
  updateResumeById,
  deleteResumeById,
} from "../controllers/resumeController.js";
import { isResumeOwner } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", createResume);
router.get("/", getAllResumes);
router.get("/:id", isResumeOwner, getResumeById);
router.patch("/:id", isResumeOwner, updateResumeById);
router.delete("/:id", isResumeOwner, deleteResumeById);

export default router;
