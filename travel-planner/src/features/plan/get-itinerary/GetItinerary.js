// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import { StepNames } from "../PlanStepper.js";
import useStep from "../../../common/util/useStep.js";
import { ItineraryCard } from "../../my-itineraries/ItineraryCard.js";
import { getItinerary } from "../../my-itineraries/dataHandler";
import ButtonSection from "../buttonSection/ButtonSection.js";

// React
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    contents: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    desc: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    btn: {
        marginTop: theme.spacing(4),
        "& button": {
            borderRadius: "20px"
        }
    }
}));

export default function GetItinerary({ setAnimationKey }) {
    const classes = useStyles();

    useStep(StepNames.getItinerary);

    const { itineraryName } = useParams();
    const itinerary = getItinerary(itineraryName);

    // ctrl
    const handleClickBtn = () => {

    };

    return (
        <div className={["get-itinerary", classes.root].join(" ")}>
            <div className={["contents", classes.contents].join(" ")}>
                <div className={classes.desc}>Check out the itinerary:</div>
                <ItineraryCard itinerary={itinerary} />
                <div className={classes.btn}>
                    <ButtonSection
                        
                        leftCtrl={{
                            handleClick: handleClickBtn,
                            text: "My Itineraries",
                            icon: null
                        }}
                    />
                </div>
            </div>
        </div>
    );
}