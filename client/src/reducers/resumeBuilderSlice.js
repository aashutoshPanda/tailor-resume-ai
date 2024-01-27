// reducers/resumeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { initialEducationDetails, initialExperience, initialResumeState } from "../constants/resumeBuilder";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { improveResumeJSONWithGPT } from "../utils/openai.js";

// Async Thunks
export const fetchAllResumes = createAsyncThunk("resume/fetchAllResumes", async () => {
  const response = await api.get("resumes");
  return response.data;
});

export const improveResumeWithGPT = createAsyncThunk("resume/improveWithGPT", async (resume) => {
  const improvedResume = await improveResumeJSONWithGPT(resume);
  return improvedResume;
});

export const fetchResumeById = createAsyncThunk("resume/fetchResume", async (id) => {
  if (id === "new") return initialResumeState;
  const response = await api.get(`/resumes/${id}`);

  // this way we keep the defaults of fields as well
  // like experienceDetails key, which should be in state but not in db
  return { ...initialResumeState, ...response.data };
});

export const updateResume = createAsyncThunk("resume/updateResume", async (resume) => {
  const response = await api.patch(`/resumes/${resume._id}`, resume);
  return response.data;
});

export const deleteResume = createAsyncThunk("resume/deleteResume", async (id) => {
  await api.delete(`/resumes/${id}`);
  return id;
});

export const addResume = createAsyncThunk("resume/addResume", async (resume) => {
  const response = await api.post("/resumes", resume);
  return response.data;
});

const resumeBuilderSlice = createSlice({
  name: "resumeBuilder",
  initialState: {
    resumes: [],
    selectedResume: { ...initialResumeState },
    loading: false,
  },
  reducers: {
    updateResumeName: (state, action) => {
      state.selectedResume.name = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTemplate: (state, action) => {
      state.selectedResume.template = action.payload;
    },
    updateBasicDetails: (state, action) => {
      state.selectedResume.basicDetails = { ...state.selectedResume.basicDetails, ...action.payload };
    },
    updateEducationDetails: (state, action) => {
      state.selectedResume.educationDetails = { ...state.selectedResume.educationDetails, ...action.payload };
    },
    addEducation: (state) => {
      state.selectedResume.educationList = [
        ...state.selectedResume.educationList,
        state.selectedResume.educationDetails,
      ];
      state.selectedResume.educationDetails = initialEducationDetails;
    },
    deleteEducation: (state, action) => {
      state.selectedResume.educationList = state.selectedResume.educationList.filter((_, i) => i !== action.payload);
    },
    updateLanguage: (state, action) => {
      state.selectedResume.selectedLanguages = action.payload;
    },
    updateTool: (state, action) => {
      state.selectedResume.selectedTools = action.payload;
    },
    updateFramework: (state, action) => {
      state.selectedResume.selectedFrameworks = action.payload;
    },
    updateAwardDetails: (state, action) => {
      state.selectedResume.awardDetails = { ...state.selectedResume.awardDetails, ...action.payload };
    },
    addAward: (state) => {
      state.selectedResume.awardList = [...state.selectedResume.awardList, state.selectedResume.awardDetails];
      state.selectedResume.awardDetails = { name: "", year: "", shortDescription: "" };
    },
    deleteAward: (state, action) => {
      state.selectedResume.awardList = state.selectedResume.awardList.filter((_, i) => i !== action.payload);
    },
    updateExperienceDetails: (state, action) => {
      state.selectedResume.experienceDetails = {
        ...state.selectedResume.experienceDetails,
        ...action.payload,
      };
    },
    addExperience: (state) => {
      state.selectedResume.experienceList = [
        ...state.selectedResume.experienceList,
        state.selectedResume.experienceDetails,
      ];
      state.selectedResume.experienceDetails = initialExperience;
    },
    deleteExperience: (state, action) => {
      state.selectedResume.experienceList = state.selectedResume.experienceList.filter((_, i) => i !== action.payload);
    },
    updateProjectDetails: (state, action) => {
      state.selectedResume.projectDetails = { ...state.selectedResume.projectDetails, ...action.payload };
    },
    addProject: (state) => {
      state.selectedResume.projectList = [...state.selectedResume.projectList, state.selectedResume.projectDetails];
      state.selectedResume.projectDetails = {
        name: "",
        startDate: "",
        endDate: "",
        description: "",
        link: "",
      };
    },
    deleteProject: (state, action) => {
      state.selectedResume.projectList = state.selectedResume.projectList.filter((_, i) => i !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllResumes.fulfilled, (state, action) => {
        state.resumes = action.payload; // Assuming action.payload is the entire resume object
      })
      .addCase(fetchResumeById.fulfilled, (state, action) => {
        state.selectedResume = action.payload; // Assuming action.payload is the entire resume object
      })
      .addCase(updateResume.fulfilled, (state, action) => {
        state.selectedResume = { ...state.selectedResume, ...action.payload }; // Assuming action.payload is the entire resume object
      })
      .addCase(deleteResume.fulfilled, (state, action) => {
        const deletedResumeId = action.payload;
        state.resumes = state.resumes.filter((resume) => resume._id !== deletedResumeId);
      })
      .addCase(addResume.fulfilled, (state, action) => {
        state.resumes = [...state.resumes, action.payload]; // Assuming action.payload is the entire resume object
      })
      .addCase(improveResumeWithGPT.pending, (state) => {
        state.loading = true;
      })
      .addCase(improveResumeWithGPT.fulfilled, (state, action) => {
        state.loading = false;
        console.log("this is the payload", action.payload);
        console.log("this is the update state", { ...state.selectedResume, ...action.payload });
        const upadtedState = { ...state.selectedResume, ...action.payload };
        state.selectedResume = upadtedState;
      })
      .addCase(improveResumeWithGPT.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  updateResumeName,
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
  setLoading,
  setTemplate,
} = resumeBuilderSlice.actions;

export default resumeBuilderSlice.reducer;
