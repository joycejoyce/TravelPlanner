// my components
import { changeQuota } from "./quotaSlice.js";

// React
import { useDispatch } from "react-redux";

export const DailyQuotaLimit = 90;
const FieldName = "quota";
const QuotaFieldName = {
    curQuota: "curQuota",
    timeStamp: "timeStamp" 
};

export function checkIsExceedThreshold() {
    return getCurQuota() > DailyQuotaLimit * 0.9;
}

export function getCurQuota() {
    const obj = getQuotaObj();
    const curQuota = obj[QuotaFieldName.curQuota];
    return curQuota;
}

function getQuotaObj() {
    let str = localStorage.getItem(FieldName);
    if (!str) {
        return null;
    }

    let obj = JSON.parse(str);
    if (obj[QuotaFieldName.curQuota] === undefined ||
        obj[QuotaFieldName.timeStamp] === undefined) {
        obj = genInitObj();
    }
    return obj;
}

function genInitObj() {
    const obj = getInitObj();
    saveObj(obj);
    return obj;
}

function saveObj(obj) {
    const str = JSON.stringify(obj);
    localStorage.setItem(FieldName, str);
}

function getInitObj() {
    return {
        [QuotaFieldName.curQuota]: 0,
        [QuotaFieldName.timeStamp]: new Date()
    };
}

// export function useIncrementQuota(num = 1, source = "unknown") {
//     const curQuota = getCurQuota();
//     const newQuota = curQuota + num;
//     changeQuota_inLocalStorage(newQuota, source);
    
//     const dispatch = useDispatch();
//     dispatch(changeQuota(newQuota));
// }

export function changeQuota_inLocalStorage(newQuota, source) {
    const obj = getQuotaObj();
    const srcName = "source_" + source;
    const srcCount = (obj[srcName] === undefined) ? 0 : obj[srcName];
    const newObj = {
        ...obj,
        [QuotaFieldName.curQuota]: newQuota,
        [srcName]: srcCount + 1
    };
    saveObj(newObj);
}