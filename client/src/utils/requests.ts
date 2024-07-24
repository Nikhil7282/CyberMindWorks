import { jobInputType, jobType } from "./types";

type filters = {
  jobTitle?: string;
  location?: string;
  jobType?: string;
  salaryRange?: string;
};
export const fetchJobs = async (
  filters: filters
): Promise<jobType[] | null | undefined> => {
  const query = new URLSearchParams(filters).toString();

  const response = await fetch(
    `https://carefree-grace-production.up.railway.app/admin/jobs?${query}`
  );
  const data = await response.json();
  return data.jobs;
};

export const addJobRequest = async (payload: jobInputType) => {
  // console.log(payload);

  const response = await fetch(
    "https://carefree-grace-production.up.railway.app/admin/addJob",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  const data = await response.json();
  // console.log(data);

  return data;
};
