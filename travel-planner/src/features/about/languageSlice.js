import { createSlice } from "@reduxjs/toolkit";
import { Language } from "./LanguageSelect.js";

const initialState = {
    value: Language.english.value
};

export const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        changeLanguage: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { changeLanguage } = languageSlice.actions;

export const selectLanguage = (state) => state.language.value;

export default languageSlice.reducer;