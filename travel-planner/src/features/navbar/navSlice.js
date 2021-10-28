import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    idx: 0
};

export const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        changeIdx: (state, action) => {
            state.idx = action.payload;
        }
    }
});

export const { changeIdx } = navSlice.actions;

export const selectIdx = (state) => state.nav.idx;

export default navSlice.reducer;