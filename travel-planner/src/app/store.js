import { configureStore } from "@reduxjs/toolkit";

import criteriaReducer from "../features/plan/criteria/criteriaSlice.js";
import validateCriteriaReducer from "../features/plan/criteria/validateCriteriaSlice.js";
import stepReducer from "../features/plan/stepSlice.js";
import poiDataReducer from "../features/plan/confirm/poiDataSlice.js";
import itineraryInfoReducer from "../features/plan/confirm/itinerary-info/itineraryInfoSlice.js";
import validateItineraryReducer from "../features/plan/confirm/validate-itinerary/validateItinerarySlice.js";
import quotaReducer from "../features/navbar/quota/quotaSlice.js";
import navReducer from "../features/navbar/navSlice.js";
import languageReducer from "../features/about/languageSlice.js";

//modal
import modalReducer_centerPoint from "../features/plan/criteria/centerPoint/centerPointModalSlice.js";
import modalReducer_cancel from "../features/plan/confirm/cancel-modal/cancelModalSlice.js";
import modalReducer_exceedQuota from "../features/navbar/quota/exceedQuotaModalSlice.js";

export const store = configureStore({
    reducer: {
        criteria: criteriaReducer,
        validateCriteria: validateCriteriaReducer,
        step: stepReducer,
        poiData: poiDataReducer,
        itineraryInfo: itineraryInfoReducer,
        validateItinerary: validateItineraryReducer,
        quota: quotaReducer,
        nav: navReducer,
        language: languageReducer,
        modal_centerPoint: modalReducer_centerPoint,
        modal_cancel: modalReducer_cancel,
        modal_exceedQuota: modalReducer_exceedQuota
    }
});