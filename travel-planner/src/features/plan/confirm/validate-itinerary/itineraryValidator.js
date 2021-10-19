import { ItineraryInfoFieldName } from "../itinerary-info/itineraryInfoSlice.js";
import { ItineraryFieldName } from "./validateItinerarySlice";

export default function (validateData, changeErrMsg) {
    let hasErr = false;

    const validatePoiData = () => {
        const { poiData } = validateData;
        const poiNum = Object.values(poiData).reduce((accu, value) => {
            if (value) {
                accu ++;
            }
            return accu;
        }, 0);
        if (poiNum === 0) {
            const errMsg = "No point-of interests were generated!\nPlease re-set the criteria.";
            const name = ItineraryFieldName.poiNumber;
            changeErrMsg({name, errMsg});
            hasErr = true;
        }
        
    };

    const validateItineraryName = () => {
        const { itineraryInfo } = validateData;
        const itineraryName = itineraryInfo[ItineraryInfoFieldName.name];
        if (!itineraryName || itineraryName.length === 0) {
            const errMsg = "Please give this itinerary a name.";
            const name = ItineraryFieldName.name;
            changeErrMsg({name, errMsg});
            hasErr = true;
        }
    };

    validatePoiData();
    validateItineraryName();

    return hasErr;
}