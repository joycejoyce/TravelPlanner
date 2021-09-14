import { configureStore } from "@reduxjs/toolkit";
import centerPointReducer from "../features/criteria/centerPoint/centerPointSlice.js";

export const store = configureStore({
    reducer: {
        centerPoint: centerPointReducer
    }
});