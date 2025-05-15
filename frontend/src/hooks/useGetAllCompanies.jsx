import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ADMIN_API_ENDPOINT } from "@/utils/constant";
import { setCompanies } from "@/store/companySlice";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllCompanies = async () => {
      try {
        const res = await fetch(`${ADMIN_API_ENDPOINT}/get`, {
          credentials: "include",
        });

        const data = await res.json();
        console.log("called");
        if (res.ok && data.success) {
          console.log(data);
          dispatch(setCompanies(data.companies));
        }
      } catch (error) {}
    };

    getAllCompanies();
  }, []);
};

export default useGetAllCompanies;
