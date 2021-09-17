// React
import { createSlice } from '@reduxjs/toolkit';

// my components
import CenterPoint from "./centerPoint/CenterPoint.js";
import Date from "./Date.js";
import Radius from "./Radius.js";

export const Criterion = {
    centerPoint: "centerPoint",
    date: "date",
    radius: "radius"
}

const initialState = {
    [Criterion.centerPoint]: {
        num: 1,
        id: "center-point",
        summary: "Set center point",
        isUnlock: true,
        isActive: true,
        isExpanded: true,
        detail: <CenterPoint />
    },
    [Criterion.date]: {
        num: 2,
        id: "date",
        summary: "Set date",
        isUnlock: false,
        isActive: false,
        isExpanded: false,
        detail: <Date />
    },
    [Criterion.radius]: {
        num: 3,
        id: "radius",
        summary: "Set radius",
        isUnlock: false,
        isActive: false,
        isExpanded: false,
        detail: <Radius />
    }
};

export const criteriaSlice = createSlice({
    name: "criteria",
    initialState,
    reducers: {
        unlockStep: (state, action) => {
            const stepName = action.payload;
            state[stepName].isUnlock = true;
        },
        expandStep: (state, action) => {
            const stepName = action.payload;
            state[stepName].isExpanded = true;
        },
        collapseStep: (state, action) => {
            const stepName = action.payload;
            state[stepName].isExpanded = false;
        },
        changeActiveStep: (state, action) => {
            const { currStep, nextStep } = action.payload;
            state[currStep].isActive = false;
            state[nextStep].isActive = true;
        },
        toggleExpanded: (state, action) => {
            const stepName = action.payload;
            state[stepName].isExpanded = !state[stepName].isExpanded;
        }
    }
});

export const { 
    unlockStep,
    expandStep,
    collapseStep,
    changeActiveStep,
    toggleExpanded
} = criteriaSlice.actions;

export const selectCriteria_centerPoint = (state) => state.criteria.centerPoint;
export const selectCriteria_date = (state) => state.criteria.date;
export const selectCriteria_radius = (state) => state.criteria.radius;
export const selectCriteria_all = (state) => state.criteria;

export default criteriaSlice.reducer;