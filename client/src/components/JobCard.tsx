import Experience from "../assets/Experience.svg";
import Salary from "../assets/Salary.svg";
import WorkMode from "../assets/WorkMode.svg";
import Amazon from "/logo.png";

import { jobType } from "../utils/types";

function JobCard({ job }: { job: jobType }) {
  let daysDifference;
  if (job.createdAt) {
    const timeDifference =
      new Date().getTime() - new Date(job.createdAt).getTime();
    daysDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  }

  return (
    <div
      key={job._id}
      className="flex flex-col px-2.5 py-4 text-sm font-small bg-white rounded-xl shadow-sm max-w-[300px]"
    >
      <div className="flex gap-5 justify-between text-center text-black">
        <img
          loading="lazy"
          src={Amazon}
          className="shrink-0 border border-white border-solid shadow-sm aspect-[1.01] w-[83px]"
        />
        <div className="h-fit px-2.5 py-2 bg-blue-200 rounded-xl">
          {daysDifference} hours ago
        </div>
      </div>
      <div className="mt-5 text-xl font-bold text-black ">{job.jobTitle}</div>
      <div className="flex gap-4 pr-7 mt-4 text-base text-center text-zinc-600">
        <div className="flex gap-1 justify-between px-px items-center">
          <img loading="lazy" src={Experience} className="w-[17px]" />
          <div className="text-xs">1-3 yr Exp</div>
        </div>
        <div className="flex gap-1 justify-between px-px whitespace-nowrap items-center">
          <img loading="lazy" src={WorkMode} className="w-[17px]" />
          <div className="text-sm">{job.jobType}</div>
        </div>
        <div className="flex gap-1 justify-between px-1 whitespace-nowrap items-center">
          <img loading="lazy" src={Salary} className="w-[17px]" />
          <div className="text-sm">{job.salaryTo}LPA</div>
        </div>
      </div>
      <div className="mt-6 text-neutral-600 truncate">{job.jobDescription}</div>
      <button className="px-2.5 py-3 mt-5 text-base font-semibold text-center text-white bg-sky-500 rounded-xl border border-sky-500 border-solid shadow-sm">
        Apply Now
      </button>
    </div>
  );
}

export default JobCard;
