import React, { useEffect } from "react";
import { ADMIN_API_ENDPOINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/store/companySlice";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanyById = async () => {
      try {
        const res = await fetch(`${ADMIN_API_ENDPOINT}/get/${companyId}`, {
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok && data.success) {
          dispatch(setSingleCompany(data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompanyById();
  }, []);
};

export default useGetCompanyById;
