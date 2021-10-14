// my components
import { POIName } from "../criteria/POIs";

// Redux
import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const poiDataSlice = createSlice({
    name: "poiData",
    initialState,
    reducers: {
        changePOI: (state, action) => {
            const poiData = action.payload;
            Object.keys(POIName).forEach((poiName) => {
                state[poiName] = poiData[poiName];
            });
            // Object.entries(poiData).forEach(([poiName, poiData]) => {
            //     state[poiName] = poiData;
            // });
        },
        resetPOIs: (state) => {
            state = initialState;
        }
    }
});

export const {
    changePOI,
    resetPOIs
} = poiDataSlice.actions;

export const selectPOIData = (state) => state.poiData;

export default poiDataSlice.reducer;