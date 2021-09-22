import { configureStore } from "@reduxjs/toolkit";
import modalOpenReducer from "../features/criteria/centerPoint/modalOpenSlice.js";
import criteriaReducer from "../features/criteria/criteriaSlice.js";

export const store = configureStore({
    reducer: {
        modalOpen: modalOpenReducer,
        criteria: criteriaReducer
    }
});