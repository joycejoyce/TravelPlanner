// my components
import { checkQuotaExceeded } from "./quotaHandler.js";
import { URL } from "../../../app/InnerApp.js";

// React
import { useDispatch } from "react-redux";
import { openModal } from "./exceedQuotaSlice.js";

export default function useExceedQuotaNotification(history) {
    const dispatch = useDispatch();
    
    if (!checkQuotaExceeded()) {
        return false;
    }

    history.push(`/${URL.about}`);
    
    dispatch(openModal());

    return true;
}