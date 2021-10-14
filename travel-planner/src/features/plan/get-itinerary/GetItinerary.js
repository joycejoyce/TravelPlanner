// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import { StepNames } from "../PlanStepper";
import useStep from "../../../common/util/useStep";

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    contents: {
        // background: "green"
    }
}));

export default function GetItinerary() {
    const classes = useStyles();
    useStep(StepNames.getItinerary);

    return (
        <div className={["get-itinerary", classes.root].join(" ")}>
            <div className={["contents", classes.contents].join(" ")}>
                <h1>GetItinerary</h1>
            </div>
        </div>
    );
}