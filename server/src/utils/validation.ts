import Joi from "joi";

export const jobValidationSchema = Joi.object({
  jobTitle: Joi.string().required(),
  companyName: Joi.string().required(),
  location: Joi.string().required(),
  jobType: Joi.string().required(),
  salaryFrom: Joi.number().required(),
  salaryTo: Joi.number().required(),
  applicationDeadline: Joi.date().required(),
  jobDescription: Joi.string().required(),
  requirements: Joi.string().required(),
  responsibilities: Joi.string().required(),
});
