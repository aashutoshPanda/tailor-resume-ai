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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";

const JobOpeningTable = ({ jobOpeningList }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("lastModified");

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

  const sortedJobOpeningList = jobOpeningList.sort((a, b) => {
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
    <TableContainer component={Paper} style={{ marginTop: "16px" }}>
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
              <TableCell>{index + 1}</TableCell>
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
                  <EditIcon style={{ cursor: "pointer", marginRight: "8px" }} />
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
  );
};

const JobsScreen = () => {
  const [tabValue, setTabValue] = React.useState(1);
  const theme = useTheme();

  const dummyJobOpeningList = [
    {
      organisation: "Google",
      designation: "SDE 1",
      lastModified: Date.now(),
      lastDate: new Date(),
      jobLink: "https://google.com",
      status: "APPLIED",
    },
    {
      organisation: "Microsoft",
      designation: "Software Engineer",
      lastModified: Date.now(),
      lastDate: new Date(),
      jobLink: "https://microsoft.com",
      status: "PENDING",
    },
    {
      organisation: "Facebook",
      designation: "Frontend Developer",
      lastModified: Date.now(),
      lastDate: new Date(),
      jobLink: "https://facebook.com",
      status: "APPLIED",
    },
    {
      organisation: "Amazon",
      designation: "Data Scientist",
      lastModified: Date.now(),
      lastDate: new Date(),
      jobLink: "https://amazon.com",
      status: "PENDING",
    },
    {
      organisation: "Apple",
      designation: "iOS Developer",
      lastModified: Date.now(),
      lastDate: new Date(),
      jobLink: "https://apple.com",
      status: "APPLIED",
    },
    {
      organisation: "Twitter",
      designation: "Software Engineer",
      lastModified: Date.now(),
      lastDate: new Date(),
      jobLink: "https://twitter.com",
      status: "PENDING",
    },
    {
      organisation: "LinkedIn",
      designation: "Backend Developer",
      lastModified: Date.now(),
      lastDate: new Date(),
      jobLink: "https://linkedin.com",
      status: "APPLIED",
    },
    {
      organisation: "Netflix",
      designation: "UI/UX Designer",
      lastModified: Date.now(),
      lastDate: new Date(),
      jobLink: "https://netflix.com",
      status: "PENDING",
    },
    {
      organisation: "Spotify",
      designation: "Data Engineer",
      lastModified: Date.now(),
      lastDate: new Date(),
      jobLink: "https://spotify.com",
      status: "APPLIED",
    },
    {
      organisation: "Uber",
      designation: "Product Manager",
      lastModified: Date.now(),
      lastDate: new Date(),
      jobLink: "https://uber.com",
      status: "PENDING",
    },
  ];

  return <JobOpeningTable jobOpeningList={dummyJobOpeningList} />;
};

export default JobsScreen;
