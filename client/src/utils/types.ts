export type jobType = {
  _id?: string;
  jobTitle: string;
  companyName: string;
  location: string;
  jobType: string;
  salaryRange?: string;
  salaryFrom?: number;
  salaryTo?: number;
  applicationDeadline: string;
  jobDescription: string;
  jobRequirements: string;
  responsibilities: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type jobInputType = {
  jobTitle: string;
  companyName: string;
  location: string;
  jobType: string;
  salaryRange?: string;
  salaryFrom?: number;
  salaryTo?: number;
  applicationDeadline: string;
  jobDescription: string;
  requirements: string;
  responsibilities: string;
};
