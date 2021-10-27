import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
}

export const modalOpenSlice = createSlice({
    name: "modalOpen",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        }
    }
});

export const { openModal, closeModal } = modalOpenSlice.actions;

export const selectIsOpen = (state) => state.modalOpen_exceedQuota.isOpen;

export default modalOpenSlice.reducer;