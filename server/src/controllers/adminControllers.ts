import { Request, Response } from "express";
import JobModel from "../models/jobs.model.js";
import { jobValidationSchema } from "../utils/validation.js";

export const getJobs = async (req: Request, res: Response) => {
  try {
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const filters = req.query;

    const query: { [key: string]: any } = {};

    if (filters.jobTitle) {
      query.jobTitle = {
        $regex: `^${filters.jobTitle}`,
        $options: "i",
      };
    }
    if (filters.location) {
      query.location = filters.location as string;
    }
    if (filters.jobType) {
      query.jobType = filters.jobType as string;
    }
    if (filters.salaryRange) {
      const lpaConversion = (+filters.salaryRange * 12) / 100000;
      // console.log(lpaConversion);
      // query.$or = [
      //   { salaryFrom: { $gte: lpaConversion } },
      //   { salaryTo: { $lte: lpaConversion } },
      // ];
      query.salaryFrom = { $lte: lpaConversion };
    }

    const jobs = await JobModel.find(query, { __v: 0 })
      .skip((page - 1) * 8)
      .limit(8);

    res.status(200).json({ message: "Jobs Fetched", jobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const addJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = jobValidationSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    const newJob = new JobModel(req.body);
    await newJob.save();
    res.status(201).json({ message: "Job Added", newJob });
    return;
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Server Error", error });
    return;
  }
};
