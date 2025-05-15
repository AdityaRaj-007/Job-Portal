import { setAllAppliedJobs } from "@/store/jobSlice";
import { JOB_APPLICATION_API_ENDPOINT } from "@/utils/constant";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await fetch(`${JOB_APPLICATION_API_ENDPOINT}/get`, {
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok && data.success) {
          dispatch(setAllAppliedJobs(data.application));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAppliedJobs();
  }, []);
};

export default useGetAppliedJobs;
