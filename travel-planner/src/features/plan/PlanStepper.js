// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel } from '@material-ui/core';

// my components
import { selectActiveStep } from "./stepSlice";

// React
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    planStepper: {
        padding: "0",
        position: "absolute",
        top: "12vh",
        width: "90vw",
        minWidth: "414px",
        left: "50%",
        transform: "translateX(-50%)"
    }
}));

export const StepNames = {
    setCriteria: "setCriteria",
    confirm: "confirm",
    getItinerary: "getItinerary"
};

export const StepInfos = {
    [StepNames.setCriteria]: {
        label: "Set Criteria",
        num: 0
    },
    [StepNames.confirm]: {
        label: "Confirm",
        num: 1
    },
    [StepNames.getItinerary]: {
        label: "Get Itinerary",
        num: 2
    }
};

export default function PlanStepper() {
    const classes = useStyles();
    const activeStep = useSelector(selectActiveStep);

    return (
        <Stepper
            className={"planStepper " + classes.planStepper}
            activeStep={activeStep}
        >
            {
                Object.values(StepInfos).map((stepInfo) => {
                    const { label } = stepInfo;
                    return (
                        <Step
                            key={label}
                            alternativeLabel
                        >
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    );
                })
            }
        </Stepper>
    );
}