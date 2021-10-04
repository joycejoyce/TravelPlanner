// my components
import { CriteriaName } from "../criteria/criteriaSlice.js";
import { POIInfo, POIName } from "../criteria/POIs.js";
import { POITypeInfo } from "../criteria/POITypes.js";
import { getMap } from "../../../common/map/map.js";
import checkIsOpen from "./IsOpenChecker.js";

// [ map controls ]
let google = null;
let map = null;
let service = null;

// test [start]
const criteria_fake = {
    [CriteriaName.centerPoint]: {
        desc: "",
        position: {
            latLng: { lat: 24.810059549453758, lng: 120.97512116891903 }, //Big City
            address: ""
        }
    },
    [CriteriaName.date]: new Date(),
    [CriteriaName.radius]: 10,
    [CriteriaName.pois]: Object.keys(POIInfo).reduce((accu, poiName) => {
        if (poiName === POIName.breakfast) {
            accu[poiName] = true;
        }
        else {
            accu[poiName] = false;
        }
        return accu;
    }, {}),
    [CriteriaName.poiTypes]: Object.keys(POITypeInfo).reduce((accu, type) => {
        accu[type] = false;
        return accu;
    }, {})
}
// test [end]

export default async function getPOIData(mapProps, reduxCtrl, criteria) {
    criteria = criteria_fake; //for test

    await initMap(mapProps);

    const radius = getRadius(criteria);
    const center = getCenter(criteria);
    const pois = getPOIs(criteria);

    const poiData = {};
    for (let poiName in pois) {
        if (!pois[poiName]) {
            continue;
        }
        poiData[poiName] = [];

        const request = getRequest_nearbySearch(poiName, radius, center);
        const { places, status } = await new Promise((resolve) => {
            service.nearbySearch(request, (places, status) => {
                resolve({ places, status });
            });
        });

        if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return null;
        }

        let num = 0;
        const maxNum = 3;
        for (let place of places) {
            const request = getRequest_detail(place.place_id);
            const { detail, status } = await new Promise((resolve) => {
                service.getDetails(request, (detail, status) => {
                    resolve({ detail, status });
                });
            });

            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                break;
            }

            if (checkIsOpen(detail, criteria, poiName)) {
                poiData[poiName].push(detail);
                num ++;
                if (num === maxNum) {
                    break;
                }
            }
            else {
                console.log(place.name + " not open");
            }
        }
    }

    return poiData;
}

async function initMap(props) {
    const mapCtrl = await getMap(props);
    google = mapCtrl.google;
    map = mapCtrl.map;
    service = new google.maps.places.PlacesService(map);
}

function getRadius(criteria) {
    let { radius } = criteria;
    radius = (radius * 1000).toString();
    return radius;
}

function getCenter(criteria) {
    const center = criteria[CriteriaName.centerPoint].position.latLng;
    return center;
}

function getPOIs(criteria) {
    const pois = criteria[CriteriaName.pois];
    return pois;
}

function getRequest_nearbySearch(poiName, radius, center) {
    const mealRequest = {
        location: center,
        radius,
        type: ["restaurant"]
        // keyword: "breakfast"
    }

    let request = null;
    if (poiName === POIName.breakfast) {
        request = {
            ...mealRequest,
            keyword: "breakfast"
        }
    }

    return request;
}

function getRequest_detail(placeId) {
    const request = {
        placeId,
        fields: [
            "opening_hours",
            "url"
        ]
    };

    return request;
}

