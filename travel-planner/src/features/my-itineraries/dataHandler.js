// my components
import { MapIconUrl } from "../../common/components/MapIcon.js";
import { myApiKey } from "../../config.json";
import { CriteriaName } from "../plan/criteria/criteriaSlice";
import { POIName } from "../plan/criteria/POIs.js";
import { ItineraryInfoFieldName } from "../plan/confirm/itinerary-info/itineraryInfoSlice.js";
import { getDateStr } from "../../common/util/DateUtil.js";

const FieldName = "itinerary";

export const SavedItiFiledName = {
    itineraryInfo: "itineraryInfo",
    criteria: "criteria",
    poiData: "poiData",
    staticMapUrl: "staticMapUrl"
};

export function changeItineraries(newItineraryObj) {
    const jsonStr = JSON.stringify(newItineraryObj);
    localStorage.setItem(FieldName, jsonStr);
}

export function save(itineraryInfo, criteria, poiData) {
    const itineraryName = itineraryInfo[ItineraryInfoFieldName.name];

    const getItineraryObj = () => {
        const { latLng } = criteria[CriteriaName.centerPoint].position;
        const staticMapUrl = getStaticMapUrl(latLng, poiData);
        const obj = {
            [SavedItiFiledName.itineraryInfo]: itineraryInfo,
            [SavedItiFiledName.criteria]: criteria,
            [SavedItiFiledName.poiData]: poiData,
            [SavedItiFiledName.staticMapUrl]: staticMapUrl
        };
        return obj;
    };
    const getNewItineraryObj = (addItem, origItems) => {
        const addItemKey = itineraryName;
        let newObj = { [addItemKey]: addItem };
        if (origItems) {
            newObj = { ...origItems, ...newObj }
        };
        return newObj;
    };

    const itineraryObj = getItineraryObj();
    const origItineraryObj = getAllItineraries();
    const newItineraryObj = getNewItineraryObj(itineraryObj, origItineraryObj);

    changeItineraries(newItineraryObj);
    // const jsonStr = JSON.stringify(newItineraryObj);
    // localStorage.setItem(FieldName, jsonStr);
}

export function getAllItineraries() {
    const jsonStr = localStorage.getItem(FieldName);
    if (!jsonStr) {
        return null;
    }
    const obj = JSON.parse(jsonStr);
    return obj;
}

export function getItinerary(name) {
    const allItineraries = getAllItineraries();
    if (!allItineraries) {
        return null;
    }
    const itinerary = allItineraries[name];

    return itinerary;
}

function getStaticMapUrl(center, poiData) {
    const iconStyles = {
        [POIName.breakfast]: {
            color: "0xFFEEC2",
            label: "B"
        },
        [POIName.lunch]: {
            color: "0xFFD15C",
            label: "L"
        },
        [POIName.dinner]: {
            color: "0xF5B000",
            label: "D"
        },
        [POIName.poi1]: {
            color: "0xCCD7FF",
            label: "1"
        },
        [POIName.poi2]: {
            color: "0x6688FF",
            label: "2"
        },
        [POIName.poi3]: {
            color: "0x023AFF",
            label: "3"
        },
        center: {
            color: "0xC10101",
            label: "C"
        }
    }

    const getCenterLatLng = () => {
        let latLng = null;
        if (center.lat) {
            latLng = [center.lat, center.lng];
        }
        else if (center.lat()) {
            latLng = [center.lat(), center.lng()];
        }
        return latLng;
    };

    const getMarkersStrTemplate = (color, label, lat, lng) => {
        return `&markers=scale:4|color:${color}|label:${label}|${lat},${lng}`;
    }

    const getInitMarkersStr = () => {
        const [ lat, lng ] = getCenterLatLng();
        const { color, label } = iconStyles.center;
        const str = getMarkersStrTemplate(color, label, lat, lng);
        return str;
    };

    const markersStrs = Object.keys(poiData).reduce((accu, poiName) => {
        const { lat, lng } = poiData[poiName].location;
        const { color, label } = iconStyles[poiName];
        // const str = `&markers=scale:4|color:${color}|label:${label}|${lat},${lng}`
        const str = getMarkersStrTemplate(color, label, lat, lng);
        accu += str;
        return accu;
    }, getInitMarkersStr());


    const url = encodeURI("http://maps.googleapis.com/maps/api/staticmap?" +
        "&size=600x400" + 
        `&key=${myApiKey}` +
        markersStrs);

    console.log("static map URL: ", url);

    return url;
}

export function getRating(itineraryInfo) {
    const rating = itineraryInfo[ItineraryInfoFieldName.rating];
    return rating;
}

export function getDate(criteria) {
    const dateObj = criteria[CriteriaName.date];
    const dateStr = getDateStr(dateObj);
    return dateStr;
};

export function getRadius(criteria) {
    const radius = criteria[CriteriaName.radius];
    return radius;
}