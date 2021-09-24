// MUI
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    planStepper: {
        position: "fixed",
        top: "5vh"
    }
}));

export default function PlanStepper() {
    const classes = useStyles();

    return (
        <div className={"planStepper " + classes.planStepper}>
            PlanStepper
        </div>
    );
}