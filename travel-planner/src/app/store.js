import { configureStore } from "@reduxjs/toolkit";

import criteriaReducer from "../features/plan/criteria/criteriaSlice.js";
import validateCriteriaReducer from "../features/plan/criteria/validateCriteriaSlice.js";
import stepReducer from "../features/plan/stepSlice.js";
import poiDataReducer from "../features/plan/confirm/poiDataSlice.js";
import itineraryInfoReducer from "../features/plan/confirm/itinerary-info/itineraryInfoSlice.js";
import validateItineraryReducer from "../features/plan/confirm/validate-itinerary/validateItinerarySlice.js";
import quotaReducer from "../features/navbar/quota/quotaSlice.js";

//modal
import modalOpenReducer from "../features/plan/criteria/centerPoint/modalOpenSlice.js";
import modalOpenReducer_confirmPage from "../features/plan/confirm/cancel-modal/modalOpenSlice.js";
import modalOpenReducer_exceedQuota from "../features/navbar/quota/exceedQuotaSlice.js";

export const store = configureStore({
    reducer: {
        criteria: criteriaReducer,
        validateCriteria: validateCriteriaReducer,
        step: stepReducer,
        poiData: poiDataReducer,
        itineraryInfo: itineraryInfoReducer,
        validateItinerary: validateItineraryReducer,
        quota: quotaReducer,
        modalOpen: modalOpenReducer,
        modalOpen_confirmPage: modalOpenReducer_confirmPage,
        modalOpen_exceedQuota: modalOpenReducer_exceedQuota
    }
});