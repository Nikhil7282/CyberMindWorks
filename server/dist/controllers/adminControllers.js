var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import JobModel from "../models/jobs.model.js";
import { jobValidationSchema } from "../utils/validation.js";
export const getJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const filters = req.query;
        const query = {};
        if (filters.jobTitle) {
            query.jobTitle = {
                $regex: `^${filters.jobTitle}`,
                $options: "i",
            };
        }
        if (filters.location) {
            query.location = filters.location;
        }
        if (filters.jobType) {
            query.jobType = filters.jobType;
        }
        if (filters.salaryRange) {
            const lpaConversion = (+filters.salaryRange * 12) / 100000;
            // console.log(lpaConversion);
            // query.$or = [
            //   { salaryFrom: { $gte: lpaConversion } },
            //   { salaryTo: { $lte: lpaConversion } },
            // ];
            query.salaryFrom = { $lte: lpaConversion };
            // query.salaryTo = { $gte: lpaConversion };
        }
        const jobs = yield JobModel.find(query, { __v: 0 })
            .skip((page - 1) * 8)
            .limit(8);
        res.status(200).json({ message: "Jobs Fetched", jobs });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error });
    }
});
export const addJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = jobValidationSchema.validate(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }
        const newJob = new JobModel(req.body);
        yield newJob.save();
        res.status(201).json({ message: "Job Added", newJob });
        return;
    }
    catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Server Error", error });
        return;
    }
});
