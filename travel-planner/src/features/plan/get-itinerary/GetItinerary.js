// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import { StepNames } from "../PlanStepper.js";
import useStep from "../../../common/util/useStep.js";
import { ItineraryCard } from "../../my-itineraries/ItineraryCard.js";
import { getItinerary } from "../../my-itineraries/dataHandler";

// React
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    contents: {
        // background: "green"
    }
}));

export default function GetItinerary({ setAnimationKey }) {
    const classes = useStyles();

    useStep(StepNames.getItinerary);

    const { itineraryName } = useParams();
    const itinerary = getItinerary(itineraryName);

    return (
        <div className={["get-itinerary", classes.root].join(" ")}>
            <div className={["contents", classes.contents].join(" ")}>
                <h1>GetItinerary</h1>
                <ItineraryCard itinerary={itinerary} />
            </div>
        </div>
    );
}