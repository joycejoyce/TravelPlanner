import { createSlice } from "@reduxjs/toolkit";
import { POIInfo } from "./POIs.js";

export const CriteriaName = {
    centerPoint: "centerPoint",
    date: "date",
    radius: "radius",
    pois: "pois"
};

const initialState = {
    [CriteriaName.centerPoint]: {
        desc: "",
        position: {
            latLng: null,
            address: ""
        }
    },
    [CriteriaName.date]: new Date(),
    [CriteriaName.radius]: 10,
    [CriteriaName.pois]: Object.keys(POIInfo).reduce((accu, poiName) => {
        accu[poiName] = false;
        return accu;
    }, {})
}

export const criteriaSlice = createSlice({
    name: "criteria",
    initialState,
    reducers: {
        changeDate: (state, action) => {
            state.date = action.payload;
        },
        changeDesc: (state, action) => {
            state.centerPoint.desc = action.payload;
        },
        changePosition: (state, action) => {
            const { latLng, address } = action.payload;
            state.centerPoint.position.latLng = latLng;
            state.centerPoint.position.address = address;
        },
        changeRadius: (state, action) => {
            state.radius = action.payload;
        },
        changePOIs: (state, action) => {
            const { name, checked } = action.payload;
            state.pois[name] = checked;
        },
        resetCriteria: () => {
            return initialState;
        }
    }
});

export const {
    changeDate,
    changeDesc,
    changePosition,
    changeRadius,
    changePOIs,
    resetCriteria
} = criteriaSlice.actions;

export const selectDesc = (state) => state.criteria.centerPoint.desc;
export const selectPosition = (state) => state.criteria.centerPoint.position;
export const selectDate = (state) => state.criteria.date;
export const selectRadius = (state) => state.criteria.radius;
export const selectPOIs = (state) => state.criteria.pois;
export const selectAll = (state) => state.criteria;

export default criteriaSlice.reducer;