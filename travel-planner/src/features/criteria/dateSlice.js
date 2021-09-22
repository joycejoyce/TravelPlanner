import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    date: new Date()
}

export const dateSlice = createSlice({
    name: "date",
    initialState,
    reducers: {
        changeDate: (state, action) => {
            state.date = action.payload;
        }
    }
});

export const { changeDate } = dateSlice.actions;

export const selectDate = (state) => state.date.date;

export default dateSlice.reducer;