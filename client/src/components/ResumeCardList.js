// src/components/ResumeCardList.js
import React from "react";
import { Grid } from "@mui/material";
import ResumeCard from "./ResumeCard";

const dummyResumeCardList = [
  {
    name: "Resume 1",
    image: "path-to-image-1.jpg",
    lastModifiedDate: Date.now(),
  },
  {
    name: "Resume 2",
    image: "path-to-image-2.jpg",
    lastModifiedDate: Date.now(),
  },
  // Add more dummy data as needed
];

const ResumeCardList = () => {
  return (
    <Grid container spacing={2}>
      {dummyResumeCardList.map((resume, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <ResumeCard resume={resume} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ResumeCardList;
