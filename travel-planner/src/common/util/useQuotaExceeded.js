// my components
import { RootURL } from "../../config.json";
import { checkQuotaExceeded } from "../../features/navbar/quota/quotaHandler.js";
import { openModal } from "../../features/navbar/quota/exceedQuotaModalSlice.js";
import { syncQuota } from "../../features/navbar/quota/quotaSlice.js";

// React
import { useDispatch } from "react-redux";

export default function useQuotaExceeded(toOpenQuotaExceedMoal) {
    // tools
    const dispatch = useDispatch();

    // func
    const loadQuotaUsage = () => {
        dispatch(syncQuota());
    };
    const doCheckQuotaExceeded = () => {
        const quotaExceeded = checkQuotaExceeded();
        if (quotaExceeded) {
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