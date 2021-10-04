// my components
import { CriteriaName } from "../criteria/criteriaSlice.js";
import { POIInfo } from "../criteria/POIs.js";
import { getMap } from "../../../common/map/map.js";

// [ criteria ]
// const initialState = {
//     [CriteriaName.centerPoint]: {
//         desc: "",
//         position: {
//             latLng: null,
//             address: ""
//         }
//     },
//     [CriteriaName.date]: new Date(),
//     [CriteriaName.radius]: 10,
//     [CriteriaName.pois]: Object.keys(POIInfo).reduce((accu, poiName) => {
//         accu[poiName] = false;
//         return accu;
//     }, {}),
//     [CriteriaName.poiTypes]: Object.keys(POITypeInfo).reduce((accu, type) => {
//         accu[type] = false;
//         return accu;
//     }, {})
// }

// export const POIInfo = {
//     breakfast: {
//         label: "Breakfast",
//         timeStart: "06:00",
//         timeEnd: "09:00"
//     },
//     poi1: {
//         label: "Point-of-Interst #1",
//         timeStart: "09:00",
//         timeEnd: "12:00"
//     },
//     lunch: {
//         label: "Lunch",
//         timeStart: "12:00",
//         timeEnd: "13:00"
//     },
//     poi2: {
//         label: "Point-of-Interst #2",
//         timeStart: "13:00",
//         timeEnd: "15:00"
//     },
//     poi3: {
//         label: "Point-of-Interst #3",
//         timeStart: "15:00",
//         timeEnd: "18:00"
//     },
//     dinner: {
//         label: "Dinner",
//         timeStart: "18:00",
//         timeEnd: "21:00"
//     }
// }

// export const POITypeInfo = {
//     park: {
//         isOutdoor: true,
//         label: "Park"
//     },
//     amusement_park: {
//         isOutdoor: true,
//         label: "Amusement Park"
//     },
//     zoo: {
//         isOutdoor: true,
//         label: "Zoo"
//     },
//     natural_feature: {
//         isOutdoor: true,
//         label: "Natural Feature"
//     },
//     shopping_mall: {
//         isOutdoor: false,
//         label: "Shopping Mall"
//     },
//     museum: {
//         isOutdoor: false,
//         label: "Museum"
//     },
//     art_gallery: {
//         isOutdoor: false,
//         label: "Art Gallery"
//     },
//     aquarium: {
//         isOutdoor: false,
//         label: "Aquarium"
//     }
// };

// [ map controls ]
let google = null;
let map = null;

export default async function getPOIData(mapProps, reduxCtrl, criteria) {
    

    await initMap(mapProps);

    // test [start]
    criteria = {
        [CriteriaName.centerPoint]: {
            desc: "",
            position: {
                latLng: { lat: 24.810059549453758, lng: 120.97512116891903 }, //Big City
                // latLng: google.maps.LatLng(24.810059549453758, 120.97512116891903), //Big City
                address: ""
            }
        },
        [CriteriaName.date]: new Date(),
        [CriteriaName.radius]: 10,
        [CriteriaName.pois]: Object.keys(POIInfo).reduce((accu, poiName) => {
            if (poiName === POIInfo.breakfast) {
                accu[poiName] = true;
            }
            else {
                accu[poiName] = false;
            }
            return accu;
        }, {}),
        // [CriteriaName.poiTypes]: Object.keys(POITypeInfo).reduce((accu, type) => {
        //     accu[type] = false;
        //     return accu;
        // }, {})
    }
    // test [end]

    return null;
}

async function initMap(props) {
    const mapCtrl = await getMap(props);
    google = mapCtrl.google;
    map = mapCtrl.map;
}