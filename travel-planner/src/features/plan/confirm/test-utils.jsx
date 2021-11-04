import React from "react"
import { render as rtlRender } from "@testing-library/react"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
// Import your own reducer
import criteriaReducer from "../criteria/criteriaSlice.js";
import stepReducer from "../stepSlice.js";

function render(
    ui,
    {
        preloadedState,
        store = configureStore({ reducer: {
            criteria: criteriaReducer,
            step: stepReducer
        }, preloadedState }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };