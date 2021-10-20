import { CriteriaName } from "../criteria/criteriaSlice";
import { POIName } from "../criteria/POIs.js";
import { POITypeName } from "../criteria/POITypes";

export const mock_criteria = {
    [CriteriaName.centerPoint]: {
        desc: "Zhongshan Public Elementry School",
        position: {
            latLng: { lat: 25.06345199799165, lng: 121.52372144659245 }, // 秦老大
            address: "No. 69, Section 1, Minquan E Rd, Zhongshan District, Taipei City, 10491"
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
        "id": "ChIJWTAAaEOpQjQRucZJhb_zETY",
        "location": {
            "lat": 25.0616832,
            "lng": 121.5241506
        },
        "name": "No.18 Dream Breakfast",
        "address": "10491台灣台北市中山區中山北路二段137巷18號",
        "rating": 4.2,
        "totalRatingNum": 88,
        // "photo": "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAap_uEAJ7I_a7PkP-GaJtp6t1N843bzQYeTyHFx7D9lKtxTU_8GWl4jKHVCNsq5eFObTCuotemRwpa6PZFPIKM4Zhp3tHV4GE8O6slsY-Fadd2FqvmpIN2EMmssM11MUCsZvNu3Z41IlveMUGrs_2MFpPi3795hjrufWeCNAnloMtO7pN_3N&3u250&4u141&5m1&2e1&callback=none&key=AIzaSyAvQs1MLlXdQ4l5KIA6FnGmfe9pLaalq_4&token=2973",
        "photo": "https://drive.google.com/uc?export=view&id=1AOXqgEgdTi73n7KZNvF0m2o7n0Tomrvv",
        "bizOpenPeriod": "06:00 ~ 13:00",
        "gmapUrl": "https://maps.google.com/?cid=3896163156552697529",
        "bizWebsite": "https://facebook.com/NO18-Dream-Breakfast-1437732589809340/"
    },
    "lunch": {
        "id": "ChIJ6QpHdXqpQjQRKpZTdypXPUc",
        "location": {
            "lat": 25.049308,
            "lng": 121.5171935
        },
        "name": "Pepper Lunch胡椒廚房 京站店",
        "address": "10351台灣台北市大同區承德路一段1號B3F",
        "rating": 4.5,
        "totalRatingNum": 399,
        // "photo": "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAap_uEAQaG7xt3S_uZjFuqbK4-p8RK4wUn0CqrUYKBoXiMHo9YpxesC1V1iqkfHOzK8APQDPthNcDq0pG1x443_gqg_SG9C06vPiNj-vRgVIjKppSKMNN48XGeaoNcwGXG6AjUINptWoOen6z9glWVHgqh5z7tipffzEj8Cx5KUlXO3d91-w&3u250&4u141&5m1&2e1&callback=none&key=AIzaSyAvQs1MLlXdQ4l5KIA6FnGmfe9pLaalq_4&token=125692",
        "photo": "https://drive.google.com/uc?export=view&id=137bWEml2G3ABT94AaLvw5-2_UTtqsmKX",
        "bizOpenPeriod": "11:00 ~ 20:30",
        "gmapUrl": "https://maps.google.com/?cid=5133354990174443050",
        "bizWebsite": "https://www.facebook.com/pepper.lunch.taiwan/"
    },
    "dinner": {
        "id": "ChIJPWwjG02rQjQRzynbmBywDOE",
        "location": {
            "lat": 25.033465,
            "lng": 121.5505405
        },
        "name": "de nuit",
        "address": "106台灣台北市大安區信義路四段175號",
        "rating": 4.6,
        "totalRatingNum": 109,
        // "photo": "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAap_uEDIh-TloISfkwS7D6n-QArtTQ9QHN0Ab4mM84ISNjeml9eXZqZmnbWBp5Y-_f22tzdMlz_6d-WpVpsKhx84ek0rlBXlp_K24Vf-mmkWxdbLknEGi91UwT9vM6HMyJC-sQOsp0MvSGKKvzXtfZeuUtnJ7BM9GsO34kzpl3LPXqLusiZ-&3u250&4u141&5m1&2e1&callback=none&key=AIzaSyAvQs1MLlXdQ4l5KIA6FnGmfe9pLaalq_4&token=61628",
        "photo": "https://drive.google.com/uc?export=view&id=1SpDTOo_HWmCc9IJar13uJoECOrZSA26Y",
        "bizOpenPeriod": "18:00 ~ 22:30",
        "gmapUrl": "https://maps.google.com/?cid=16216529995124386255",
        "bizWebsite": "https://www.denuit.com.tw/"
    },
    "poi1": {
        "id": "ChIJi-yspAmpQjQRxcHc_lwnNHw",
        "location": {
            "lat": 25.0420139,
            "lng": 121.5068592
        },
        "name": "西門紅樓",
        "address": "108台灣台北市萬華區成都路10號",
        "rating": 4.2,
        "totalRatingNum": 13582,
        // "photo": "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAap_uEB4oJ8YleN8nE_cOXnusC1-hnnD2oLay6_P0h_DYxnCcFRk-eT-dUnckZ4wqilexT3_ceKfVRHUUe9t40CVzbJynls8zuXqaO6sFnSJPP1O9turR79iSc2dQu6pOGZBhLKQIXNH8V2uA0n56Kg-OT7wRaa1vbAMprudNw9N_kcHh-Qm&3u250&4u141&5m1&2e1&callback=none&key=AIzaSyAvQs1MLlXdQ4l5KIA6FnGmfe9pLaalq_4&token=1761",
        "photo": "https://drive.google.com/uc?export=view&id=1KkEiqeWLFtIyXy9zsH3fAKDAliROO33w",
        "bizOpenPeriod": "11:00 ~ 18:00",
        "gmapUrl": "https://maps.google.com/?cid=8949821639858373061",
        "bizWebsite": "http://www.redhouse.org.tw/"
    },
    "poi2": {
        "id": "ChIJbSR3CAmpQjQRaGSNghiSyrw",
        "location": {
            "lat": 25.0427953,
            "lng": 121.5063267
        },
        "name": "臺北天后宮",
        "address": "10844台灣台北市萬華區成都路51號",
        "rating": 4.6,
        "totalRatingNum": 536,
        // "photo": "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAap_uEDp7r66jFRZiKl0zQ3ZL_5GPeZkqJwRVDFiTYDmZMlbYbkhhXrp-gyJ6FBXwKbgX66ez2cjxgTutZN0uaivu48SLqMBWaM5NYU0qzFbRSu-92h9L86GtNojXq24kt2vl9FAjwGNMqBymjO4q5PHd5jPPw736zgm5C6UthYJ4cLM9yVy&3u250&4u141&5m1&2e1&callback=none&key=AIzaSyAvQs1MLlXdQ4l5KIA6FnGmfe9pLaalq_4&token=37523",
        "photo": "https://drive.google.com/uc?export=view&id=1_QnQrCjYPosL2E9gUsORhxyLTz42mgN_",
        "bizOpenPeriod": "06:00 ~ 22:00",
        "gmapUrl": "https://maps.google.com/?cid=13603846258393179240",
        "bizWebsite": "http://台北天后宮.tw/history_01.html"
    },
    "poi3": {
        "id": "ChIJ85xGkFSpQjQRzTIFvt5DcmU",
        "location": {
            "lat": 25.0720021,
            "lng": 121.5303702
        },
        "name": "林安泰古厝",
        "address": "10491台灣台北市中山區濱江街5號",
        "rating": 4.5,
        "totalRatingNum": 4248,
        // "photo": "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAap_uECvQj5JFE-exUQ1Ox2KZIWg1cpGjuaFsPyiSw8kv7bdea-YQ3GG_0dsGAapiSLfBdV_FPmvOvA862sJC3GcSnTB9I0QxiPJ_WU98BG9jIPEuDDu75ykkSpK2M3sJVXt_FRyy4pil8xw8bqyfazZ6aOCkOwV9dekPwT6oR0c2yP2wRE&3u250&4u141&5m1&2e1&callback=none&key=AIzaSyAvQs1MLlXdQ4l5KIA6FnGmfe9pLaalq_4&token=268",
        "photo": "https://drive.google.com/uc?export=view&id=1vzX8UcZ6V-D2ctXuk7ONt9cu92u9nSGV",
        "bizOpenPeriod": "09:00 ~ 17:00",
        "gmapUrl": "https://maps.google.com/?cid=7309979769125548749",
        "bizWebsite": "http://linantai.taipei/"
    }
}