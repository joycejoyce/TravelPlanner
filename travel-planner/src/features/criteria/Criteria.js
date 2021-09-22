// MUI
import { makeStyles } from "@material-ui/core/styles";

// my component
import CenterPoint from "./centerPoint/CenterPoint.js";
import Date from "./Date.js";
import Radius from "./Radius.js";
import POIs from "./POIs.js";
import Criterion from "./Criterion.js";

const useStyles = makeStyles((theme) => {
    return ({
        criteria: {
            width: "95vw",
            [theme.breakpoints.up('md')]: {
                width: "75vw"
            },
            minWidth: "415px",
            maxWidth: "1000px",
            position: "relative",
            height: "100vh",
            overflowY: "auto"
        },
        contents: {
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(4),
            position: "absolute",
            top: theme.spacing(12)
        }
    });
});

export default function Criteria() {
    const classes = useStyles();

    const CriterionName = {
        centerPoint: "centerPoint",
        date: "date",
        radius: "radius",
        pois: "pois"
    };
    
    const criteria = {
        [CriterionName.centerPoint]: {
            num: 1,
            summary: "Set center point",
            detail: <CenterPoint />
        },
        [CriterionName.date]: {
            num: 2,
            summary: "Set date",
            detail: <Date />
        },
        [CriterionName.radius]: {
            num: 3,
            summary: "Set radius",
            detail: <Radius />
        },
        [CriterionName.pois]: {
            num: 4,
            summary: "Set point-of-interst",
            detail: <POIs />
        }
    };

    return (
        <div className={"criteria " + classes.criteria}>
            <div className={"contents " + classes.contents}>
                {
                    Object.keys(criteria).map(key => {
                        const criterion = criteria[key];
                        return (
                            <Criterion criterion={criterion} />
                        );
                    })
                }
            </div>
        </div>
    );
}