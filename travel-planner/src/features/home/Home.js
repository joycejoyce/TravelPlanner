// MUI
import { Typography, Link, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowForward as ArrowIcon } from "@material-ui/icons";

// my components
import { NavItem } from "../navbar/ViewItineraryPopper.js";
import { secondary as secondaryFont } from "../../common/styles/fonts.json";
import { resetCriteria } from "../plan/criteria/criteriaSlice.js";
import { RootURL } from "../../config.json";
import { changeIdx } from "../navbar/navSlice.js";

// React
import { useDispatch } from "react-redux";
import {
    Link as RouterLink,
    useHistory
} from "react-router-dom";

let isDarkMode = false;

const useStyles = makeStyles((theme) => {
    isDarkMode = theme.palette.type === "dark";

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
            height: "520px",
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
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const TechLink = props => <RouterLink to="/tech" {...props} />

    const handleClickGo = () => {
        dispatch(resetCriteria());
        setAnimationKey();
        history.push("/plan");
    }

    const navIdx = NavItem[RootURL.home].idx;
    dispatch(changeIdx(navIdx));

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
                <Link className={classes.techLink} color="textPrimary" component={TechLink}>
                    technologies<br />behind the scenes
                </Link>
            </div>
        </div>
    );
}