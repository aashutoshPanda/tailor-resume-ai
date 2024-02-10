import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function AbsolutePositionedChip() {
  const chipContainerStyle = {
    position: "fixed",
    left: "12px",
    top: "50%",
    transform: "translate(-50%) rotate(-90deg)",
    zIndex: 9999,
    cursor: "pointer",
  };

  return (
    <div style={chipContainerStyle}>
      <Stack direction="row" spacing={1}>
        <Chip
          avatar={<Avatar alt="Natacha" src="https://i.ibb.co/3z8L9vN/profile-pic.jpg" />}
          label="Made with ❤️ by Ashutosh Panda"
          href="https://github.com/aashutoshPanda"
          component="a"
          variant="filled"
          //   color="primary"
        />
      </Stack>
    </div>
  );
}
