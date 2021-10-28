// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import { StepNames } from "../PlanStepper.js";
import useStep from "../../../common/util/useStep.js";
import ItineraryCard from "../../my-itineraries/ItineraryCard.js";
import { getItinerary } from "../../my-itineraries/dataHandler";
import ButtonSection from "../buttonSection/ButtonSection.js";
import { RootURL } from "../../../config.json";

// React
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { useEffect } from "react";

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
    // styles
    const classes = useStyles();

    // data
    const { itineraryName } = useParams();
    const itinerary = getItinerary(itineraryName);

    // routing data
    const history = useHistory();

    // ctrl
    const handleClickBtn = () => {
        setAnimationKey();
        history.push(`/${RootURL.myItineraries}`);
    };

    // use hooks
    useStep(StepNames.getItinerary);

    return (
        <div className={["get-itinerary", classes.root].join(" ")}>
            <div className={["contents", classes.contents].join(" ")}>
                {
                    itineraryName ?
                        (
                            <>
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
                            </>
                        ) :
                        (
                            <></>
                        )
                }

            </div>
        </div>
    );
}