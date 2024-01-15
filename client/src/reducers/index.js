// reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import resumeBuilderReducer from "./resumeBuilderSlice";

const rootReducer = combineReducers({
  resumeBuilder: resumeBuilderReducer,
  // Add other reducers here
});

export default rootReducer;
