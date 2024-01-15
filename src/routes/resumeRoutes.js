// routes/resumeRoutes.js
import express from "express";
import {
  createResume,
  getAllResumes,
  getResumeById,
  updateResumeById,
  deleteResumeById,
} from "../controllers/resumeController";

const router = express.Router();

router.post("/", createResume);
router.get("/", getAllResumes);
router.get("/:id", getResumeById);
router.put("/:id", updateResumeById);
router.delete("/:id", deleteResumeById);

export default router;
