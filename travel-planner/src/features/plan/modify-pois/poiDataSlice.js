// my components
import { POIInfo } from "../criteria/POIs";

// Redux
import { createSlice } from "@reduxjs/toolkit";

const initialState = Object.keys(POIInfo).reduce((accu, name) => {
    accu[name] = {};
    return accu;
}, {});

export const poiDataSlice = createSlice({
    name: "poiData",
    initialState,
    reducers: {
        changePOI: (state, action) => {
            const { name, poiData } = action.payload;
            state[name] = poiData;
        }
    }
});

export const {
    changePOI
} = poiDataSlice.actions;

export const selectPOIData = (state) => state.poiData;

export default poiDataSlice.reducer;