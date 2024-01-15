import express from "express";
import resumeRouter from "./resumeRoutes";

const router = express.Router();

router.use("/resumes", resumeRouter);

export default router;
