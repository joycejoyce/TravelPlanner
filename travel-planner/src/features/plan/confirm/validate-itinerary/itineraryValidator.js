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
        let errMsg = "";
        const name = ItineraryFieldName.poiNumber;
        if (poiNum === 0) {
            errMsg = "No point-of interests were generated!\nPlease re-set the criteria.";
            hasErr = true;
        }
        changeErrMsg({name, errMsg});
    };

    const validateItineraryName = () => {
        const { itineraryInfo } = validateData;
        const itineraryName = itineraryInfo[ItineraryInfoFieldName.name];
        let errMsg = "";
        const name = ItineraryFieldName.name;
        if (!itineraryName || itineraryName.length === 0) {
            errMsg = "Please give this itinerary a name.";
            hasErr = true;
        }
        changeErrMsg({name, errMsg});
    };

    validatePoiData();
    validateItineraryName();

    return hasErr;
}