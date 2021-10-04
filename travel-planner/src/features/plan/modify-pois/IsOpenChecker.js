import { CriteriaName } from "../criteria/criteriaSlice";
import { POIInfo } from "../criteria/POIs";

export default function checkIsOpen(detail, criteria, poiName) {
    if (!detail.opening_hours ||
        !detail.opening_hours.periods) {
        return false;
    }

    const timeCriteria = getTimeCriteria(criteria, poiName);

    if (checkTimeValid(timeCriteria, detail.opening_hours.periods)) {
        return true;
    }
    
    return false;
}

function getTimeCriteria(criteria, poiName) {
    const timeCriteria = {
        day: criteria[CriteriaName.date].getDay(),
        timeStart: POIInfo[poiName].timeStart,
        timeEnd: POIInfo[poiName].timeEnd
    };

    return timeCriteria;
}

function checkTimeValid(timeCriteria, openingPeriods) {
    const formattedBizInfo = getFormattedBizInfo(openingPeriods);
    const { day } = timeCriteria;
    if (!formattedBizInfo[day]) {
        return false;
    }

    const criteria_timeStart = timeCriteria.timeStart.replace(":", "");
    const criteria_timeEnd = timeCriteria.timeEnd.replace(":", "");
    const bizInfo = formattedBizInfo[day];
    if (criteria_timeStart.localeCompare(bizInfo.timeEnd) >= 0 ||
        criteria_timeEnd.localeCompare(bizInfo.timeStart) <= 0) {
        return false;
    }

    return true;
}

function getFormattedBizInfo(openingPeriods) {
    const info = {};

    for (let period of openingPeriods) {
        info[period.open.day] = {
            timeStart: period.open.time,
            timeEnd: period.close.time
        };
    }

    return info;
}