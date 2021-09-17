import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    desc: "",
    position: {
        latLng: null,
        address: ""
    }
}

export const centerPointSlice = createSlice({
    name: "centerPoint",
    initialState,
    reducers: {
        changeDesc: (state, action) => {
            state.desc = action.payload;
        },
        changePosition: (state, action) => {
            const { latLng, address } = action.payload;
            state.position.latLng = latLng;
            state.position.address = address;
        }
    }
});

export const { changeDesc, changePosition } = centerPointSlice.actions;

export const selectDesc = (state) => state.centerPoint.desc;
export const selectPosition = (state) => state.centerPoint.position;

export default centerPointSlice.reducer;