import React, { useState } from "react";
import { Card, CardContent, CardActions, useTheme, IconButton, Typography, Box, Snackbar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch } from "react-redux";
import { deleteResume, updateVisibility } from "../reducers/resumeBuilderSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import api from "../api";
import { visibilityTypes } from "../constants/resumeBuilder";
import Label from "./MinimalMUILabel";

const ResumeCard = ({ resume }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleDelete = (id) => {
    dispatch(deleteResume(id));
  };

  const handleEdit = (id) => {
    navigate(`/resume/${id}`);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setSnackbarMessage("Copied to clipboard successfully.");
    } catch (error) {
      console.error(error.message);
      setSnackbarMessage("Failed to copy to clipboard.");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleShare = async (id, visibility) => {
    let url = `${process.env.REACT_APP_FRONTEND_BASE_URL}/resume/share/${id}`;
    try {
      if (visibility !== visibilityTypes.public) {
        await api.patch(`/resumes/${id}`, { visibility: visibilityTypes.public });
      }
      await copyToClipboard(url);
      dispatch(updateVisibility({ id, visibility: visibilityTypes.public }));
    } catch (error) {
      console.error(error.message);
      setSnackbarMessage("Failed to make resume public");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const lastModifiedMoment = moment(resume.lastModified);
  const elapsed = lastModifiedMoment.fromNow();
  const visibility = (
    <Label
      variant="filled"
      color="primary"
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: "absolute",
        textTransform: "uppercase",
      }}
    >
      {resume.visibility}
    </Label>
  );

  return (
    <Card style={{ marginTop: theme.spacing(2), maxWidth: theme.spacing(80) }}>
      <CardContent>
        <Typography variant="h6" component="div" align="left">
          {resume.name}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" align="left">
          Last Edited: {elapsed}
        </Typography>
        <img src={resume.thumbnail} alt={resume.name} style={{ width: "40%", height: "auto" }} />
        {resume.visibility === visibilityTypes.public ? visibility : null}
      </CardContent>
      <CardActions>
        <Box ml="auto">
          <IconButton aria-label="download" size="small" onClick={() => handleEdit(resume._id)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton aria-label="edit" size="small" onClick={() => handleEdit(resume._id)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" size="small" onClick={() => handleDelete(resume._id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="share" size="small" onClick={() => handleShare(resume._id, resume.visibility)}>
            <ShareIcon />
          </IconButton>
        </Box>
      </CardActions>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Card>
  );
};

export default ResumeCard;
