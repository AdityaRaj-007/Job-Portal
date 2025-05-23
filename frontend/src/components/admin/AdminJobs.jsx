import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AdminJobTable from "./AdminJobTable";
import useGetAdminJobs from "@/hooks/useGetAdminJobs";
import { setSearchJobByText } from "@/store/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobs = () => {
  useGetAdminJobs();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="cursor-pointer"
          >
            Create New Job
          </Button>
        </div>
        <AdminJobTable />
      </div>
    </div>
  );
};

export default AdminJobs;
