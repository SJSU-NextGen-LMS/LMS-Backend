import express from "express";
import {getUserProgress,enrollUserToCourse,updateProgress,getMergedProgressModules} from "../controllers/userProgressController";

const router = express.Router();
router.get("/:userId",getUserProgress);
router.post("/:userId/:courseId",enrollUserToCourse);
router.patch("/:userId/:courseId/:moduleId",updateProgress);
router.get("/:userId/:courseId",getMergedProgressModules);

export default router;