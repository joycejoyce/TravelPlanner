// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import { StepNames } from "../plan/PlanStepper";
import useStep from "../../common/util/useStep";
import { get } from "./dataHandler.js";

// React
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    contents: {
        // background: "green"
    }
}));

export default function MyItineraries() {
    const classes = useStyles();
    useStep(StepNames.getItinerary);

    let itineraryObj = null;
    useEffect(() => {
        itineraryObj = get();
        console.log({itineraryObj});
    }, []);

    const getMapUrl = () => {
        const obj = get();
        return obj.staticMapUrl;
    }

    return (
        <div className={["my-itineraries", classes.root].join(" ")}>
            <div className={["contents", classes.contents].join(" ")}>
                <h1>MyItinerary</h1>
                <img src={getMapUrl()} />
                {/* <div className={["map", classes.map].join(" ")} /> */}
            </div>
        </div>
    );
}