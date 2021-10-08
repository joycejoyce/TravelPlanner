// MUI
import { makeStyles } from "@material-ui/core/styles";

// my component
import CenterPoint from "./centerPoint/CenterPoint.js";
import Date from "./Date.js";
import Radius from "./Radius.js";
import POIs from "./POIs.js";
import POITypes from "./POITypes.js";
import Criterion from "./Criterion.js";
import ButtonSection from "../buttonSection/ButtonSection.js";
import { CriteriaName, selectAll } from "./criteriaSlice.js";
import { URL } from "../Plan.js";
import validate from "./CriteriaValidator.js";
import { changeErrMsg } from "./validateCriteriaSlice.js";
import { getParentPath } from "../../../common/components/PathGetter.js";
import { toNextStep } from "../stepSlice.js";

// React
import { useDispatch, useSelector } from "react-redux";
import {
    useHistory,
    useRouteMatch
} from "react-router-dom";

const useStyles = makeStyles((theme) => {
    return ({
        criteria: {
        },
        contents: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // background: "pink"
        },
        flexWrapper: {
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(4),
            marginBottom: theme.spacing(12),
        }
    });
});

export const CriteriaInfo = {
    [CriteriaName.centerPoint]: {
        name: CriteriaName.centerPoint,
        num: 1,
        summary: "Set center point",
        detail: <CenterPoint />
    },
    [CriteriaName.date]: {
        name: CriteriaName.date,
        num: 2,
        summary: "Set date",
        detail: <Date />
    },
    [CriteriaName.radius]: {
        name: CriteriaName.radius,
        num: 3,
        summary: "Set radius",
        detail: <Radius />
    },
    [CriteriaName.pois]: {
        name: CriteriaName.pois,
        num: 4,
        summary: "Set point-of-interst",
        detail: <POIs />
    },
    // [CriteriaName.poiTypes]: {
    //     name: CriteriaName.poiTypes,
    //     num: 5,
    //     summary: "Set Point-of-interest types (at most 3)",
    //     detail: <POITypes />
    // }
};

export default function Criteria({ setAnimationKey }) {
    // styles
    const classes = useStyles();
    const rootClassName = ["criteria", classes.criteria].join(" ");

    // React Route
    const history = useHistory();
    const { path } = useRouteMatch();
    const parentPath = getParentPath(path);

    // Redyx
    const dispatch = useDispatch();
    const criteria = useSelector(selectAll);
    
    const handleClickNext = () => {
        const dispatchErrMsg = (criteriaName, errMsg) => {
            const input = {
                name: criteriaName,
                errMsg
            };
            dispatch(changeErrMsg(input));
        };

        const hasError = validate(criteria, dispatchErrMsg);

        if (!hasError) {
            dispatch(toNextStep());
            setAnimationKey();
            history.push(`/plan/${URL.genPOIs}`);
        }
    };

    return (
        <div className={rootClassName}>
            <div className={"contents " + classes.contents}>
                <div className={"flexWrapper " + classes.flexWrapper}>
                    {
                        Object.keys(CriteriaInfo).map(criteriaName => 
                            <Criterion
                                key={criteriaName}
                                criterion={CriteriaInfo[criteriaName]}
                            />
                        )
                    }
                    <ButtonSection
                        handleClickNext={handleClickNext}
                        handleClickPrev={handleClickNext}
                    />
                </div>
            </div>
        </div>
    );
}