// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import { getItinerary } from "./dataHandler";
import WrongItineraryNameDetail from "./WrongItineraryNameDetail.js";

// React
import { useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
}));

export default function ItineraryDetail() {
    // styles
    const classes = useStyles();

    // data
    const { itineraryName } = useParams();
    const itinerary = getItinerary(itineraryName);

    return (
        <div>
            <div className={["contents"].join(" ")}>
                {
                    itinerary ?
                    <></> :
                    <WrongItineraryNameDetail name={itineraryName} />
                }
            </div>
        </div>
    );
}