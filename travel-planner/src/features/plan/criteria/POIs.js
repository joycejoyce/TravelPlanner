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

export const POIName = {
    breakfast: "breakfast",
    lunch: "lunch",
    dinner: "dinner",
    poi1: "poi1",
    poi2: "poi2",
    poi3: "poi3"
};

export const POIInfo = {
    [POIName.breakfast]: {
        name: POIName.breakfast,
        label: "Breakfast",
        shortLabel: "Breakfast",
        timeStart: "06:00",
        timeEnd: "09:00"
    },
    [POIName.lunch]: {
        name: POIName.lunch,
        label: "Lunch",
        shortLabel: "Lunch",
        timeStart: "12:00",
        timeEnd: "13:00"
    },
    [POIName.dinner]: {
        name: POIName.dinner,
        label: "Dinner",
        shortLabel: "Dinner",
        timeStart: "18:00",
        timeEnd: "21:00"
    },
    [POIName.poi1]: {
        name: POIName.poi1,
        label: "Point-of-Interst #1",
        shortLabel: "POI #1",
        timeStart: "09:00",
        timeEnd: "12:00"
    },
    [POIName.poi2]: {
        name: POIName.poi2,
        label: "Point-of-Interst #2",
        shortLabel: "POI #2",
        timeStart: "13:00",
        timeEnd: "15:00"
    },
    [POIName.poi3]: {
        name: POIName.poi3,
        label: "Point-of-Interst #3",
        shortLabel: "POI #3",
        timeStart: "15:00",
        timeEnd: "18:00"
    }
};

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