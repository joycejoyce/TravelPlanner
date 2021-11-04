// MUI
import { makeStyles } from "@material-ui/styles";
import { Button, Link as MUILink } from "@material-ui/core";
import { ArrowForward as ArrowIcon } from "@material-ui/icons";

// my components
import { selectIdx, changeIdx } from "../navbar/navSlice.js";
import { resetCriteria } from "../plan/criteria/criteriaSlice.js";
import { RootURL } from "../../config.json";
import { NavItem } from "../navbar/Navbar.js";
import useQuotaExceeded from "../../common/util/useQuotaExceeded.js";
import { SectionItem } from "../about/sections/Sections.js";

// React
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { HashLink as RouteLink } from "react-router-hash-link";

const useStyles = makeStyles((theme) => {
    return ({
        contents: {
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: "210px",
            "& button": {
                display: "flex"
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        },
        title: {
            minWidth: "242px",
            display: "flex",
            flexDirection: "column",
            gap: "0",
            alignItems: "center"
        },
        titleSmall: {
            fontSize: theme.spacing(4)
        },
        titleLarge: {
            fontSize: theme.spacing(6)
        },
        goBtn: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(10),
            width: "100px",
            height: "50px",
            borderRadius: "25px",
            fontSize: theme.spacing(3)
        },
        watchDemoLink: {
            color: theme.palette.text.primary,
            textDecoration: "none",
            fontSize: "16px"
        },
        techLink: {
            alignSelf: "start",
            marginTop: theme.spacing(10),
            cursor: "pointer"
        }
    });
});

function Title() {
    // styles
    const classes = useStyles();

    return (
        <div className={classes.title}>
            <div className={classes.titleSmall}>2 steps to get an</div>
            <div className={classes.titleLarge}>itinerary</div>
        </div>
    );
}

function GoButton({ setAnimationKey }) {
    // styles
    const classes = useStyles();

    // tools
    const history = useHistory();
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(resetCriteria());
        setAnimationKey();
        history.push(`/${RootURL.plan}`);
    };

    return (
        <Button
            variant="contained"
            color="primary"
            className={classes.goBtn}
            endIcon={<ArrowIcon />}
            onClick={handleClick}
        >
            Go
        </Button>
    );
}

function WatchDemoButton() {
    // styles
    const classes = useStyles();

    // data
    const refUrl = SectionItem.demoVideo.ref
    const url = `/${RootURL.about}#${refUrl}`;

    return (
        <Button
            variant="outlined"
        >
            <RouteLink
                className={classes.watchDemoLink}
                to={url}
            >
                Watch demo video
            </RouteLink>
        </Button>
    );
}

function TechBehindLink({ setAnimationKey }) {
    // styles
    const classes = useStyles();

    const history = useHistory();

    const handleClick = () => {
        setAnimationKey();
        history.push(`/${RootURL.about}`);
    };

    return (
        <MUILink
            className={classes.techLink}
            color="textPrimary"
            onClick={handleClick}
        >
            technologies<br />behind the scenes
        </MUILink>
    );
}

export default function Home({ setAnimationKey }) {
    // styles
    const classes = useStyles();

    // tool
    const dispatch = useDispatch();

    // data
    const curNavIdx = useSelector(selectIdx);

    // initialize
    useEffect(() => {
        const pageNavIdx = NavItem[RootURL.home].idx;
        if (curNavIdx !== pageNavIdx) {
            dispatch(changeIdx(pageNavIdx));
        }
    }, []);
    useQuotaExceeded(false);

    return (
        <div className={classes.home}>
            <div className={classes.contents}>
                <Title />
                <GoButton setAnimationKey={setAnimationKey} />
                <WatchDemoButton setAnimationKey={setAnimationKey} />
                <TechBehindLink setAnimationKey={setAnimationKey} />
            </div>
        </div>
    );
}