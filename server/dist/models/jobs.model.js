import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        required: true,
    },
    salaryFrom: {
        type: Number,
        required: true,
    },
    salaryTo: {
        type: Number,
        required: true,
    },
    applicationDeadline: {
        type: Date,
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    requirements: {
        type: String,
        required: true,
    },
    responsibilities: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const JobModel = mongoose.model("jobs", jobSchema);
export default JobModel;
