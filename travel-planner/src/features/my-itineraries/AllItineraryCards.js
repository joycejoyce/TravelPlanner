// MUI
import { makeStyles } from "@material-ui/styles";

// my components
import { getAllItineraries } from "./dataHandler.js";
import { ItineraryCard } from "./ItineraryCard.js";

const useStyles = makeStyles((theme) => ({
    allItiCards: {

    },
    contents: {
    }
}));

export default function AllItineraryCards() {
    // styles
    const classes = useStyles();

    // data
    const itineraries = getAllItineraries();

    return (
        <div className={classes.allItiCards}>
            <div className={["contents"].join(" ")}>
                <div>My Itineraries</div>
                {
                    Object.values(itineraries).map((itinerary) => {
                        return <ItineraryCard itinerary={itinerary} />
                    })
                }
            </div>
        </div>
    );
}