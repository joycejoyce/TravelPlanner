export const DailyQuotaLimit = 90;
const FieldName = "quota";
const QuotaFieldName = {
    curQuota: "curQuota",
    timeStamp: "timeStamp" 
};

export function checkIsExceedThreshold() {
    return getCurQuota() > DailyQuotaLimit * 0.9;
}

export function checkQuotaExceeded() {
    return getCurQuota() >= DailyQuotaLimit;
}

export function getCurQuota() {
    const obj = getQuotaObj();
    const curQuota = obj[QuotaFieldName.curQuota];
    return curQuota;
}

function getQuotaObj() {
    let str = localStorage.getItem(FieldName);

    let obj = null;
    if (!str) {
        obj = genInitObj();
        str = JSON.stringify(obj);
    }

    obj = JSON.parse(str);
    if (obj[QuotaFieldName.curQuota] === undefined ||
        obj[QuotaFieldName.timeStamp] === undefined) {
        obj = genInitObj();
    }

    if (checkTimeStampExpired(obj[QuotaFieldName.timeStamp])) {
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

function checkTimeStampExpired(timeStampStr) {
    const timeStamp = new Date(timeStampStr);
    const curTimeStamp = new Date();
    const diffHours = Math.floor(Math.abs(curTimeStamp - timeStamp) / 36e5);
    return diffHours >= 24;
}

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