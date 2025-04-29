import express from "express";
import {getCourseModules,getModule,reorderAndAddModules,updateModule,deleteModule} from "../controllers/moduleController";
const router = express.Router();
router.get("/:courseId",getCourseModules);
//router.get("/:moduleId",getModule);
router.patch("/:moduleId",updateModule);
router.delete("/:moduleId",deleteModule);
router.put("/:courseId",reorderAndAddModules);

export default router;
