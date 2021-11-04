// MUI
import { Typography, Link, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowForward as ArrowIcon } from "@material-ui/icons";

// my components
import { secondary as secondaryFont } from "../../common/styles/fonts.json";
import { resetCriteria } from "../plan/criteria/criteriaSlice.js";
import { RootURL } from "../../config.json";
import useQuotaExceeded from "../../common/util/useQuotaExceeded.js";
import { changeIdx, selectIdx } from "../navbar/navSlice.js";
import { NavItem } from "../navbar/Navbar.js";

// React
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => {
    return({
        home: {
        },
        contents: {
            position: "absolute",
            top: "130px",
            [theme.breakpoints.up('md')]: {
                top: "150px",
            },
            left: "50%",
            transform: "translateX(-50%)",
            width: "310px",
            height: "460px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            [theme.breakpoints.up("md")]: {
                width: "480px",
                height: "750px"
            }
        },
        highlightText: {
            color: theme.palette.secondary.main,
            fontFamily: secondaryFont
        },
        paragraph: {
            alignSelf: "flex-start",
            [theme.breakpoints.up("md")]: {
                marginTop: theme.spacing(12),
                "& h5": {
                    fontSize: "36px"
                },
                "& h3": {
                    fontSize: "75px"
                }
            }
        },
        techLink: {
            position: "absolute",
            bottom: "0",
            cursor: "pointer",
            fontFamily: theme.typography.fontFamily,
            letterSpacing: ".5px",
            fontSize: "14px",
            alignSelf: "flex-start",
            [theme.breakpoints.up("md")]: {
                fontSize: "16px"
            }
        },
        btn: {
            width: "127px",
            height: "60px",
            borderRadius: "30px",
            fontSize: "30px",
            "& .MuiSvgIcon-root": {
                fontSize: "24px"
            },
            marginTop: theme.spacing(12),
            textTransform: "none",
            letterSpacing: "1px",
            color: theme.palette.type === "dark" ? theme.palette.text.primary : theme.palette.background.paper
        }
    });
});

const Paragraph = () => {
    const classes = useStyles();

    return (
        <div className={classes.paragraph}>
            <Typography variant="h5">Choose a center point and...</Typography>
            <br />
            <br />
            <Typography variant="h3" className={classes.highlightText}>Voila!</Typography>
            <Typography variant="h5">An itinerary is generated!</Typography>
        </div>
    )
};

export default function Home({ setAnimationKey }) {
    // styles
    const classes = useStyles();

    // tool
    const history = useHistory();
    const dispatch = useDispatch();

    // data
    const curNavIdx = useSelector(selectIdx);

    // ctrl
    const handleClickGo = () => {
        dispatch(resetCriteria());
        setAnimationKey();
        history.push(`/${RootURL.plan}`);
    }
    const handleClickTechBehind = () => {
        setAnimationKey();
        history.push(`/${RootURL.about}`);
    };
    
    // initialize
    useEffect(() => {
        const pageNavIdx = NavItem[RootURL.home].idx;
        if (curNavIdx !== pageNavIdx) {
            dispatch(changeIdx(pageNavIdx));
        }
    }, []);
    useQuotaExceeded(false);

    return (
        <div className={"home " + classes.home}>
            <div className={"contents " + classes.contents}>
                <Paragraph className="paragraph" />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                    endIcon={<ArrowIcon />}
                    onClick={handleClickGo}
                >
                    Go
                </Button>
                <Link
                    className={classes.techLink}
                    color="textPrimary"
                    onClick={handleClickTechBehind}
                >
                    technologies<br />behind the scenes
                </Link>
            </div>
        </div>
    );
}