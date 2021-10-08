// MUI
import { makeStyles } from "@material-ui/core/styles";
import { AccordionSummary, Typography } from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

// my components
import MapIcon from "../../../../common/components/MapIcon.js";
import { lightGrey, lightColors } from "../../../../common/styles/colors.json";
import { POIInfo } from "../../criteria/POIs.js";

const useStyles = makeStyles((theme) => {
    return ({
        poiSummary: {
            background: lightColors.accSummaryBK,
            "& > .MuiAccordionSummary-content": {
                display: "grid",
                gridTemplateColumns: "1fr 2.5fr 5fr",
                alignItems: "center",
                gap: "5px"
            }
        },
        poiNameAndTime: {
            display: "flex",
            flexDirection: "column"
        },
        poiName: {
            fontSize: "14px"
        },
        poiTime: {
            color: lightGrey,
            fontSize: "12px"
        },
        bizName: {
        }
    });
});

function POINameAndTime({ poiName }) {
    const classes = useStyles();
    const { shortLabel, timeStart, timeEnd } = POIInfo[poiName];

    return (
        <div className={["poiNameAndTime", classes.poiNameAndTime].join(" ")}>
            <div className={classes.poiName}>{shortLabel}</div>
            <div className={classes.poiTime}>{`${timeStart} ~ ${timeEnd}`}</div>
        </div>
    )
}

export default function POISummary({ poiName, poiData }) {
    // styles
    const classes = useStyles();

    // React
    const { name: bizName } = poiData;

    const getShownBizName = () => {
        const limit = 14;
        let result = bizName.slice(0, limit);
        result += bizName.length > limit ? "..." : "";
        return result;
    }

    return (
        <AccordionSummary
            className={["poiSummary", classes.poiSummary].join(" ")}
            expandIcon={<ExpandMoreIcon />}
        >
            <MapIcon name={poiName} />
            <POINameAndTime poiName={poiName} />
            <Typography
                variant="h6"
                className={classes.bizName}
            >
                {getShownBizName()}
            </Typography>
        </AccordionSummary>
    );
}