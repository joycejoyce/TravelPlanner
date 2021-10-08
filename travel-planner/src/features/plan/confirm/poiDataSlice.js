// my components
import { POIName } from "../criteria/POIs";

// Redux
import { createSlice } from "@reduxjs/toolkit";

// const initialState = Object.keys(POIName).reduce((accu, name) => {
//     accu[name] = {};
//     return accu;
// }, {});
const initialState = {};

export const poiDataSlice = createSlice({
    name: "poiData",
    initialState,
    reducers: {
        changePOI: (state, action) => {
            const poiData = action.payload;
            Object.entries(poiData).forEach(([poiName, poiData]) => {
                state[poiName] = poiData;
            });
        }
    }
});

export const {
    changePOI
} = poiDataSlice.actions;

export const selectPOIData = (state) => state.poiData;

export default poiDataSlice.reducer;