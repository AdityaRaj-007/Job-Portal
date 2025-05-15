import React, { useEffect } from "react";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "@/store/jobSlice";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await fetch(
          `${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (res.ok && data.success) {
          dispatch(setAllJobs(data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllJobs();
  }, []);
};

export default useGetAllJobs;
