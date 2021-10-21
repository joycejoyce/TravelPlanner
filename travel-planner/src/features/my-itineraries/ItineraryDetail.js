// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Favorite as HeartIcon } from "@material-ui/icons";
import CenterPointDesc from "../../common/components/CenterPointDesc.js";

// my components
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
        gap: theme.spacing(.5),
        "& *": {
            letterSpacing: ".3px"
        }
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

export default function ({ name: itineraryName }) {
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
                {/* <img className={classes.map} src={mapUrl} alt="static map" /> */}
                <CenterPointDesc data={centerPoint} />
            </div>
            <POIDisplayPart poiDatas={poiData} />
            <DeleteSection
                deleteItinerary={deleteItinerary}
                itinerary={itinerary}
            />
        </div>
    );
}