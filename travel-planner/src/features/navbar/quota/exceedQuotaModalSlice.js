import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
}

export const modalOpenSlice = createSlice({
    name: "modalOpen",
    initialState,
    reducers: {
        openModal_exceedQuota: (state) => {
            state.isOpen = true;
        },
        closeModal_exceedQuota: (state) => {
            state.isOpen = false;
        }
    }
});

export const { openModal_exceedQuota: openModal, closeModal_exceedQuota: closeModal } = modalOpenSlice.actions;

export const selectIsOpen = (state) => state.modal_exceedQuota.isOpen;

export default modalOpenSlice.reducer;