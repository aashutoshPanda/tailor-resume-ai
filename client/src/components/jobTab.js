// src/components/JobsScreen.js
import React, { useState } from "react";
import {
  Container,
  Paper,
  Tab,
  Tabs,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import addJobOpeningImage from "../assets/add-job.svg";

const JobOpeningTable = ({ jobOpeningList }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("lastModified");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  if (jobOpeningList.length === 0) {
    return (
      <Typography variant="body1">No job openings are present.</Typography>
    );
  }

  const sortedJobOpeningList = jobOpeningList
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .sort((a, b) => {
      const isAsc = order === "asc";
      if (orderBy === "lastModified") {
        return isAsc
          ? a.lastModified - b.lastModified
          : b.lastModified - a.lastModified;
      }
      if (orderBy === "lastDate") {
        return isAsc ? a.lastDate - b.lastDate : b.lastDate - a.lastDate;
      }
      return 0;
    });

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Organisation</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "lastModified"}
                  direction={orderBy === "lastModified" ? order : "asc"}
                  onClick={createSortHandler("lastModified")}
                >
                  Last Modified
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "lastDate"}
                  direction={orderBy === "lastDate" ? order : "asc"}
                  onClick={createSortHandler("lastDate")}
                >
                  Last Date
                </TableSortLabel>
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Manage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedJobOpeningList.map((job, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell>{job.organisation}</TableCell>
                <TableCell>{job.designation}</TableCell>
                <TableCell>
                  {new Date(job.lastModified).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(job.lastDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    color={job.status === "APPLIED" ? "success" : "warning"}
                  >
                    {job.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box>
                    <EditIcon
                      style={{ cursor: "pointer", marginRight: "8px" }}
                    />
                    <DeleteIcon
                      style={{ cursor: "pointer", marginRight: "8px" }}
                    />
                    <LaunchIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => window.open(job.jobLink, "_blank")}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[8, 16, 24]}
        component="div"
        count={jobOpeningList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};
const dummyJobOpeningList = [
  {
    organisation: "Google",
    designation: "SDE 1",
    lastModified: new Date(2023, 3, 15), // April 15, 2023
    lastDate: new Date(2023, 4, 1), // May 1, 2023
    jobLink: "https://google.com",
    status: "APPLIED",
  },
  {
    organisation: "Microsoft",
    designation: "Software Engineer",
    lastModified: new Date(2023, 2, 20), // March 20, 2023
    lastDate: new Date(2023, 3, 15), // April 15, 2023
    jobLink: "https://microsoft.com",
    status: "PENDING",
  },
  {
    organisation: "Facebook",
    designation: "Frontend Developer",
    lastModified: new Date(2023, 1, 10), // February 10, 2023
    lastDate: new Date(2023, 2, 1), // March 1, 2023
    jobLink: "https://facebook.com",
    status: "APPLIED",
  },
  {
    organisation: "Amazon",
    designation: "Data Scientist",
    lastModified: new Date(2023, 4, 5), // May 5, 2023
    lastDate: new Date(2023, 5, 1), // June 1, 2023
    jobLink: "https://amazon.com",
    status: "PENDING",
  },
  {
    organisation: "Apple",
    designation: "iOS Developer",
    lastModified: new Date(2023, 0, 25), // January 25, 2023
    lastDate: new Date(2023, 1, 15), // February 15, 2023
    jobLink: "https://apple.com",
    status: "APPLIED",
  },
  {
    organisation: "Twitter",
    designation: "Software Engineer",
    lastModified: new Date(2023, 3, 8), // April 8, 2023
    lastDate: new Date(2023, 4, 1), // May 1, 2023
    jobLink: "https://twitter.com",
    status: "PENDING",
  },
  {
    organisation: "LinkedIn",
    designation: "Backend Developer",
    lastModified: new Date(2023, 2, 15), // March 15, 2023
    lastDate: new Date(2023, 3, 1), // April 1, 2023
    jobLink: "https://linkedin.com",
    status: "APPLIED",
  },
  {
    organisation: "Netflix",
    designation: "UI/UX Designer",
    lastModified: new Date(2023, 0, 5), // January 5, 2023
    lastDate: new Date(2023, 0, 31), // January 31, 2023
    jobLink: "https://netflix.com",
    status: "PENDING",
  },
  {
    organisation: "Spotify",
    designation: "Data Engineer",
    lastModified: new Date(2023, 5, 10), // June 10, 2023
    lastDate: new Date(2023, 6, 1), // July 1, 2023
    jobLink: "https://spotify.com",
    status: "APPLIED",
  },
  {
    organisation: "Uber",
    designation: "Product Manager",
    lastModified: new Date(2023, 1, 28), // February 28, 2023
    lastDate: new Date(2023, 2, 15), // March 15, 2023
    jobLink: "https://uber.com",
    status: "PENDING",
  },
];

const JobsScreen = () => {
  const [tabValue, setTabValue] = React.useState(1);
  const theme = useTheme();

  return (
    <>
      {dummyJobOpeningList.length > 0 ? (
        <JobOpeningTable jobOpeningList={dummyJobOpeningList} />
      ) : (
        <img
          src={addJobOpeningImage}
          alt="No job openings available"
          style={{ width: "50%", height: "auto", marginTop: "24px" }}
        />
      )}
    </>
  );
};

export default JobsScreen;
