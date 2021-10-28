// my components
import { checkQuotaExceeded } from "./quotaHandler.js";
import { URL } from "../../../app/InnerApp.js";

// React
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { openModal } from "./exceedQuotaSlice.js";

export default function useExceedQuotaNotification(history) {
    const dispatch = useDispatch();

    if (!checkQuotaExceeded()) {
        return true;
    }

    // const history = useHistory();
    history.push(`/${URL.about}`);
    
    dispatch(openModal());

    return false;
}