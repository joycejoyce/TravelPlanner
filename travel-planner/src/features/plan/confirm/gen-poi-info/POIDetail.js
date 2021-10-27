// MUI
import { makeStyles } from "@material-ui/core/styles";
import { AccordionDetails, Button, IconButton } from "@material-ui/core";
import { Star as StarIcon } from "@material-ui/icons";
import { Home as WebsiteIcon, LaunchRounded as OpenLinkIcon } from "@material-ui/icons";

// my components
import { lightColors, lightGrey } from "../../../../common/styles/colors.json";
import { primary as primaryFont, secondary as secondaryFont } from "../../../../common/styles/fonts.json";
import { changeQuota } from "../../../navbar/quota/quotaSlice.js";

// React
import React from "react";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => {
    return ({
        poiDetails: {
            background: lightColors.accDetailsBK,
            padding: theme.spacing(1),
            position: "relative"
        },
        contents: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "0 auto",
            gap: "10px"
        },
        bizName: {
            fontFamily: secondaryFont,
            fontWeight: "bold",
            fontSize: "20px",
            textAlign: "center",
            maxWidth: "290px"
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
        },
        textInfo: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        },
        websiteLink: {
            width: "144px",
            borderRadius: "20px",
            fontFamily: primaryFont
        },
        gmapLink: {
            position: "absolute",
            right: theme.spacing(1),
            color: lightColors.primary
        },
        bizImg: {
            borderRadius: "3px",
            maxWidth: "300px"
        },
        address: {
            fontSize: "14px",
            // lineHeight: "25px",
            maxWidth: "290px",
            textAlign: "center"
        }
    });
});

function Rating({ rating, totalRatingNum }) {
    const classes = useStyles();

    return (
        <div className={classes.ratingSection}>
            <div className={["rating", classes.rating].join(" ")}>{rating}</div>
            <StarIcon className={classes.star} />
            <div className={["totalRatingNum", classes.totalRatingNum].join(" ")}>({totalRatingNum})</div>
        </div>
    )
}

function BizImg({ id, src }) {
    const classes = useStyles();
    
    const dispatch = useDispatch();

    const quotaInput = {
        amount: 1,
        source: "BizImg_POIDetail"
    };
    dispatch(changeQuota(quotaInput));

    return (
        <img
            className={classes.bizImg}
            id={id}
            src={src}
        />
    );
}
const BizImg_memorized = React.memo(BizImg);

function WebsiteLink({ url }) {
    const classes = useStyles();

    const handleClick = () => {
        window.open(url);
    };

    return (
        <Button
            className={classes.websiteLink}
            variant="outlined"
            color="primary"
            startIcon={<WebsiteIcon />}
            onClick={handleClick}
        >
            website
        </Button>
    );
}

function GMapLink({ url }) {
    const classes = useStyles();

    const handleClick = () => {
        window.open(url);
    };

    return (
        <IconButton
            className={classes.gmapLink}
            aria-label="gmap"
            onClick={handleClick}
            color="primary"
            size="small"
        >
            <OpenLinkIcon />
        </IconButton>
    )
}

function POIDetail({ poiData }) {
    const classes = useStyles();

    const {
        id,
        name: bizName,
        rating,
        totalRatingNum,
        bizOpenPeriod,
        photo,
        bizWebsite,
        gmapUrl,
        address
    } = poiData;

    return (
        <AccordionDetails
            className={["poiDetails", classes.poiDetails].join(" ")}
        >
            <GMapLink url={gmapUrl} />
            <div className={classes.contents}>
                <div className={classes.textInfo}>
                    <div className={classes.bizName}>{bizName}</div>
                    <Rating rating={rating} totalRatingNum={totalRatingNum} />
                    <div className={classes.address}>{address}</div>
                    <div className={classes.bizOpenPeriod}>{bizOpenPeriod}</div>
                </div>
                {
                    photo ? <BizImg_memorized
                        id={id}
                        src={photo}
                        // getUrl={photo.getUrl}
                    /> : null
                }
                {
                    bizWebsite ? <WebsiteLink
                        url={bizWebsite}
                    /> : null
                }
                {/* <WebsiteLink
                    url={bizWebsite}
                /> */}
            </div>
        </AccordionDetails>
    );
}

const POIDetail_memorized = React.memo(POIDetail);
export default POIDetail_memorized;