// MUI
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

// my components
import { changePOIs, selectPOIs } from "./criteriaSlice";
import { secondary as secondaryFont } from "../../common/styles/fonts.json";

// React
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => {
    return ({
        contents: {
            display: "grid",
            gridTemplateColumns: "1.8fr 1fr",
            alignItems: "center",
            letterSpacing: ".5px"
        }
    });
});

function Contents({poiInfo}) {
    const classes = useStyles();
    const { label, timeStart, timeEnd } = poiInfo;

    return (
        <div className={"contents " + classes.contents}>
            <div className={"label " + classes.label}>{label}</div>
            <div className={"time " + classes.time}>
                <p>{timeStart} ~ {timeEnd}</p>
            </div>
        </div>
    );
}

export default function Radius() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const pois = useSelector(selectPOIs);

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
                    Object.keys(pois).map(poiName => {
                        return (
                            <FormControlLabel
                                control={<Checkbox
                                            checked={pois[poiName].checked}
                                            onChange={handleChange}
                                            name={poiName}
                                        />}
                                label={<Contents poiInfo={pois[poiName]} />}
                            />
                        );
                    })
                }
            </FormGroup>
        </FormControl>
    );
}