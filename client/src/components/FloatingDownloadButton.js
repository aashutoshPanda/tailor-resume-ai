import { Fab } from "@mui/material";
import { Download } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";

export const FloatingDownloadButton = ({ handleClick }) => {
  return (
    <Fab
      onClick={handleClick}
      color="primary"
      aria-label="add"
      style={{
        position: "fixed",
        bottom: "16px",
        right: "16px",
        zIndex: 1000, // Adjust the z-index as needed
      }}
    >
      <Download />
    </Fab>
  );
};

export const FloatingSaveButton = ({ handleClick }) => {
  return (
    <Fab
      onClick={handleClick}
      color="primary"
      aria-label="add"
      style={{
        position: "fixed",
        bottom: "16px",
        right: "100px",
        zIndex: 1000, // Adjust the z-index as needed
      }}
    >
      <SaveIcon />
    </Fab>
  );
};
