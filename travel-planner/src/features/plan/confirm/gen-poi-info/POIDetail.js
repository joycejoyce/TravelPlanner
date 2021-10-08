// MUI
import { makeStyles } from "@material-ui/core/styles";
import { AccordionDetails } from "@material-ui/core";
import { Star as StarIcon } from "@material-ui/icons";

// my components
import { lightColors, lightGrey } from "../../../../common/styles/colors.json";
import { secondary as secondaryFont } from "../../../../common/styles/fonts.json";

const useStyles = makeStyles((theme) => {
    return ({
        poiDetails: {
            background: lightColors.accDetailsBK,
            padding: theme.spacing(1)
        },
        contents: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "0 auto"
        },
        bizName: {
            font: secondaryFont,
            fontWeight: "bold",
            fontSize: "20px"
        },
        ratingSection: {
            display: "flex",
            alignItems: "center",
            gap: theme.spacing(.5),
            "& .rating,.totalRatingNum": {
                color: lightGrey,
                fontSize: "14px"
            }
        },
        star: {
            color: theme.palette.secondary.main
        },
        bizOpenPeriod: {
            color: theme.palette.primary.main
        }
    });
});

function Rating({rating, totalRatingNum}) {
    const classes = useStyles();

    return (
        <div className={classes.ratingSection}>
            <div className={["rating",classes.rating].join(" ")}>{rating}</div>
            <StarIcon className={classes.star} />
            <div className={["totalRatingNum",classes.totalRatingNum].join(" ")}>({totalRatingNum})</div>
        </div>
    )
}

export default function POIDetail({ poiData }) {
    const classes = useStyles();

    const { 
        name: bizName,
        rating,
        totalRatingNum,
        bizOpenPeriod
    } = poiData;


    return (
        <AccordionDetails
            className={["poiDetails", classes.poiDetails].join(" ")}
        >
            <div className={classes.contents}>
                <div className={classes.bizName}>{bizName}</div>
                <Rating rating={rating} totalRatingNum={totalRatingNum} />
                <div className={classes.bizOpenPeriod}>{bizOpenPeriod}</div>
                {/* <div className={classes.rating}></div> */}
            </div>
        </AccordionDetails>
    );
}