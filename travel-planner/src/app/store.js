import { configureStore } from "@reduxjs/toolkit";
import modalOpenReducer from "../features/criteria/centerPoint/modalOpenSlice.js";
import criteriaReducer from "../features/criteria/criteriaSlice.js";
import validateCriteriaReducer from "../features/criteria/validateCriteriaSlice.js";

export const store = configureStore({
    reducer: {
        modalOpen: modalOpenReducer,
        criteria: criteriaReducer,
        validateCriteria: validateCriteriaReducer
    }
});