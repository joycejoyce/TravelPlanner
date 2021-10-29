// MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Home as HomeIcon,
    Edit as PlanIcon,
    ViewModule as ItinerariesIcon,
    Help as AboutIcon
} from "@material-ui/icons";

// my components
import Logo from "../../common/components/Logo.js";
import NavItem_Mobile from "./NavItem_Mobile.js";
import NavItem_Desktop from "./NavItems_Desktop.js";
import { RootURL } from "../../config.json";

// React
import { useState, useLayoutEffect } from "react";
import { useLocation } from "react-router";

const useStyles = makeStyles((theme) => {
    return ({
        navbar: {
            position: "absolute",
            top: theme.spacing(4),
            width: "100vw",
            zIndex: "9",
            height: "100px",
            "& > *": {
                position: "absolute",
                top: "50%"
            },
            "& .navItems": {
                transform: "translateY(-50%)",
                right: "3vw"
            }
        },
        logo: {
            left: "50%",
            transform: "translate(-50%,-50%)"
        }
    });
});

export const NavItem = {
    [RootURL.home]: {
        idx: 0,
        label: "Home",
        url: `/`,
        icon: <HomeIcon />
    },
    [RootURL.plan]: {
        idx: 1,
        label: "Plan",
        url: `/${RootURL.plan}`,
        icon: <PlanIcon />
    },
    [RootURL.myItineraries]: {
        idx: 2,
        label: "My Itineraries",
        url: `${RootURL.myItineraries}`,
        icon: <ItinerariesIcon />
    },
    [RootURL.about]: {
        idx: 3,
        label: "About",
        url: `${RootURL.about}`,
        icon: <AboutIcon />
    }
};

function useWindowSize() {
    const [width, setWidth] = useState("60px");
    useLayoutEffect(() => {
        function updateSize() {
            const threshold = 768;
            if (window.innerWidth >= threshold) {
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

function useMobile() {
    const [isMobile, setIsMobile] = useState(true);
    useLayoutEffect(() => {
        function updateSize() {
            const threshold = 1060;
            if (window.innerWidth >= threshold) {
                setIsMobile(false);
            }
            else {
                setIsMobile(true);
            }
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return isMobile;
}

export default function Navbar() {
    const classes = useStyles();

    const location = useLocation();
    const { pathname } = location;
    const checkIsHome = () => {
        return pathname.includes(RootURL.home) || pathname === "/";
    }

    // const width = useWindowSize();
    const width = "60px";
    const isMobile = useMobile() || checkIsHome();

    return (
        <div className={["navbar", classes.navbar].join(" ")}>
            <Logo
                className={classes.logo}
                width={width}
            />
            {
                isMobile ? <NavItem_Mobile /> : <NavItem_Desktop />
            }
        </div>
    );
}