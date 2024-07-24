import Filters from "../components/Filters";
import { useGlobal } from "../context/globalContext";
import Loader from "../components/Loader";
import AddJob from "../components/AddJob";
import JobCard from "../components/JobCard";

function AdminPage() {
  const { jobs, setJobs, jobLoading } = useGlobal();

  return (
    <>
      <Filters />
      {jobLoading ? (
        <Loader />
      ) : (
        <div className="h-fit w-full bg-[#fbfbff] flex flex-wrap gap-3 p-5 items-center justify-center ">
          {jobs.length === 0 ? (
            <div className="text-center text-xl text-gray-500">
              No jobs available
            </div>
          ) : (
            jobs.map((job) => <JobCard job={job} key={job._id} />)
          )}
        </div>
      )}
      <AddJob setJobs={setJobs} />
    </>
  );
}

export default AdminPage;
