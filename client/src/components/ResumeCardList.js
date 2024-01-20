// src/components/ResumeCardList.js
import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import ResumeCard from "./ResumeCard";
import EmptyListImage from "../assets/add-resume.svg";

import { useDispatch, useSelector } from "react-redux";
import { fetchAllResumes } from "../reducers/resumeBuilderSlice";

const ResumeCardList = () => {
  const dispatch = useDispatch();
  const resumes = useSelector((state) => state.resumeBuilder.resumes);

  useEffect(() => {
    // Fetch jobs when the component mounts
    dispatch(fetchAllResumes());
  }, [dispatch]);

  if (resumes.length === 0) {
    return <img src={EmptyListImage} alt="Empty List" style={{ width: "50%", height: "auto", marginTop: "12px" }} />;
  }

  return (
    <Grid container spacing={2}>
      {resumes.map((resume) => (
        <Grid item xs={12} sm={6} key={resume._id}>
          <ResumeCard resume={resume} key={resume._id} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ResumeCardList;
