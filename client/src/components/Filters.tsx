import { useCallback, useEffect, useState } from "react";
import searchIcon from "../assets/search.svg";
import locationIcon from "../assets/location.svg";
import jobTypeIcon from "../assets/jobType.svg";
import { useGlobal } from "../context/globalContext";
import { fetchJobs } from "../utils/requests";
import { useDebounce } from "../hooks/hooks";

function Filters() {
  const { setJobLoading, setJobs } = useGlobal();
  const [showModal, setShowModal] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salaryRange, setSalaryRange] = useState<number>(0);

  const debounced = useDebounce(jobTitle);
  const salaryDebounced = useDebounce(salaryRange);

  const loadJobs = useCallback(async () => {
    setJobLoading(true);
    const data = await fetchJobs({
      jobTitle: debounced,
      location,
      jobType,
      salaryRange: salaryDebounced + "",
    });
    setJobs(data || []);
    setJobLoading(false);
  }, [debounced, setJobLoading, setJobs, location, jobType, salaryDebounced]);

  useEffect(() => {
    loadJobs();
  }, [debounced, loadJobs, location, jobType, salaryDebounced]);

  const handleRangeChange = (e: any) => {
    const roundedValue = Math.round(Number(e.target.value) / 1000) * 1000;
    setSalaryRange(roundedValue);
  };

  const handleChange = async (e: any) => {
    setJobTitle(e.target.value);
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="h-28 w-screen border "></div>
      <div className="hidden md:flex h-14 gap-5 w-screen p-5 bg-white">
        <div className="flex justify-center items-center flex-1">
          <img src={searchIcon} className="w-5 h-5" alt="Search Icon" />
          <input
            placeholder="Search By Job Title"
            className="p-3 placeholder:text-left focus:outline-none rounded-lg w-full"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="flex justify-center items-center flex-1">
          <img src={locationIcon} className="w-5 h-5" alt="Location Icon" />
          <select
            name="Preferred Location"
            className="p-3 placeholder:text-left focus:outline-none rounded-lg w-full"
            onChange={(e) => setLocation(e.target.value)}
          >
            <option className="text-grey" disabled>
              Preferred Location
            </option>
            <option value="New York">New York</option>
            <option value="San Francisco">San Francisco</option>
            <option value="Chicago">Chicago</option>
            <option value="">Any</option>
          </select>
        </div>

        <div className="flex justify-center items-center gap-1 flex-1">
          <img src={jobTypeIcon} className="w-5 h-5" alt="Job Type Icon" />
          <select
            className="p-3 placeholder:text-left focus:outline-none rounded-lg w-full"
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="" disabled>
              Job Type
            </option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
            <option value="Contract">Contract</option>
            <option value="">Any</option>
          </select>
        </div>

        <div className="relative flex items-center justify-center h-10 flex-1">
          <div className="absolute -top-3 left-0 text-sm text-black ">
            Salary per Month
          </div>
          <input
            id="range-input"
            type="range"
            value={salaryRange}
            min={0}
            max={100000}
            className="w-full h-1 bg-gray-500 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            onChange={(e) => handleRangeChange(e)}
          />
          <div className="absolute -top-3 right-0 text-sm  text-black">
            &#8377;{salaryRange}
          </div>
        </div>
      </div>

      <div className="md:hidden flex justify-end p-5">
        <button
          className="text-white bg-gradient-to-r from-[#A128FF] to-[#6100AD] hover:bg-purple-800 focus:outline-none  font-medium rounded-md text-sm px-2 py-[6px] text-center dark:bg-purple-600 dark:hover:bg-purple-700 "
          onClick={handleModalToggle}
        >
          Filters
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="bg-gray-800 opacity-75 absolute inset-0"
            onClick={handleModalToggle}
          ></div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full z-50 relative p-6 flex flex-col gap-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Filters
              </h3>
              <button
                onClick={handleModalToggle}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-center items-center flex-1">
                <img src={searchIcon} className="w-5 h-5" alt="Search Icon" />
                <input
                  placeholder="Search By Job Title"
                  className="p-3 placeholder:text-left focus:outline-none rounded-lg w-full"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="flex justify-center items-center flex-1">
                <img
                  src={locationIcon}
                  className="w-5 h-5"
                  alt="Location Icon"
                />
                <select
                  name="Preferred Location"
                  className="p-3 placeholder:text-left focus:outline-none rounded-lg w-full"
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option className="text-grey" disabled>
                    Preferred Location
                  </option>
                  <option value="New York">New York</option>
                  <option value="San Francisco">San Francisco</option>
                  <option value="Chicago">Chicago</option>
                  <option value="">Any</option>
                </select>
              </div>

              <div className="flex justify-center items-center gap-1 flex-1">
                <img
                  src={jobTypeIcon}
                  className="w-5 h-5"
                  alt="Job Type Icon"
                />
                <select
                  className="p-3 placeholder:text-left focus:outline-none rounded-lg w-full"
                  onChange={(e) => setJobType(e.target.value)}
                >
                  <option value="" disabled>
                    Job Type
                  </option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                  <option value="Contract">Contract</option>
                  <option value="">Any</option>
                </select>
              </div>

              <div className="relative flex items-center justify-center h-10 flex-1 mt-5">
                <div className="absolute -top-6 left-0 text-sm text-black ">
                  Salary per Month
                </div>
                <input
                  id="range-input"
                  type="range"
                  min={0}
                  max={10}
                  onChange={(e) => handleRangeChange(e)}
                  className="w-full h-1 bg-gray-500 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="absolute -top-6 right-0 text-sm  text-black">
                  &#8377;{salaryRange}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="text-white bg-gradient-to-r from-[#A128FF] to-[#6100AD] hover:bg-purple-800 focus:outline-none  font-medium rounded-md text-sm px-2 py-[6px] text-center dark:bg-purple-600 dark:hover:bg-purple-700 "
                onClick={handleModalToggle}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Filters;
