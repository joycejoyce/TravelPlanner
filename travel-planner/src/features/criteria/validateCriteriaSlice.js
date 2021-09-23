import { createSlice } from "@reduxjs/toolkit";
import { CriteriaName } from "./criteriaSlice.js";

const initialState = Object.keys(CriteriaName).reduce((accu, name) => {
    accu[name] = "";
    return accu;
}, {});

export const validateCriteriaSlice = createSlice({
    name: "validateCriteria",
    initialState,
    reducers: {
        changeErrMsg: (state, action) => {
            const { name, errMsg } = action.payload;
            state[name] = errMsg;
        }
    }
});

export const {
    changeErrMsg
} = validateCriteriaSlice.actions;

export const selectErrMsg_centerPoint = (state) => state.validateCriteria[CriteriaName.centerPoint];
export const selectErrMsg_date = (state) => state.validateCriteria[CriteriaName.date];
export const selectErrMsg_pois = (state) => state.validateCriteria[CriteriaName.pois];
export const selectErrMsg = (state) => state.validateCriteria;

export default validateCriteriaSlice.reducer;