import { configureStore } from "@reduxjs/toolkit";
import modalOpenReducer from "../features/plan/criteria/centerPoint/modalOpenSlice.js";
import criteriaReducer from "../features/plan/criteria/criteriaSlice.js";
import validateCriteriaReducer from "../features/plan/criteria/validateCriteriaSlice.js";
import stepReduce from "../features/plan/stepSlice.js";

export const store = configureStore({
    reducer: {
        modalOpen: modalOpenReducer,
        criteria: criteriaReducer,
        validateCriteria: validateCriteriaReducer,
        step: stepReduce
    }
});