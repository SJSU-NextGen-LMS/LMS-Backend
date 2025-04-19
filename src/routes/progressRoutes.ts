import express from "express";
import {enrollUserToCourse,updateProgress,getMergedProgressModules} from "../controllers/userProgressController";

const router = express.Router();

router.post("/:userId/:courseId",enrollUserToCourse);
router.patch("/:userId/:courseId/:moduleId",updateProgress);
router.get("/:userId/:courseId",getMergedProgressModules);

export default router;