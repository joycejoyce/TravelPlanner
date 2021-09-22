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
    radius: 10,
    pois: {
        breakfast: {
            label: "Breakfast",
            checked: false,
            timeStart: "06:00",
            timeEnd: "09:00"
        },
        poi1: {
            label: "Point-of-Interst #1",
            checked: false,
            timeStart: "09:00",
            timeEnd: "12:00"
        },
        lunch: {
            label: "Lunch",
            checked: false,
            timeStart: "12:00",
            timeEnd: "13:00"
        },
        poi2: {
            label: "Point-of-Interst #2",
            checked: false,
            timeStart: "13:00",
            timeEnd: "15:00"
        },
        poi3: {
            label: "Point-of-Interst #3",
            checked: false,
            timeStart: "15:00",
            timeEnd: "18:00"
        },
        dinner: {
            label: "Dinner",
            checked: false,
            timeStart: "18:00",
            timeEnd: "21:00"
        }
    }
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
            state.pois[name].checked = checked;
        }
    }
});

export const {
    changeDate,
    changeDesc,
    changePosition,
    changeRadius,
    changePOIs
} = criteriaSlice.actions;

export const selectDesc = (state) => state.criteria.centerPoint.desc;
export const selectPosition = (state) => state.criteria.centerPoint.position;
export const selectDate = (state) => state.criteria.date;
export const selectRadius = (state) => state.criteria.radius;
export const selectPOIs = (state) => state.criteria.pois;

export default criteriaSlice.reducer;