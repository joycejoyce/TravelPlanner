import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
}

export const modalOpenSlice = createSlice({
    name: "modalOpen",
    initialState,
    reducers: {
        openModal_centerPoint: (state) => {
            state.isOpen = true;
        },
        closeModal_centerPoint: (state) => {
            state.isOpen = false;
        }
    }
});

export const { openModal_centerPoint: openModal, closeModal_centerPoint: closeModal } = modalOpenSlice.actions;

export const selectIsOpen = (state) => state.modal_centerPoint.isOpen;

export default modalOpenSlice.reducer;