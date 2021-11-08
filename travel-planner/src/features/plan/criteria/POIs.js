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
import { useState } from "react";

const useStyles = makeStyles((theme) => {
    return ({
        contents: {
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr",
            alignItems: "center",
            letterSpacing: ".5px"
        },
        ctrlLabel: {
            height: "42px"
        },
        selectAll: {
            "& .MuiFormControlLabel-label": {
                color: theme.palette.primary.main
            }
        },
        time: {
            minWidth: "100px"
        }
    });
});

function Contents({ poiName }) {
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
        label: "Point-of-Interest #1",
        shortLabel: "POI #1",
        timeStart: "09:00",
        timeEnd: "12:00"
    },
    [POIName.poi2]: {
        name: POIName.poi2,
        label: "Point-of-Interest #2",
        shortLabel: "POI #2",
        timeStart: "13:00",
        timeEnd: "15:00"
    },
    [POIName.poi3]: {
        name: POIName.poi3,
        label: "Point-of-Interest #3",
        shortLabel: "POI #3",
        timeStart: "15:00",
        timeEnd: "18:00"
    }
};

export default function Radius() {
    const classes = useStyles();
    
    // data
    const selectedPOIs = useSelector(selectPOIs);
    const shouldBeSelectAll = Object.values(POIName).reduce((accu, name) => {
        accu = accu && selectedPOIs[name];
        return accu;
    }, true);
    const [selectAll, setSelectAll] = useState(shouldBeSelectAll);

    // ctrl
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const { name, checked } = e.target;
        dispatch(changePOIs({ name, checked }));
    };
    const handleClickSelectAll = (e) => {
        const { checked } = e.target;
        setSelectAll(checked);
        Object.values(POIInfo).forEach((poiInfo) => {
            const { name } = poiInfo;
            dispatch(changePOIs({ name, checked }));
        });
    };

    return (
        <FormControl
            className={classes.pois}
            component="fieldset"
        >
            <FormGroup>
                <FormControlLabel
                    className={classes.selectAll}
                    control={
                        <Checkbox
                            checked={selectAll}
                            onChange={handleClickSelectAll}
                            color="primary"
                        />
                    }
                    label="Select All"
                />
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