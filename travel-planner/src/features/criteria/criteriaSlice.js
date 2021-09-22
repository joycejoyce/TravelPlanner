import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    centerPoint: {
        desc: "",
        position: {
            latLng: null,
            address: ""
        }
    },
    date: new Date(),
    radius: 30
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
        }
    }
});

export const {
    changeDate,
    changeDesc,
    changePosition,
    changeRadius
} = criteriaSlice.actions;

export const selectDesc = (state) => state.criteria.centerPoint.desc;
export const selectPosition = (state) => state.criteria.centerPoint.position;
export const selectDate = (state) => state.criteria.date;
export const selectRadius = (state) => state.criteria.radius;

export default criteriaSlice.reducer;