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
        width: "100%",
        position: "absolute",
        top: "10vh",
        width: "90vw",
        left: "50%",
        transform: "translateX(-50%)"
    }
}));

export default function PlanStepper() {
    const classes = useStyles();
    const activeStep = useSelector(selectActiveStep);

    const getSteps = () => {
        return [
            "Set criteria",
            "Modify POIs",
            "Confirm",
            "Generated!"
        ]
    };

    const steps = getSteps();

    return (
        <Stepper
            className={"planStepper " + classes.planStepper}
            activeStep={activeStep}
        >
            {
                steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    // if (isStepOptional(index)) {
                    //     labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    // }
                    // if (isStepSkipped(index)) {
                    //     stepProps.completed = false;
                    // }
                    return (
                        <Step
                            key={label}
                            alternativeLabel
                            {...stepProps}
                        >
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })
            }
        </Stepper>
    );
}