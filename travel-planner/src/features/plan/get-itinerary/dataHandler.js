// my components
import { MapIconUrl } from "../../../common/components/MapIcon.js";
import { myApiKey } from "../../../config.json";
import { CriteriaName } from "../criteria/criteriaSlice";
import { POIName } from "../criteria/POIs.js";

const FieldName = "itinerary"

export function save(criteria, poiData) {
    const { latLng } = criteria[CriteriaName.centerPoint].position;
    const staticMapUrl = getStaticMapUrl(latLng, poiData);
    const data = { criteria, poiData, staticMapUrl };
    const jsonStr = JSON.stringify(data);
    localStorage.setItem(FieldName, jsonStr);
}

export function get() {
    const jsonStr = localStorage.getItem(FieldName);
    const obj = JSON.parse(jsonStr);

    return obj;
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
        }
    }
    const markersStrs = Object.keys(poiData).reduce((accu, poiName) => {
        const { lat, lng } = poiData[poiName].location;
        const { color, label } = iconStyles[poiName];
        const str = `&markers=scale:4|color:${color}|label:${label}|${lat},${lng}`
        accu += str;
        return accu;
    }, "");

    let centerStr = null;
    if (center.lat) {
        centerStr = [center.lat, center.lng].join(",");
    }
    else if (center.lat()) {
        centerStr = [center.lat(), center.lng()].join(",");
    }

    const url = encodeURI("http://maps.googleapis.com/maps/api/staticmap?" +
        // `&center=${centerStr}` +
        "&size=600x400" + 
        `&key=${myApiKey}` +
        // "&zoom=10" +
        markersStrs);

    console.log("static map URL: ", url);

    return url;
}