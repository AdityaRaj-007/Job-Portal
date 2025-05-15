import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import { JOB_APPLICATION_API_ENDPOINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/store/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((state) => state.application);
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        console.log(params.id);
        const res = await fetch(
          `${JOB_APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
          {
            credentials: "include",
          }
        );
        console.log(res);

        const data = await res.json();
        console.log(data.job);
        //console.log(data.job.applications?.[0].applicant);

        dispatch(setAllApplicants(data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants ({applicants?.applications?.length})
        </h1>
        <ApplicantsTable applicants />
      </div>
    </div>
  );
};

export default Applicants;
