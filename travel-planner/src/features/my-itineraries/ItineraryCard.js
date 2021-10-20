// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import { Favorite as HeartIcon } from "@material-ui/icons";

// my components
import MyRating from "../../common/components/MyRating.js";
import { CriteriaName } from "../plan/criteria/criteriaSlice";
import { getDateStr } from "../../common/util/DateUtil.js";
import { ItineraryInfoFieldName } from "../plan/confirm/itinerary-info/itineraryInfoSlice.js";
import { secondary as secondaryFont } from "../../common/styles/fonts.json";
import { MapIconUrl } from "../../common/components/MapIcon.js";
import { POIName } from "../plan/criteria/POIs.js";

// React
import { useHistory, useRouteMatch } from "react-router";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "272px",
        minHeight: "187px",
        position: "relative",
        cursor: "pointer"
    },
    bkImg: {
        width: "100%",
        height: "100%",
        position: "absolute",
        opacity: "15%",
        top: "0",
        left: "0"
    },
    contents: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "18px",
        "& > *": {
            textAlign: "center",
            letterSpacing: ".3px"
        }
    },
    title: {
        fontFamily: secondaryFont,
        fontWeight: "bold",
        fontSize: "20px"
    },
    date: {
        marginTop: "8px",
        fontSize: "14px"
    },
    rating: {
        marginTop: "5px",
        "& .MuiSvgIcon-root": {
            width: "20px",
            height: "20px"
        },
        gap: "6px"
    },
    centerPointDesc: {
        marginTop: "9px",
        display: "flex",
        gap: theme.spacing(1),
        alignItems: "flex-start"
    },
    centerPointIcon: {
        width: "28px"
    },
    address: {
        fontSize: "14px",
        textAlign: "left"
    }
}));

function CenterPointDesc({ addr }) {
    // styles
    const classes = useStyles();

    // data
    const src = MapIconUrl.center;

    return (
        <div className={classes.centerPointDesc}>
            <img className={classes.centerPointIcon} src={src} alt="center point icon" />
            <div className={classes.address}>{addr}</div>
        </div>
    );
}

export function ItineraryCard({ itinerary }) {
    // styles
    const classes = useStyles();

    // routing data
    const { path, url } = useRouteMatch();
    const history = useHistory();

    // main data
    const { criteria, itineraryInfo, poiData } = itinerary;
    const centerPoint = criteria[CriteriaName.centerPoint];
    const itineraryName = itineraryInfo[ItineraryInfoFieldName.name];

    // ctrl
    const getCenterPointAddr = () => {
        const { address } = centerPoint.position;
        return address;
    };
    const getTitle = () => {
        return itineraryName;
    };
    const getDate = () => {
        const dateObj = criteria[CriteriaName.date];
        const dateStr = getDateStr(dateObj);
        return dateStr;
    };
    const getRating = () => {
        const rating = itineraryInfo[ItineraryInfoFieldName.rating];
        return rating;
    };
    const getBKImgUrl = () => {
        const poiItems = Object.values(poiData);
        for (let item of poiItems) {
            const { photo } = item;
            if (photo) {
                return photo;
            }
        }
        return null;
    };

    // data
    const centerPointAddr = getCenterPointAddr();
    const title = getTitle();
    const date = getDate();
    const rating = getRating();
    const bkImgUrl = getBKImgUrl();

    // ctrl
    const handleClick = () => {
        history.push(`${path}/${itineraryName}`);
    };

    return (
        <Card className={classes.root} onClick={handleClick}>
            <CardContent className={classes.contents}>
                <img className={classes.bkImg} src={bkImgUrl} />
                <div className={classes.title}>{title}</div>
                <div className={classes.date}>{date}</div>
                <MyRating
                    className={classes.rating}
                    value={rating}
                    icon={<HeartIcon />}
                    disabled
                />
                <CenterPointDesc addr={centerPointAddr} />
            </CardContent>
        </Card>
    )
}