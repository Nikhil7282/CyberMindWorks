import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { jobType } from "../utils/types";
import { fetchJobs } from "../utils/requests";

type context = {
  jobs: jobType[];
  setJobs: Dispatch<SetStateAction<jobType[]>>;
  openModel: boolean;
  setOpenModel: Dispatch<SetStateAction<boolean>>;
  jobLoading: boolean;
  setJobLoading: Dispatch<SetStateAction<boolean>>;
};
const globalContext = createContext<context | null>(null);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [jobs, setJobs] = useState<jobType[]>([]);
  const [openModel, setOpenModel] = useState(false);
  const [jobLoading, setJobLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJobs({});
        setJobs(data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const value = {
    jobs,
    setJobs,
    openModel,
    setOpenModel,
    jobLoading,
    setJobLoading,
  };
  return (
    <globalContext.Provider value={value}>{children}</globalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(globalContext);
  if (!context) throw new Error("GlobalContext not found");
  return context;
};

export default GlobalProvider;
