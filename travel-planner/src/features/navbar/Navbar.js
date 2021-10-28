// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import DarkModeSwitch from "./DarkModeSwitch";
import Logo from "../../common/components/Logo.js";
import ViewItineraryPopper from "./ViewItineraryPopper.js";
import Quota from "./quota/Quota.js";

// React
import { useState, useLayoutEffect } from "react";

const useStyles = makeStyles((theme) => {
    return ({
        navbar: {
            position: "absolute",
            top: theme.spacing(4),
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
            [theme.breakpoints.up("sm")]: {
                right: "30px"
            }
        }
    });
});

function useWindowSize() {
    const [width, setWidth] = useState("60px");
    useLayoutEffect(() => {
        function updateSize() {
            if (window.innerWidth >= 768) {
                setWidth("75px");
            }
            else {
                setWidth("60px");
            }
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return width;
}

export default function Navbar() {
    const classes = useStyles();

    const width = useWindowSize();

    return (
        <div className={["navbar", classes.navbar].join(" ")}>
            <Quota />
            <Logo
                className="logo"
                width={width}
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