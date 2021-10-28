// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import { getItinerary } from "./dataHandler";
import ItineraryDetail from "./ItineraryDetail.js";
import WrongItineraryNameDetail from "./WrongItineraryNameDetail.js";

// React
import { useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
}));

export default function ItineraryDetailWrapper({ setParentAnimationKey }) {
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
                    <ItineraryDetail name={itineraryName} setParentAnimationKey={setParentAnimationKey} /> :
                    <WrongItineraryNameDetail name={itineraryName} />
                }
            </div>
        </div>
    );
}