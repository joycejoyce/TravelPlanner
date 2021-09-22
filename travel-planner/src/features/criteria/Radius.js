// MUI
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";

// my components
import { changeRadius, selectRadius } from "./criteriaSlice";

// React
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => {
    return ({
        radius: {
            "& .MuiFormGroup-root": {
                flexDirection: "row"
            }
        }
    });
});

export default function Radius() {
    const classes = useStyles();
    const radiusChoices = [10, 20, 30];
    const dispatch = useDispatch();
    const selectedRadius = useSelector(selectRadius);

    const handleChange = (e) => {
        dispatch(changeRadius(Number.parseInt(e.target.value)));
    };

    return (
        <FormControl
            className={"radius " + classes.radius}
            component="fieldset"
        >
            {/* <FormLabel component="legend">Gender</FormLabel> */}
            <RadioGroup
                aria-label="radius"
                name="radius"
                value={selectedRadius}
                onChange={handleChange}
            >
                {
                    radiusChoices.map(radius => (
                        <FormControlLabel
                            value={radius}
                            control={<Radio />}
                            label={radius.toString() + " km"}
                        />
                    ))
                }
            </RadioGroup>
        </FormControl>
    );
}