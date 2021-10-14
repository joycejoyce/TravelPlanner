import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeStep: 0
};

export const stepSlice = createSlice({
    name: "step",
    initialState,
    reducers: {
        toStep: (state, action) => {
            const stepNum = action.payload;
            state.activeStep = stepNum;
        }
    }
});

export const { toStep } = stepSlice.actions;

export const selectActiveStep = (state) => state.step.activeStep;

export default stepSlice.reducer;