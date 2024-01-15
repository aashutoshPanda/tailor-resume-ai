// src/components/ResumeCardList.js
import React from "react";
import { Grid } from "@mui/material";
import ResumeCard from "./ResumeCard";
import EmptyListImage from "../assets/add-resume.svg";

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
];

const ResumeCardList = () => {
  if (dummyResumeCardList.length === 0) {
    return (
      <img
        src={EmptyListImage}
        alt="Empty List"
        style={{ width: "50%", height: "auto", marginTop: "12px" }}
      />
    );
  }

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
