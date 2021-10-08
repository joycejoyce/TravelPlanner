// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import DarkModeSwitch from "./DarkModeSwitch";
import Logo from "../../common/components/Logo.js";
import ViewItineraryPopper from "./ViewItineraryPopper";

const useStyles = makeStyles((theme) => {
    return ({
        navbar: {
            position: "relative",
            zIndex: "11",
            width: "100vw"
        },
        ctrlSection: {
            width: "30px",
            position: "absolute",
            right: "40px",
            top: "-5px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }
    });
});

export default function Navbar() {
    const classes = useStyles();

    return (
        <div className={["navbar", classes.navbar].join(" ")}>
            <Logo
                className="logo"
                width="60px"
                margin="3vh auto"
                isDarkMode={false}
            />
            <div className={["ctrlSection", classes.ctrlSection].join(" ")}>
                <DarkModeSwitch />
                <ViewItineraryPopper />
            </div>
        </div>
    );
}