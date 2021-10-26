// MUI
import { makeStyles } from "@material-ui/core/styles";
import { AccordionSummary, Typography } from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon, Star as StarIcon } from "@material-ui/icons";

// my components
import MapIcon from "../../../../common/components/MapIcon.js";
import { lightGrey, lightColors, err as Red } from "../../../../common/styles/colors.json";
import { POIInfo } from "../../criteria/POIs.js";

// React
import React from "react";

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
        },
        notFound: {
            color: Red,
            fontWeight: "bold"
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

function POISummary({ poiName, poiData, handleClick, isNotFound }) {
    // styles
    const classes = useStyles();

    // React
    const bizName = poiData ? poiData.name : null;

    const getShownBizName = () => {
        const limit = 20;
        let result = bizName.slice(0, limit);
        result += bizName.length > limit ? "..." : "";
        return result;
    }

    // ctrl
    const doHandleClick = () => {
        if (handleClick) {
            handleClick(poiName);
        }
    };

    return (
        <AccordionSummary
            className={["poiSummary", classes.poiSummary].join(" ")}
            expandIcon={isNotFound ? null : <ExpandMoreIcon />}
            onClick={doHandleClick}
        >
            <MapIcon name={poiName} />
            <POINameAndTime poiName={poiName} />
            {
                isNotFound ?
                (
                    <div className={classes.notFound}>Not Found</div>
                ) :
                (
                    <>
                        <Typography
                            variant="h6"
                            className={classes.bizName}
                        >
                            {getShownBizName()}
                        </Typography>
                        <Rating rating={poiData.rating} />
                    </>
                )
            }
            
        </AccordionSummary>
    );
}

const POISummary_memorized = React.memo(POISummary);
export default POISummary_memorized;