// MUI
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Switch } from "@material-ui/core";

// React
import { useState } from "react";

const useStyles = makeStyles((theme) => {
    return ({
        switch: {
            // position: "absolute",
            // right: "20px",
            // top: "10px"
        }
    });
});

const MySwitch = withStyles({
    switchBase: {
        color: "#B3C3FF",
        "&$checked": {
            color: "#0027B2",
        },
        "&$checked + $track": {
            backgroundColor: "#0027B2",
        },
    },
    checked: {},
    track: {},
})(Switch);

export default function DarkModeSwitch() {
    const classes = useStyles();

    const [state, setState] = useState({
        checkedA: false
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <MySwitch
            className={["mySwitch", classes.switch].join(" ")}
            checked={state.checkedA}
            onChange={handleChange}
            name="checkedA"
        />
    )
}