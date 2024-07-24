import { Dispatch, SetStateAction, useEffect } from "react";
import { useGlobal } from "../context/globalContext";
import date from "../assets/date.svg";
import { addJobRequest } from "../utils/requests";
import { jobInputType, jobType } from "../utils/types";

import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

const AddJob = ({
  setJobs,
}: {
  setJobs: Dispatch<SetStateAction<jobType[]>>;
}) => {
  const {
    register,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<jobInputType>();

  const { openModel, setOpenModel } = useGlobal();
  // console.log(errors);

  useEffect(() => {
    const saved = sessionStorage.getItem("formData");
    if (saved) {
      const data = JSON.parse(saved);
      for (let key in data) {
        setValue(key as keyof jobInputType, data[key]);
      }
    }
  }, [setValue]);

  const handleOverlayClick = (e: any) => {
    if (e.target.id === "overlay" || e.target.id === "overlayFade") {
      setOpenModel(false);
    }
  };

  const saveForm = () => {
    const formData = getValues();
    sessionStorage.setItem("formData", JSON.stringify(formData));
  };

  const addJob: SubmitHandler<jobInputType> = async (values: jobInputType) => {
    try {
      //   console.log(values);
      const data = await addJobRequest(values);
      reset();
      toast.success("Job Added");
      setJobs((prev) => [...prev, data.newJob]);
    } catch (error) {
      console.log(error);
    }
    setOpenModel(!openModel);
  };

  if (!openModel) return null;
  return (
    <div
      id="overlay"
      className="fixed inset-0 flex items-center justify-center z-50 h-screen w-screen"
      onClick={(e) => handleOverlayClick(e)}
    >
      <div
        className="bg-gray-800 opacity-75 absolute inset-0 p-10 w-full "
        id="overlayFade"
      ></div>
      <form onSubmit={handleSubmit(addJob)}>
        <div
          className="bg-white rounded-xl overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white px-4 py-3 sm:px-6 flex justify-center items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Create Job Opening
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <div className=" relative flex flex-col flex-1">
                  <label
                    htmlFor="jobTitle"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Title
                  </label>
                  <input
                    {...register("jobTitle", {
                      required: "JobTitle is required",
                    })}
                    type="text"
                    placeholder="Job Title"
                    name="jobTitle"
                    id="jobTitle"
                    // value={jobTitle}
                    // onChange={(e) => setJobTitle(e.target.value)}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-400 rounded-md p-3"
                  />
                  {errors.jobTitle && (
                    <p className="text-red-500 text-xs mt-1 absolute -bottom-5">
                      {errors?.jobTitle.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col flex-1 relative">
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Name
                  </label>
                  <input
                    {...register("companyName", {
                      required: "Company Name is required",
                    })}
                    type="text"
                    name="companyName"
                    id="companyName"
                    placeholder="Amazon,Google,etc..."
                    // value={companyName}
                    // onChange={(e) => setCompanyName(e.target.value)}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-3"
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-xs mt-1 absolute -bottom-5">
                      {errors?.companyName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col flex-1 relative">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <select
                    {...register("location", {
                      required: "location is required",
                    })}
                    name="location"
                    id="location"
                    // value={location}
                    // onChange={(e) => setLocation(e.target.value)}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-3"
                  >
                    <option>Choose Preferred Location</option>
                    <option value="Remote">Remote</option>
                    <option value="New York">New York</option>
                    <option value="San Francisco">San Francisco</option>
                    <option value="Chicago">Chicago</option>
                    <option value="">Any</option>
                  </select>
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-1 absolute -bottom-5">
                      {errors?.location.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col flex-1">
                  <label
                    htmlFor="jobType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Type
                  </label>
                  <select
                    {...register("jobType", {
                      required: "Job Type is required",
                    })}
                    name="jobType"
                    id="jobType"
                    // value={jobType}
                    // onChange={(e) => setJobType(e.target.value)}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-3"
                  >
                    <option value="" disabled>
                      Select Job Type
                    </option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="flex flex-col gap-4 sm:flex-row flex-1">
                  <div className="flex flex-col flex-1 relative">
                    <label
                      htmlFor="salaryFrom"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Salary Range In (LPA)
                    </label>
                    <div className="flex gap-3">
                      <div className="relative">
                        <input
                          {...register("salaryFrom", {
                            required: "Salary is required",
                          })}
                          type="number"
                          name="salaryFrom"
                          placeholder="5LPA"
                          id="salaryFrom"
                          //   value={salaryFrom}
                          //   onChange={(e) => setSalaryFrom(e.target.value)}
                          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-3"
                        />
                      </div>
                      <input
                        {...register("salaryTo", {
                          required: "Salary is required",
                        })}
                        type="number"
                        name="salaryTo"
                        id="salaryTo"
                        placeholder="12LPA"
                        // value={salaryTo}
                        // onChange={(e) => setSalaryTo(e.target.value)}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-3"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col flex-1">
                  <label
                    htmlFor="applicationDeadline"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Application Deadline
                  </label>
                  <div className="relative">
                    <input
                      {...register("applicationDeadline", {
                        required: "Application Deadline is required",
                      })}
                      type="date"
                      name="applicationDeadline"
                      id="applicationDeadline"
                      //   value={applicationDeadline}
                      //   onChange={(e) => setApplicationDeadline(e.target.value)}
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-3"
                    />
                    <img
                      src={date}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="jobDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Description
                </label>
                <textarea
                  {...register("jobDescription", {
                    required: "Job Description is required",
                  })}
                  name="jobDescription"
                  id="jobDescription"
                  rows={3}
                  placeholder="Enter Job Description so that candidate can know about the job"
                  //   value={jobDescription}
                  //   onChange={(e) => setJobDescription(e.target.value)}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-1"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col flex-1">
                  <label
                    htmlFor="jobDescription"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Requirements
                  </label>
                  <textarea
                    {...register("requirements", {
                      required: "Job Requirements is required",
                    })}
                    name="requirements"
                    id="jobRequirements"
                    rows={2}
                    placeholder="Job Requirements"
                    // value={requirements}
                    // onChange={(e) => setRequirements(e.target.value)}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label
                    htmlFor="jobDescription"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Responsibilities
                  </label>
                  <textarea
                    {...register("responsibilities", {
                      required: "Responsibilities is required",
                    })}
                    name="responsibilities"
                    id="responsibilities"
                    rows={2}
                    placeholder="Job Responsibilities"
                    // value={responsibilities}
                    // onChange={(e) => setResponsibilities(e.target.value)}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse justify-between gap-5">
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full  rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700  sm:mt-0 sm:w-auto sm:text-sm"
              //   onClick={() => addJob()}
            >
              Publish
            </button>
            <button
              type="button"
              className="w-full  rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => saveForm()}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
