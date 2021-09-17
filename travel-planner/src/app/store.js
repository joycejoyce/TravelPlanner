import { configureStore } from "@reduxjs/toolkit";
import centerPointReducer from "../features/criteria/centerPoint/centerPointSlice.js";
import modalOpenReducer from "../features/criteria/centerPoint/modalOpenSlice.js";
import criteriaReducer from "../features/criteria/criteriaSlice.js";

export const store = configureStore({
    reducer: {
        centerPoint: centerPointReducer,
        modalOpen: modalOpenReducer,
        criteria: criteriaReducer
    }
});