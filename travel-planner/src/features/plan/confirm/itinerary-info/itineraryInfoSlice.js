// Redux
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    rating: 0
};

export const ItineraryInfoFieldName = {
    name: "name",
    rating: "rating"
};

export const itineraryInfoSlice = createSlice({
    name: "itineraryInfo",
    initialState,
    reducers: {
        changeItineraryInfo: (state, action) => {
            const { fieldName, value } = action.payload;
            state[fieldName] = value;
        }
    }
});

export const {
    changeItineraryInfo
} = itineraryInfoSlice.actions;

export const selectItineraryInfo = (state) => state.itineraryInfo;

export default itineraryInfoSlice.reducer;