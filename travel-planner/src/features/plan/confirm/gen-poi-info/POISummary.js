// MUI
import { makeStyles } from "@material-ui/core/styles";
import { AccordionSummary, Typography } from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon, Star as StarIcon } from "@material-ui/icons";

// my components
import MapIcon from "../../../../common/components/MapIcon.js";
import { lightGrey, lightColors } from "../../../../common/styles/colors.json";
import { POIInfo } from "../../criteria/POIs.js";

const useStyles = makeStyles((theme) => {
    return ({
        poiSummary: {
            background: lightColors.accSummaryBK,
            padding: "0 8px",
            "& > .MuiAccordionSummary-content": {
                display: "grid",
                gridTemplateColumns: "1fr 1.3fr 4fr 1fr",
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
        },
        ratingSection: {
            display: "flex",
            alignItems: "center",
            gap: "2px",
            // "& > *": {
            //     fontSize: "14px"
            // }
        },
        rating: {
            color: lightGrey,
            fontSize: "14px"
        },
        star: {
            color: theme.palette.secondary.main
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

function Rating({ rating }) {
    // styles
    const classes = useStyles();

    return (
        <div className={classes.ratingSection}>
            <div className={classes.rating}>{rating}</div>
            <StarIcon className={classes.star} />
        </div>
    )
}

export default function POISummary({ poiName, poiData }) {
    // styles
    const classes = useStyles();

    // React
    const { name: bizName } = poiData;

    const getShownBizName = () => {
        const limit = 11;
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
            <Rating rating={poiData.rating} />
        </AccordionSummary>
    );
}