import { setAdminJobs } from "@/store/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        const res = await fetch(`${JOB_API_ENDPOINT}/getadminjobs`, {
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok && data.success) {
          dispatch(setAdminJobs(data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdminJobs();
  }, []);
};

export default useGetAdminJobs;
