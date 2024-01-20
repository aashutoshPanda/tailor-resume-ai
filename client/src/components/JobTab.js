// src/components/JobsScreen.js
import addJobOpeningImage from "../assets/add-job.svg";
import JobOpeningTable from "./JobTable";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, fetchJobById, updateLocalJob, updateJob, deleteJob, addJob } from "../reducers/jobSlice";

const JobsScreen = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);

  useEffect(() => {
    // Fetch jobs when the component mounts
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <>
      {jobs.length > 0 ? (
        <JobOpeningTable jobOpeningList={jobs} />
      ) : (
        <img
          src={addJobOpeningImage}
          alt="No job openings available"
          style={{ width: "50%", height: "auto", marginTop: "24px" }}
        />
      )}
    </>
  );
};

export default JobsScreen;
