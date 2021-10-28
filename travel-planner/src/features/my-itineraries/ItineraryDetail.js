// MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Favorite as HeartIcon,
    ViewModule as ViewIcon,
    ArrowForward as GoIcon
} from "@material-ui/icons";
import { Button } from "@material-ui/core";

// my components
import CenterPointDesc from "../../common/components/CenterPointDesc.js";
import MyRating from "../../common/components/MyRating.js";
import POIDisplayPart from "../plan/confirm/gen-poi-info/POIDisplayPart.js";
import { CriteriaName } from "../plan/criteria/criteriaSlice.js";
import {
    getItinerary,
    getRating,
    getDate,
    getRadius,
    getAllItineraries,
    changeItineraries
} from "./dataHandler.js";
import { secondary as secondaryFont } from "../../common/styles/fonts.json";
import DeleteSection from "./DeleteSection.js";
import { URL } from "../../app/InnerApp.js";

// React
import { useState, useLayoutEffect } from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
    itiDetail: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(.5)
    },
    title: {
        fontSize: "28px",
        [theme.breakpoints.up('md')]: {
            fontSize: "32px",
        },
        fontFamily: secondaryFont,
        marginBottom: "11px",
        maxWidth: "290px",
        textAlign: "center"
    },
    rating: {
        gap: theme.spacing(1)
    },
    section: {
        display: "grid",
        gridTemplateColumns: "1fr 1.5fr",
        width: "152px",
        gap: theme.spacing(.8)
    },
    sectionTitle: {
        fontWeight: "bold"
    },
    mapSection: {
        width: "380px",
        [theme.breakpoints.up('md')]: {
            width: "600px"
        },
        display: "flex",
        flexDirection: "column",
        margin: "16px 0"
    },
    btnSection: {
        alignSelf: "flex-start",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        "& button": {
            fontSize: "16px"
        },
        "& .MuiSvgIcon-root": {
            fontSize: "28px"
        },
        marginBottom: "10vh"
    }
}));

function useMapUrl(origUrl) {
    const [size, setSize] = useState([380, 300]);
    useLayoutEffect(() => {
        function updateSize() {
            const newSize = window.innerWidth < 705 ? [380, 300] : [600, 400];
            setSize(newSize);
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    let parts = origUrl.split("&");
    let url = parts[0];
    parts = parts.slice(1);
    for (let part of parts) {
        if (part.includes("size=")) {
            url += "&size=" + size.join("x");
        }
        else {
            url += "&" + part;
        }
    }
    return url;
}

export default function ItineraryDetail({ name: itineraryName, setParentAnimationKey }) {
    // styles
    const classes = useStyles();

    // major data
    const itinerary = getItinerary(itineraryName);
    let {
        itineraryInfo,
        criteria,
        poiData,
        staticMapUrl
    } = itinerary;

    // data
    const title = itineraryName;
    const rating = getRating(itineraryInfo);
    const date = getDate(criteria);
    const radius = getRadius(criteria) + " km";
    const centerPoint = criteria[CriteriaName.centerPoint];
    const poiCriteria = criteria[CriteriaName.pois];
    const mapUrl = useMapUrl(staticMapUrl);

    // routing data
    const history = useHistory();

    // ctrl
    const deleteItinerary = () => {
        const allItineraries = getAllItineraries();
        delete allItineraries[itineraryName];
        changeItineraries(allItineraries);
        history.push(`/${URL.myItineraries}`);
    };
    const handleClickView = () => {
        setParentAnimationKey();
        history.push(`/${URL.myItineraries}`);
    };
    const handleClickGen = () => {
        setParentAnimationKey();
        history.push(`/${URL.plan}`);
    };

    return (
        <div className={classes.itiDetail}>
            <div className={classes.title}>{title}</div>
            <MyRating
                className={classes.rating}
                value={rating}
                icon={<HeartIcon />}
                disabled
            />
            <div className={classes.section}>
                <div className={classes.sectionTitle}>Date</div>
                <div>{date}</div>
            </div>
            <div className={classes.section}>
                <div className={classes.sectionTitle}>Radius</div>
                <div>{radius}</div>
            </div>
            <div className={classes.mapSection}>
                <img className={classes.map} src={mapUrl} alt="static map" />
                <CenterPointDesc data={centerPoint} />
            </div>
            <POIDisplayPart
                poiDatas={poiData}
                poiCriteria={poiCriteria}
            />
            <DeleteSection
                deleteItinerary={deleteItinerary}
                itinerary={itinerary}
            />
            <div className={classes.btnSection}>
                <Button
                    color="primary"
                    className={classes.viewBtn}
                    endIcon={<ViewIcon />}
                    onClick={handleClickView}
                >
                    My Itineraries
                </Button>
                <Button
                    color="primary"
                    className={classes.goBtn}
                    endIcon={<GoIcon />}
                    onClick={handleClickGen}
                >
                    Generate another itinerary
                </Button>
            </div>
        </div>
    );
}