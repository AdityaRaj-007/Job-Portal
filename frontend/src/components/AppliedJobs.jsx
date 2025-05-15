import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";

const applications = [1, 2, 3, 4, 5];

const AppliedJobs = () => {
  const { allAppliedJobs } = useSelector((state) => state.job);
  const [active, setActive] = useState(true);
  const activeJobs = allAppliedJobs.filter((job) => {
    return job.status === "pending";
  });
  const inactiveJobs = allAppliedJobs.filter((job) => {
    return job.status !== "pending";
  });
  return (
    <div className="my-2">
      <menu className="flex items-center gap-10">
        <div
          className={
            active
              ? "border-b-2 border-b-[#6A38C2] w-fit cursor-pointer"
              : "cursor-pointer"
          }
          onClick={() => setActive(true)}
        >
          Active
        </div>
        <div
          className={
            !active
              ? "border-b-2 border-b-[#6A38C2] w-fit cursor-pointer"
              : "cursor-pointer"
          }
          onClick={() => setActive(false)}
        >
          Inactive
        </div>
      </menu>

      <Table>
        <TableCaption>
          {active
            ? "List of active application"
            : "List of inactive application"}
        </TableCaption>
        <TableHeader>
          <TableHead>Date</TableHead>
          <TableHead>Job Role</TableHead>
          <TableHead>Company</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableHeader>
        <TableBody>
          {active ? (
            activeJobs.length !== 0 ? (
              activeJobs.map((appliedJob) => (
                <TableRow key={appliedJob._id}>
                  <TableCell>{appliedJob.createdAt.split("T")[0]}</TableCell>
                  <TableCell>{appliedJob.job.title}</TableCell>
                  <TableCell>{appliedJob.job.company.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge className="bg-gray-400">
                      {appliedJob.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <span className="text-sm text-gray-500">
                You have no active job application.
              </span>
            )
          ) : inactiveJobs.length !== 0 ? (
            inactiveJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>{appliedJob.createdAt.split("T")[0]}</TableCell>
                <TableCell>{appliedJob.job.title}</TableCell>
                <TableCell>{appliedJob.job.company.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      appliedJob.status === "accepted"
                        ? "bg-green-400"
                        : "bg-red-400"
                    }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <span className="text-sm text-gray-500">
              You have no inactive job application.
            </span>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobs;
