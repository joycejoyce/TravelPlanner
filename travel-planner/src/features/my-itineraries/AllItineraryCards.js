// MUI
import { makeStyles } from "@material-ui/styles";
import { useEffect } from "react";
import { getStyles_pageTitle } from "../../common/styles/styles.js";

// my components
import { getAllItineraries, getTestUrl } from "./dataHandler.js";
import ItineraryCard from "./ItineraryCard.js";
import { openModal } from "../navbar/quota/exceedQuotaModalSlice.js";

// others
import axios from "axios";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => {
    const titleStyles = getStyles_pageTitle(theme);

    return ({
        allItiCards: {
        },
        contents: {
            textAlign: "center",
        },
        title: {
            ...titleStyles
        },
        cards: {
            display: "grid",
            gap: "16px",
            gridTemplateColumns: "1fr",
            [theme.breakpoints.up('md')]: {
                gridTemplateColumns: "1fr 1fr",
                gap: "32px 16px"
            },
            [theme.breakpoints.up('lg')]: {
                gridTemplateColumns: "1fr 1fr 1fr"
            },
            marginBottom: "10vh"
        }
    });
});

export default function AllItineraryCards() {
    // styles
    const classes = useStyles();

    // data
    const itineraries = getAllItineraries();

    // init
    const dispatch = useDispatch();
    useEffect(() => {
        function checkIsGMapAvailable() {
            const imgUrl = getTestUrl();
            axios.get(imgUrl)
                .then((res) => { console.table(res.data) })
                .catch((error) => {
                    dispatch(openModal());
                })
                .finally(() => { /* 不論失敗成功皆會執行 */ })
        }
        checkIsGMapAvailable();
    });

    return (
        <div className={classes.allItiCards}>
            <div className={["contents", classes.contents].join(" ")}>
                <div className={classes.title}>My Itineraries</div>
                <div className={classes.cards}>
                    {
                        Object.values(itineraries).map((itinerary) => {
                            return <ItineraryCard itinerary={itinerary} />
                        })
                    }
                </div>
            </div>
        </div>
    );
}