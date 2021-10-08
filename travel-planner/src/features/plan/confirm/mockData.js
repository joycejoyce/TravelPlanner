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

export const mock_poiData = {
    "breakfast": {
        "id": "ChIJwZgBID02aDQRKFZYdYyHjRU",
        "name": "元氣健康廚房",
        "rating": 4.5,
        "totalRatingNum": 19,
        "photo": {
            "height": 3024,
            "html_attributions": [
                "<a href=\"https://maps.google.com/maps/contrib/100803457603573048968\">林俞安</a>"
            ],
            "width": 4032
        },
        "bizOpenPeriod": "05:30 ~ 11:30",
        "gmapUrl": "https://maps.google.com/?cid=1553046483846583848"
    },
    "lunch": {
        "id": "ChIJ09pvkRk2aDQRPir_dOfhn6M",
        "name": "RINGOAL車庫餐廳",
        "rating": 4,
        "totalRatingNum": 364,
        "photo": {
            "height": 3024,
            "html_attributions": [
                "<a href=\"https://maps.google.com/maps/contrib/103094674384858540125\">林承勵</a>"
            ],
            "width": 4032
        },
        "bizOpenPeriod": "11:00 ~ 21:00",
        "gmapUrl": "https://maps.google.com/?cid=11790390733695822398"
    },
    "dinner": {
        "id": "ChIJq_xBqXA3aDQR3LPAOUHrAa0",
        "name": "健人餐廚（竹科店）- 健康餐/新竹健康餐/新竹水煮餐/低GI減脂餐",
        "rating": 4.6,
        "totalRatingNum": 81,
        "photo": {
            "height": 2470,
            "html_attributions": [
                "<a href=\"https://maps.google.com/maps/contrib/102182436424446104940\">A Google User</a>"
            ],
            "width": 1885
        },
        "bizOpenPeriod": "17:00 ~ 19:30",
        "gmapUrl": "https://maps.google.com/?cid=12466503908912575452",
        "bizWebsite": "https://line.me/R/ti/p/@384uolrh"
    },
    "poi1": {
        "id": "ChIJ8Qh0-VQ3aDQRhWn-YEkJW40",
        "name": "味衛佳柿餅教育農園",
        "rating": 4.1,
        "totalRatingNum": 6959,
        "photo": {
            "height": 539,
            "html_attributions": [
                "<a href=\"https://maps.google.com/maps/contrib/107976788534049973342\">A Google User</a>"
            ],
            "width": 960
        },
        "bizOpenPeriod": "08:00 ~ 18:00",
        "gmapUrl": "https://maps.google.com/?cid=10185745192993057157",
        "bizWebsite": "https://xinpu5892352.business.site/?utm_source=gmb&utm_medium=referral"
    },
    "poi2": {
        "id": "ChIJebtJl2dLaDQR3T-TQQ035po",
        "name": "天仁茶文化館",
        "rating": 4.1,
        "totalRatingNum": 866,
        "photo": {
            "height": 2715,
            "html_attributions": [
                "<a href=\"https://maps.google.com/maps/contrib/108997297894399704489\">lienyuan lee</a>"
            ],
            "width": 3620
        },
        "bizOpenPeriod": "09:00 ~ 17:30",
        "gmapUrl": "https://maps.google.com/?cid=11161669256558624733",
        "bizWebsite": "https://www.facebook.com/tenren60/"
    },
    "poi3": {
        "id": "ChIJ3yZqy-VHaDQRVg7ZdAMRnQg",
        "name": "蕭如松藝術園區",
        "rating": 4,
        "totalRatingNum": 1062,
        "photo": {
            "height": 2269,
            "html_attributions": [
                "<a href=\"https://maps.google.com/maps/contrib/115612836308928674446\">蕭如松藝術園區</a>"
            ],
            "width": 4032
        },
        "bizOpenPeriod": "10:00 ~ 18:00",
        "gmapUrl": "https://maps.google.com/?cid=620671030189952598",
        "bizWebsite": "https://www.facebook.com/hsiaojusun"
    }
};