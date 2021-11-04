// my components
import { RootURL } from "../../config.json";
import { checkQuotaExceeded } from "../../features/navbar/quota/quotaHandler.js";
import { openModal } from "../../features/navbar/quota/exceedQuotaModalSlice.js";
import { syncQuota } from "../../features/navbar/quota/quotaSlice.js";

// React
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

export default function useQuotaExceeded(toOpenQuotaExceedMoal, setParentAnimationKey) {
    // tools
    const dispatch = useDispatch();
    const history = useHistory();

    // func
    const loadQuotaUsage = () => {
        dispatch(syncQuota());
    };
    const doCheckQuotaExceeded = () => {
        const quotaExceeded = checkQuotaExceeded();
        if (quotaExceeded) {
            history.push(`/${RootURL.about}`);
            setParentAnimationKey();
            dispatch(openModal());
        }
        return quotaExceeded;
    };
    
    // exe func
    loadQuotaUsage();
    if (toOpenQuotaExceedMoal) {
        return doCheckQuotaExceeded();
    }
    
    return false;
}