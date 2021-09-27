// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

// my components
import {
    CriteriaName,
    selectAll
} from "./criteriaSlice.js";
import { changeErrMsg } from "./validateCriteriaSlice.js";
import { toNextStep } from "../stepSlice.js";

// React
import { useDispatch, useSelector } from "react-redux";
import {
    useHistory
} from "react-router-dom";

const useStyles = makeStyles((theme) => {
    return ({
        nextBtn: {
            minWidth: "100px",
            maxWidth: "100px",
            fontSize: "16px",
            margin: "0 auto"
        }
    });
});

export default function NextBtn() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const criteria = useSelector(selectAll);

    const dispatchErrMsg = (criteriaName, errMsg) => {
        const input = {
            name: criteriaName,
            errMsg
        };
        dispatch(changeErrMsg(input));
    };
    
    const handleOnClick = () => {
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

        validateCenterPoint();
        validateDate();
        validatePOIs();

        if (!hasError) {
            dispatch(toNextStep());
            history.push("/plan/modifyPOIs");
        }
    };

    return (
        <Button
            className={classes.nextBtn}
            color="primary"
            variant="contained"
            onClick={handleOnClick}
            // disabled={disabled}
        >
            Next
        </Button>
    );
}