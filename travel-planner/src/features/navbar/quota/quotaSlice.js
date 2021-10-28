import { createSlice } from "@reduxjs/toolkit";
import { getCurQuota, changeQuota_inLocalStorage } from "./quotaHandler.js";

const initialState = {
    quota: 0
};

export const quotaSlice = createSlice({
    name: "quota",
    initialState,
    reducers: {
        changeQuota: (state, action) => {
            const curQuota = getCurQuota();
            const { amount, source } = action.payload;
            
            const newQuota = curQuota + amount;
            state.quota = newQuota;

            changeQuota_inLocalStorage(newQuota, source);
        },
        syncQuota: (state) => {
            const curQuota = getCurQuota();
            state.quota = curQuota;
        }
    }
});

export const { changeQuota, syncQuota } = quotaSlice.actions;

export const selectQuota = (state) => state.quota.quota;

export default quotaSlice.reducer;