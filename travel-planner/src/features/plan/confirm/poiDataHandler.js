// my components
import { CriteriaName } from "../criteria/criteriaSlice.js";
import { POIName, POIInfo } from "../criteria/POIs.js";
import { mock_criteria, mock_poiData } from "./mockData.js";
import { getMap } from "../../../common/map/map.js";
import { checkIsOperational, checkIsHighlyRated, getBizOpenInfo as getBizOpenInfo } from "./bizStatusChecker.js";

// [ map controls ]
let google = null;
let map = null;
let service = null;

const RetObj = {
    NormalEnd: {
        msg: "Normal end",
        code: 0
    },
    GmapReqFail: {
        msg: "Request sent to Google Maps failed",
        code: 1,
        additionalInfo: null
    }
};

export function getPOIData_mock(doChangePOI) {
    const poiData = mock_poiData;
    doChangePOI(poiData);
    return poiData;
}

export default async function getPOIData(mapProps, doChangePOI, criteria) {
    // criteria = mock_criteria; //for test

    await initMap(mapProps);

    const poiNames = getPOINames(criteria);
    const commonFieldsInRequest = getCommonFieldsInRequest(criteria);

    const poiName_to_placeId = {};
    const placeId_to_placeDetail = {};
    let poi2_and_poi3_nearbySearchResult = null;
    for (let poiName of poiNames) {
        let places = null;
        let status = null;
        if (poi2_and_poi3_nearbySearchResult &&
            [POIName.poi2, POIName.poi3].includes(poiName)) {
            places = poi2_and_poi3_nearbySearchResult.places;
            status = poi2_and_poi3_nearbySearchResult.status;
        }
        else {
            const request = getRequest_nearbySearch(poiName, commonFieldsInRequest);
            const result = await new Promise((resolve) => {
                service.nearbySearch(request, (places, status) => {
                    resolve({ places, status });
                });
            });
            places = result.places;
            status = result.status;
            if ([POIName.poi2, POIName.poi3].includes(poiName)) {
                poi2_and_poi3_nearbySearchResult = {};
                poi2_and_poi3_nearbySearchResult.places = places;
                poi2_and_poi3_nearbySearchResult.status = status;
            }
        }
    
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
            const err = RetObj.GmapReqFail;
            err.additionalInfo = `status: [${status}], service: [nearbySearch]`;
            return err;
        }

        shuffle(places);
        for (let place of places) {
            const isPlaceUsed = Object.keys(placeId_to_placeDetail).includes(place.place_id);
            if (isPlaceUsed) {
                continue;
            }

            const isOperational = checkIsOperational(place);
            if (!isOperational) {
                continue;
            }

            const isHighlyRated = checkIsHighlyRated(place);
            if (!isHighlyRated) {
                continue;
            }
    
            const { place_id } = place;
            const request = getRequest_detail(place_id);
            const { detail, status } = await new Promise((resolve) => {
                service.getDetails(request, (detail, status) => {
                    resolve({ detail, status });
                });
            });

            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                const err = RetObj.GmapReqFail;
                err.additionalInfo = `status: [${status}], service: [getDetails]`;
                return err;
            }

            const bizOpenInfo = getBizOpenInfo(detail, POIInfo[poiName], criteria);
            if (bizOpenInfo.isOpen) {
                poiName_to_placeId[poiName] = place_id;
                placeId_to_placeDetail[place_id] = getFullDetail(detail, place, bizOpenInfo);
                break;
            }
        }
    }

    const poiName_to_poiDetail = Object.entries(poiName_to_placeId).reduce((accu, [poiName, placeId]) => {
        accu[poiName] = placeId_to_placeDetail[placeId];
        return accu;
    }, {});

    console.log(poiName_to_poiDetail);
    doChangePOI(poiName_to_poiDetail);

    return poiName_to_poiDetail;
}

async function initMap(props) {
    const mapCtrl = await getMap(props);
    google = mapCtrl.google;
    map = mapCtrl.map;
    service = new google.maps.places.PlacesService(map);
}

function getPOINames(criteria) {
    const { pois } = criteria;
    const poiNames = Object.entries(pois).reduce((accu, [poiName, checked]) => {
        if (checked) {
            accu.push(poiName);
        }
        return accu;
    }, []);

    return poiNames;
}

function getCommonFieldsInRequest(criteria) {
    const getRadius = () => {
        let { radius } = criteria;
        radius = (radius * 1000).toString();
        return radius;
    };
    const getCenter = () => {
        const center = criteria[CriteriaName.centerPoint].position.latLng;
        return center;
    };
    const radius = getRadius();
    const center = getCenter();

    const commonFields = {
        radius,
        location: center
    };

    return commonFields;
}

function getRequest_nearbySearch(poiName, commonFields) {
    const types = {
        meal: ["restuarant"],
        poi: ["tourist_attraction"]
    };
    const otherFields = {
        [POIName.breakfast]: {
            type: types.meal,
            keyword: "breakfast"
        },
        [POIName.lunch]: {
            type: types.meal,
            keyword: "lunch"
        },
        [POIName.dinner]: {
            type: types.meal,
            keyword: "dinner"
        },
        [POIName.poi1]: {
            type: types.poi,
            keyword: "morning"
        },
        [POIName.poi2]: {
            type: types.poi,
            keyword: "afternoon"
        },
        [POIName.poi3]: {
            type: types.poi,
            keyword: "afternoon"
        }
    };
    
    const request = {
        ...commonFields,
        ...otherFields[POIName[poiName]]
    };

    return request;
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function getRequest_detail(placeId) {
    const fields = [
        "opening_hours",
        "url",
        "website",
        "formatted_address"
    ];

    const request = {
        placeId,
        fields
    };

    return request;
}

function getFullDetail(detail, place, bizOpenInfo) {
    const fullDetail = {
        id: place.place_id,
        location: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        },
        name: place.name,
        address: detail.formatted_address,
        rating: place.rating,
        totalRatingNum: place.user_ratings_total,
        photo: (place.photos && place.photos.length) >= 1 ?
            place.photos[0].getUrl({ maxWidth: 250, maxHeight: 141 }) : null,
        bizOpenPeriod: bizOpenInfo.period,
        gmapUrl: detail.url,
        bizWebsite: detail.website
    };

    return fullDetail;
}