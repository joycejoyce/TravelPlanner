// MUI
import { makeStyles } from "@material-ui/core/styles";

// React
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    navbar: {
        position: "fixed",
        zIndex: "10"
    }
}));

export default function Navbar() {
    const classes = useStyles();
    const history = useHistory();

     const handleOnClick = (location) => {
        history.push("/" + location);
     }

    return (
        <div className={"navbar " + classes.navbar}>
            <button onClick={() => handleOnClick("home")}>Home</button>
            <button onClick={() => handleOnClick("criteria")}>Criteria</button>
        </div>
    );
}