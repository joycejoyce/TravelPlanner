// Redux
import { createSlice } from "@reduxjs/toolkit";

export const ItineraryFieldName = {
    name: "name",
    poiNumber: "poiNumber"
}

const initialState = Object.keys(ItineraryFieldName).reduce((accu, fieldName) => {
    accu[fieldName] = "";
    return accu;
}, {});

export const validateItinerarySlice = createSlice({
    name: "validateItinerary",
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
} = validateItinerarySlice.actions;

export const selectErrMsg = (state) => state.validateItinerary;

export default validateItinerarySlice.reducer;