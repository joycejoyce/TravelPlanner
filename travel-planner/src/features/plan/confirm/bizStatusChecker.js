import { CriteriaName } from "../criteria/criteriaSlice";

export function checkIsOperational(bizInfo) {
    const { business_status } = bizInfo;
    if (business_status === "OPERATIONAL") {
        return true;
    }

    return false;
}

export function checkIsHighlyRated(bizInfo) {
    const { rating } = bizInfo;
    if (rating >= 4) {
        return true;
    }

    return false;
}

export function getBizOpenInfo(detail, poiInfo, criteria) {
    const isAlwaysOpen = checkIsAlwaysOpen(detail);
    let retObj = null;
    if (isAlwaysOpen) {
        retObj = getRetObj_bizOpenInfo(isAlwaysOpen);
    }
    else {
        const validOpenPeriod = getValidOpenPeriod(detail, poiInfo, criteria);
        retObj = getRetObj_bizOpenInfo(isAlwaysOpen, validOpenPeriod);
    }

    return retObj;
}

function checkIsAlwaysOpen(detail) {
    const hasOpenInfo = detail.opening_hours;
    if (!hasOpenInfo) { // no open info means always open (e.g., Park)
        return true;
    }

    const { opening_hours } = detail;
    const alwaysOpen = opening_hours &&
        opening_hours.length === 1 &&
        opening_hours[0].open &&
        !opening_hours[0].close;
    return alwaysOpen
}

function getValidOpenPeriod(detail, poiInfo, criteria) {
    const weekday = criteria[CriteriaName.date].getDay();
    const period_criteria = getPeriod_criteria(poiInfo);
    const periods_biz = getPeriods_biz(detail, weekday);
    const metCriteriaPeriod = getMetCriteriaPeriod(period_criteria, periods_biz);
    return metCriteriaPeriod;
}

function getPeriod_criteria(poiInfo) {
    const period = {
        timeStart: poiInfo.timeStart.replace(":", ""),
        timeEnd: poiInfo.timeEnd.replace(":", "")
    };

    return period;
}

function getPeriods_biz(detail, weekday) {
    const { periods: periods_biz } = detail.opening_hours;
    const periods = [];

    for (let period of periods_biz) {
        if (!period.open || !period.close) {
            continue;
        }
        if (period.open.day !== weekday) {
            continue;
        }
        periods.push({
            open: period.open.time,
            close: period.close.time
        });
    }

    return periods;
}

function getMetCriteriaPeriod(period_criteria, periods_biz) {
    let metCriteriaPeriod = null;
    for (let period_biz of periods_biz) {
        const isInvalid =
            period_criteria.timeStart.localeCompare(period_biz.close) >= 0 ||
            period_criteria.timeEnd.localeCompare(period_biz.open) <= 0
        ;
        if (!isInvalid) {
            metCriteriaPeriod = period_biz;
            break;
        }
    }

    return metCriteriaPeriod;
}

function getRetObj_bizOpenInfo(isAlwaysOpen, validOpenPeriod) {
    const retObj = {};

    if (isAlwaysOpen) {
        retObj.isOpen = true;
        retObj.period = "24 hours"
    }
    else {
        retObj.isOpen = validOpenPeriod ? true : false;
        if (retObj.isOpen) {
            retObj.period = getPeriodStr(validOpenPeriod);
        }
    }

    return retObj;
}

function getPeriodStr(validOpenPeriod) {
    const addColonToTimeStr = (timeStr) => {
        if (timeStr.length === 4) {
            return [timeStr.slice(0, 2), timeStr.slice(2)].join(":");
        }
    }

    const openTimeStr = addColonToTimeStr(validOpenPeriod.open);
    const closeTimeStr = addColonToTimeStr(validOpenPeriod.close);
    const periodStr = [openTimeStr, closeTimeStr].join(" ~ ");

    return periodStr;
}