import { Router } from "express";
import { addJob, getJobs } from "../controllers/adminControllers.js";

const adminRouter = Router();

adminRouter.get("/jobs", getJobs);
adminRouter.post("/addJob", addJob);

export default adminRouter;
