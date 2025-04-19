import { Request, Response } from "express";
import {Module} from "../models/courseModel";
import { v4 as uuidv4 } from "uuid";

export const getCourseModules = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
  
    try {
      const modules = await Module.query("courseId").using("courseIdIndex").eq(courseId).exec();
      res.json({ message: "Modules retrieved successfully", data: modules });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving modules", error });
    }
};

//every time we add/remove or edit existed modules we need to reorder
export const reorderAndAddModules = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const modulesData = req.body;
  
    if (!Array.isArray(modulesData)) {
      res.status(400).json({ message: "Modules should be an array" });
      return;
    }
  
    try {
        //standarize the format of json
      const modulesToSave = modulesData.map((module: any, index: number) => ({
        moduleId: module.moduleId || uuidv4(),
        courseId,
        title: module.title,
        content: module.content,
        type: module.type,
        moduleVideo: module.moduleVideo || "",
        comments: module.comments || [],
        order: index,
      }));
  
      await Module.batchPut(modulesToSave);
  
      res.json({ message: "Modules added and reordered successfully", data: modulesToSave });
    } catch (error) {
      res.status(500).json({ message: "Error processing modules", error });
    }
  };
  

export const getModule = async (req: Request, res: Response): Promise<void> => {
    const { moduleId } = req.params;
  
    try {
      const module = await Module.get(moduleId);
  
      if (!module) {
        res.status(404).json({ message: "Module not found" });
        return;
      }
  
      res.json({ message: "Module retrieved successfully", data: module });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving module", error });
    }
};
//update a single module
export const updateModule = async (req: Request, res: Response): Promise<void> => {
    const { moduleId } = req.params;
    const updateData = req.body;
  
    try {
      const module = await Module.get(moduleId);
  
      if (!module) {
        res.status(404).json({ message: "Module not found" });
        return;
      }
  
      Object.assign(module, updateData);
      await module.save();
  
      res.json({ message: "Module updated successfully", data: module });
    } catch (error) {
      res.status(500).json({ message: "Error updating module", error });
    }
};

export const deleteModule = async (req: Request, res: Response): Promise<void> => {
    const { moduleId } = req.params;
  
    try {
      const module = await Module.get(moduleId);
  
      if (!module) {
        res.status(404).json({ message: "Module not found" });
        return;
      }
  
      await Module.delete(moduleId);

      res.json({ message: "Module deleted successfully", data: module });
    } catch (error) {
      res.status(500).json({ message: "Error deleting module", error });
    }
  };
  


  