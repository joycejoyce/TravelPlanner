import { CriteriaName } from "../criteria/criteriaSlice";
import { POIName } from "../criteria/POIs.js";
import { POITypeName } from "../criteria/POITypes";

export const mock_criteria = {
    [CriteriaName.centerPoint]: {
        desc: "",
        position: {
            // latLng: { lat: 24.810059549453758, lng: 120.97512116891903 }, //Big City
            latLng: { lat: 24.786347336510058, lng: 121.010254397754 }, // 秦老大
            address: ""
        }
    },
    [CriteriaName.date]: new Date(),
    [CriteriaName.radius]: 10,
    [CriteriaName.pois]: Object.keys(POIName).reduce((accu, name) => {
        if (
            false ||
            // name === POIName.breakfast ||
            // name === POIName.lunch ||
            // name === POIName.dinner ||
            // name === POIName.poi1 ||
            name === POIName.poi2 ||
            name === POIName.poi3 ||
            false
        ) {
            accu[name] = true;
        }
        else {
            accu[name] = false;
        }
        return accu;
    }, {}),
    [CriteriaName.poiTypes]: Object.keys(POITypeName).reduce((accu, type) => {
        if (
            false ||
            type === POITypeName.park ||
            // type === POITypeName.amusement_park ||
            // type === POITypeName.zoo ||
            // type === POITypeName.natural_feature ||
            // type === POITypeName.shopping_mall ||
            // type === POITypeName.museum ||
            // type === POITypeName.art_gallery ||
            // type === POITypeName.aquarium ||
            false
        ) {
            accu[type] = true;
        }
        else {
            accu[type] = false;
        }
        return accu;
    }, {})
};
