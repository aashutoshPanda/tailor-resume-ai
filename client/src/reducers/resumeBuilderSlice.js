// reducers/resumeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  initialBasicDetails,
  initialEducationDetails,
  initialEducationList,
  initialSelectedLanguages,
  initialAwardList,
  initialAward,
  initialExperience,
  initialExperienceList,
  initialProject,
  initialProjectList,
} from "../constants/resumeBuilder";

const initialState = {
  basicDetails: initialBasicDetails,
  educationDetails: initialEducationDetails,
  educationList: initialEducationList,
  selectedLanguages: initialSelectedLanguages,
  selectedTools: ["Git", "VS Code"],
  selectedFrameworks: initialSelectedLanguages,
  awardDetails: initialAward,
  awardList: initialAwardList,
  experienceDetails: initialExperience,
  experienceList: initialExperienceList,
  projectDetails: initialProject,
  projectList: initialProjectList,
};

const resumeBuilderSlice = createSlice({
  name: "resumeBuilder",
  initialState,
  reducers: {
    updateBasicDetails: (state, action) => {
      state.basicDetails = { ...state.basicDetails, ...action.payload };
    },
    updateEducationDetails: (state, action) => {
      state.educationDetails = { ...state.educationDetails, ...action.payload };
    },
    addEducation: (state) => {
      state.educationList = [...state.educationList, state.educationDetails];
      state.educationDetails = initialEducationDetails;
    },
    deleteEducation: (state, action) => {
      state.educationList = state.educationList.filter(
        (_, i) => i !== action.payload
      );
    },
    updateLanguage: (state, action) => {
      state.selectedLanguages = action.payload;
    },
    updateTool: (state, action) => {
      state.selectedTools = action.payload;
    },
    updateFramework: (state, action) => {
      state.selectedFrameworks = action.payload;
    },
    updateAwardDetails: (state, action) => {
      state.awardDetails = { ...state.awardDetails, ...action.payload };
    },
    addAward: (state) => {
      state.awardList = [...state.awardList, state.awardDetails];
      state.awardDetails = { name: "", year: "", shortDescription: "" };
    },
    deleteAward: (state, action) => {
      state.awardList = state.awardList.filter((_, i) => i !== action.payload);
    },
    updateExperienceDetails: (state, action) => {
      state.experienceDetails = {
        ...state.experienceDetails,
        ...action.payload,
      };
    },
    addExperience: (state) => {
      state.experienceList = [...state.experienceList, state.experienceDetails];
      state.experienceDetails = initialExperience;
    },
    deleteExperience: (state, action) => {
      state.experienceList = state.experienceList.filter(
        (_, i) => i !== action.payload
      );
    },
    updateProjectDetails: (state, action) => {
      state.projectDetails = { ...state.projectDetails, ...action.payload };
    },
    addProject: (state) => {
      state.projectList = [...state.projectList, state.projectDetails];
      state.projectDetails = {
        name: "",
        startDate: "",
        endDate: "",
        description: "",
        link: "",
      };
    },
    deleteProject: (state, action) => {
      state.projectList = state.projectList.filter(
        (_, i) => i !== action.payload
      );
    },
  },
});

export const {
  updateBasicDetails,
  updateEducationDetails,
  addEducation,
  deleteEducation,
  updateLanguage,
  updateTool,
  updateFramework,
  updateAwardDetails,
  addAward,
  deleteAward,
  updateExperienceDetails,
  addExperience,
  deleteExperience,
  updateProjectDetails,
  addProject,
  deleteProject,
} = resumeBuilderSlice.actions;

export default resumeBuilderSlice.reducer;
