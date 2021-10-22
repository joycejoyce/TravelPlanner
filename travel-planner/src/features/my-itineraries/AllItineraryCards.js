// MUI
import { makeStyles } from "@material-ui/styles";

// my components
import { getAllItineraries } from "./dataHandler.js";
import ItineraryCard from "./ItineraryCard.js";

const useStyles = makeStyles((theme) => {
    console.log({theme});

    return ({
        allItiCards: {
        },
        contents: {
            textAlign: "center",
        },
        title: {
            fontSize: "28px",
            [theme.breakpoints.up('md')]: {
                fontSize: "32px"
            },
            [theme.breakpoints.up('lg')]: {
                fontSize: "40px"
            },
            letterSpacing: ".9px",
            fontWeight: "bold",
            marginBottom: "40px"
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