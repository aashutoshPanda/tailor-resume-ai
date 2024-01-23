// src/components/ResumeCard.js
import React from "react";
import { Card, CardContent, CardActions, useTheme, IconButton, Typography, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import ResumePreviewImage from "../assets/resume-preview.webp";
import { useDispatch } from "react-redux";
import { deleteResume } from "../reducers/resumeBuilderSlice";
import { useNavigate } from "react-router-dom";

const ResumeCard = ({ resume }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(deleteResume(id));
  };
  const handleEdit = (id) => {
    navigate(`/resume/${id}`);
  };

  return (
    <Card style={{ marginTop: theme.spacing(2), maxWidth: theme.spacing(80) }}>
      {/* Card Content */}
      <CardContent>
        <Typography variant="h6" component="div" align="left">
          {resume.name}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" align="left">
          Last Edited: {resume.lastModified}
        </Typography>

        <img src={ResumePreviewImage} alt={resume.name} style={{ width: "40%", height: "auto" }} />
      </CardContent>

      {/* Card Actions */}
      <CardActions>
        <Box ml="auto">
          <IconButton aria-label="download" size="small">
            <DownloadIcon />
          </IconButton>
          <IconButton aria-label="edit" size="small" onClick={() => handleEdit(resume._id)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" size="small" onClick={() => handleDelete(resume._id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="share" size="small">
            <ShareIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ResumeCard;
