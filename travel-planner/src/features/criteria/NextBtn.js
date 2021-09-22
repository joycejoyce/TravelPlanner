// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

// my components
import { unlockStep, expandStep, collapseStep, changeActiveStep } from "./criteriaSlice.js";

// React
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => {
    return ({
        nextBtn: {
            minWidth: "100px",
            maxWidth: "100px",
            fontSize: "16px",
            margin: "10px 0 0 auto"
        }
    });
});

export default function NextBtn({disabled, currStep, nextStep}) {
    const classes = useStyles();

    

    const dispatch = useDispatch();

    const handleOnClick = () => {
        // const currStep = Criterion.centerPoint;
        dispatch(collapseStep(currStep));

        // const nextStep = Criterion.date;
        dispatch(unlockStep(nextStep));
        dispatch(expandStep(nextStep));

        dispatch(changeActiveStep({ currStep, nextStep }));
    }

    return (
        <Button
            className={classes.nextBtn}
            color="primary"
            variant="contained"
            onClick={handleOnClick}
            disabled={disabled}
        >
            Next
        </Button>
    );
}