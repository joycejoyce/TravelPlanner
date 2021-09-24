// MUI
import { makeStyles } from "@material-ui/core/styles";

// my component
import CenterPoint from "./centerPoint/CenterPoint.js";
import Date from "./Date.js";
import Radius from "./Radius.js";
import POIs from "./POIs.js";
import Criterion from "./Criterion.js";
import NextBtn from "./NextBtn.js";
import { CriteriaName } from "./criteriaSlice.js";

const useStyles = makeStyles((theme) => {
    return ({
        criteria: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        },
        contents: {
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(4),
            marginTop: theme.spacing(12),
            marginBottom: theme.spacing(12)
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
    }
};

export default function Criteria() {
    const classes = useStyles();

    return (
        <div className={"criteria " + classes.criteria}>
            <div className={"contents " + classes.contents}>
                {
                    Object.keys(CriteriaInfo).map(criteriaName => 
                        <Criterion
                            key={criteriaName}
                            criterion={CriteriaInfo[criteriaName]}
                        />
                    )
                }
                <NextBtn />
            </div>
        </div>
    );
}