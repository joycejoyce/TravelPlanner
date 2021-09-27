import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeStep: 0
}

export const stepSlice = createSlice({
    name: "step",
    initialState,
    reducers: {
        toNextStep: (state) => {
            state.activeStep = state.activeStep + 1;
        },
        toPrevStep: (state) => {
            state.activeStep = state.activeStep - 1;
        }
    }
});

export const { toNextStep, toPrevStep } = stepSlice.actions;

export const selectActiveStep = (state) => state.step.activeStep;

export default stepSlice.reducer;