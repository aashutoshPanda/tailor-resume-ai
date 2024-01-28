import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import { useDispatch } from "react-redux";
import { deleteResume } from "../reducers/resumeBuilderSlice";
import { useNavigate } from "react-router-dom";
import ResumePreviewImage from "../assets/resume-preview.png";

export default function ResumeCardV2({ resume }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    await dispatch(deleteResume(id));
  };
  const handleEdit = (id) => {
    navigate(`/resume/${id}`);
  };

  const renderImg = (
    <Box
      component="img"
      alt={resume.name}
      src={ResumePreviewImage}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: "cover",
        position: "absolute",
      }}
    />
  );

  const renderBottomRight = <Typography variant="subtitle1">{resume.lastModified}</Typography>;

  return (
    <Card style={{ maxWidth: "100px" }}>
      <Box sx={{ pt: "100%", position: "relative" }}>{renderImg}</Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {resume.name}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
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
          {renderBottomRight}
        </Stack>
      </Stack>
    </Card>
  );
}
