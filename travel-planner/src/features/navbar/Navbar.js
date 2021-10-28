// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import DarkModeSwitch from "./DarkModeSwitch";
import Logo from "../../common/components/Logo.js";
import ViewItineraryPopper from "./ViewItineraryPopper.js";
import Quota from "./quota/Quota.js";

const useStyles = makeStyles((theme) => {
    return ({
        navbar: {
            position: "relative",
            width: "100vw",
            zIndex: "9"
        },
        ctrlSection: {
            gap: "0px",
            width: "30px",
            position: "absolute",
            right: "10px",
            top: "-20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            [theme.breakpoints.up('sm')]: {
                right: "30px"
            }
        }
    });
});

export default function Navbar() {
    const classes = useStyles();

    return (
        <div className={["navbar", classes.navbar].join(" ")}>
            <Quota />
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