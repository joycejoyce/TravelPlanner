import { createSlice } from "@reduxjs/toolkit";
import { POIName } from "./POIs.js";
import { POITypeName } from "./POITypes.js";

export const CriteriaName = {
    centerPoint: "centerPoint",
    date: "date",
    radius: "radius",
    pois: "pois",
    poiTypes: "poiTypes"
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
    [CriteriaName.pois]: Object.keys(POIName).reduce((accu, name) => {
        accu[name] = true;
        return accu;
    }, {}),
    [CriteriaName.poiTypes]: Object.keys(POITypeName).reduce((accu, type) => {
        accu[type] = false;
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
        changePOITypes: (state, action) => {
            const { name, checked } = action.payload;
            state.poiTypes[name] = checked;
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
    changePOITypes,
    resetCriteria
} = criteriaSlice.actions;

export const selectDesc = (state) => state.criteria.centerPoint.desc;
export const selectPosition = (state) => state.criteria.centerPoint.position;
export const selectDate = (state) => state.criteria.date;
export const selectRadius = (state) => state.criteria.radius;
export const selectPOIs = (state) => state.criteria.pois;
export const selectPOITypes = (state) => state.criteria.poiTypes;
export const selectAll = (state) => state.criteria;

export default criteriaSlice.reducer;