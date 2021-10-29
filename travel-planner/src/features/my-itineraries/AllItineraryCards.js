// MUI
import { makeStyles } from "@material-ui/styles";
import { getStyles_pageTitle } from "../../common/styles/styles.js";

// my components
import { getAllItineraries } from "./dataHandler.js";
import ItineraryCard from "./ItineraryCard.js";

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