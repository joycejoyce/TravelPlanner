// MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox
} from '@material-ui/core';

// my components
import { changePOIs, selectPOIs } from "./criteriaSlice";

// React
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => {
    return ({
        contents: {
            display: "grid",
            gridTemplateColumns: "1.8fr 1fr",
            alignItems: "center",
            letterSpacing: ".5px"
        },
        ctrlLabel: {
            height: "42px"
        }
    });
});

function Contents({poiName}) {
    const classes = useStyles();
    const { label, timeStart, timeEnd } = POIInfo[poiName];

    return (
        <div className={"contents " + classes.contents}>
            <div className={"label " + classes.label}>{label}</div>
            <div className={"time " + classes.time}>
                <p>{timeStart} ~ {timeEnd}</p>
            </div>
        </div>
    );
}

export const POIInfo = {
    breakfast: {
        label: "Breakfast",
        timeStart: "06:00",
        timeEnd: "09:00"
    },
    poi1: {
        label: "Point-of-Interst #1",
        timeStart: "09:00",
        timeEnd: "12:00"
    },
    lunch: {
        label: "Lunch",
        timeStart: "12:00",
        timeEnd: "13:00"
    },
    poi2: {
        label: "Point-of-Interst #2",
        timeStart: "13:00",
        timeEnd: "15:00"
    },
    poi3: {
        label: "Point-of-Interst #3",
        timeStart: "15:00",
        timeEnd: "18:00"
    },
    dinner: {
        label: "Dinner",
        timeStart: "18:00",
        timeEnd: "21:00"
    }
}

export default function Radius() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedPOIs = useSelector(selectPOIs);

    const handleChange = (e) => {
        const { name, checked } = e.target;
        dispatch(changePOIs({ name, checked }));
    }

    return (
        <FormControl
            className={classes.pois}
            component="fieldset"
        >
            {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
            <FormGroup>
                {
                    Object.keys(POIInfo).map(poiName => {
                        return (
                            <FormControlLabel
                                className={classes.ctrlLabel}
                                control={<Checkbox
                                            checked={selectedPOIs[poiName]}
                                            onChange={handleChange}
                                            name={poiName}
                                        />}
                                label={<Contents poiName={poiName} />}
                            />
                        );
                    })
                }
            </FormGroup>
        </FormControl>
    );
}