import { ItineraryInfoFieldName } from "../itinerary-info/itineraryInfoSlice.js";
import { ItineraryFieldName } from "./validateItinerarySlice";
import { getAllItineraries } from "../../../my-itineraries/dataHandler.js";

export default function (validateData, changeErrMsg) {
    let hasErr = false;

    const { itineraryInfo } = validateData;
    const itineraryName = itineraryInfo[ItineraryInfoFieldName.name];

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
        let errMsg = "";
        const name = ItineraryFieldName.name;
        if (!itineraryName || itineraryName.length === 0) {
            errMsg = "Please give this itinerary a name.";
            hasErr = true;
        }
        changeErrMsg({name, errMsg});
    };

    const validateItineraryNameExisted = () => {
        const allItineraries = getAllItineraries();
        if (allItineraries) {
            const allItiNames = Object.keys(allItineraries);
            if (allItiNames.includes(itineraryName)) {
                const name = ItineraryFieldName.name;
                const errMsg = "The same itinerary name already exists. Please input another";
                hasErr = true;
                changeErrMsg({name, errMsg});
            }
        }
    };

    validatePoiData();
    validateItineraryName();
    validateItineraryNameExisted();

    return hasErr;
}