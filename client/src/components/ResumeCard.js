// src/components/ResumeCard.js
import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  useTheme,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import ResumePreviewImage from "../assets/resume-preview.webp";

const ResumeCard = ({ resume }) => {
  const theme = useTheme();

  return (
    <Card style={{ marginTop: theme.spacing(2) }}>
      {/* Card Content */}
      <CardContent>
        <Typography variant="h6" component="div" align="left">
          {resume.name}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" align="left">
          Last Edited: {new Date(resume.lastModifiedDate).toLocaleString()}
        </Typography>

        <img
          src={ResumePreviewImage}
          alt={resume.name}
          style={{ width: "40%", height: "auto" }}
        />
      </CardContent>

      {/* Card Actions */}
      <CardActions>
        <Box ml="auto">
          <IconButton aria-label="download" size="small">
            <DownloadIcon />
          </IconButton>
          <IconButton aria-label="edit" size="small">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" size="small">
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
