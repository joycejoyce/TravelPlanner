// my components
import { CriteriaName } from "./criteriaSlice.js";

export default function validate(criteria, dispatchErrMsg) {
    let hasError = false;

    const validateCenterPoint = () => {
        const criteriaName = CriteriaName.centerPoint;
        const { desc } = criteria[criteriaName];
        const errMsg = desc ? "" : "Choose a center point";
        dispatchErrMsg(criteriaName, errMsg);
        hasError = hasError || errMsg;
    };

    const validateDate = () => {
        const criteriaName = CriteriaName.date;
        const date = criteria[criteriaName];
        const errMsg = date ? "" : "Choose a date";
        dispatchErrMsg(criteriaName, errMsg);
        hasError = hasError || errMsg;
    };

    const validatePOIs = () => {
        const criteriaName = CriteriaName.pois;
        const pois = criteria[criteriaName];
        let hasPOIs = false;
        for (let poiName in pois) {
            if (pois[poiName]) {
                hasPOIs = true;
                break;
            }
        }
        const errMsg = hasPOIs ? "" : "Choose at least 1 point-of-interest";
        dispatchErrMsg(criteriaName, errMsg);
        hasError = hasError || errMsg;
    };

    const validatePOITypes = () => {
        const criteriaName = CriteriaName.poiTypes;
        const poiTypes = criteria[criteriaName];
        let hasCheckedItems = false;
        for (let type in poiTypes) {
            if (poiTypes[type]) {
                hasCheckedItems = true;
                break;
            }
        }
        const errMsg = hasCheckedItems ? "" : "Choose at least 1 type";
        dispatchErrMsg(criteriaName, errMsg);
        hasError = hasError || errMsg;
    };

    validateCenterPoint();
    validateDate();
    validatePOIs();
    validatePOITypes();

    return hasError;
}