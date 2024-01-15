import { Fab } from "@mui/material";
import { Download } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";

const FloatingButton = ({ icon }) => {
  return (
    <Fab
      color="primary"
      aria-label="add"
      style={{
        position: "fixed",
        bottom: "16px",
        right: "16px",
        zIndex: 1000, // Adjust the z-index as needed
      }}
    >
      {icon}
    </Fab>
  );
};

export const FloatingDownloadButton = ({ handleClick }) => {
  const icon = <Download onClick={handleClick} />;
  return (
    <Fab
      color="primary"
      aria-label="add"
      style={{
        position: "fixed",
        bottom: "16px",
        right: "16px",
        zIndex: 1000, // Adjust the z-index as needed
      }}
    >
      {icon}
    </Fab>
  );
};

export const FloatingSaveButton = ({ handleClick }) => {
  const icon = <SaveIcon onClick={handleClick} />;
  return (
    <Fab
      color="primary"
      aria-label="add"
      style={{
        position: "fixed",
        bottom: "16px",
        right: "100px",
        zIndex: 1000, // Adjust the z-index as needed
      }}
    >
      {icon}
    </Fab>
  );
};
