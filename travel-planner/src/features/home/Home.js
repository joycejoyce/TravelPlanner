// MUI
import { Typography, Link, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowForward as ArrowIcon } from '@material-ui/icons';

// my components
import Logo from "../../common/components/Logo.js";
import { secondary as secondaryFont } from "../../common/styles/fonts.json";

// others
import { Link as RouterLink } from "react-router-dom";

let isDarkMode = false;

const useStyles = makeStyles((theme) => {
    isDarkMode = theme.palette.type === "dark";

    return({
        home: {
        },
        contents: {
            position: "relative",
            width: "310px",
            height: "600px",
            margin: "5vh auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            [theme.breakpoints.up('md')]: {
                width: "480px",
                height: "800px"
            }
        },
        highlightText: {
            color: theme.palette.secondary.main,
            fontFamily: secondaryFont
        },
        paragraph: {
            marginTop: theme.spacing(8),
            alignSelf: "flex-start",
            [theme.breakpoints.up('md')]: {
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
            [theme.breakpoints.up('md')]: {
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

export default function Home() {
    const classes = useStyles();
    const TechLink = props => <RouterLink to="/tech" {...props} />

    return (
        <div className={"home " + classes.home}>
            <div className={"contents " + classes.contents}>
                <Logo
                    className="logo"
                    width="70px"
                    margin="0 auto"
                    isDarkMode={isDarkMode}
                />
                <Paragraph className="paragraph" />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                    endIcon={<ArrowIcon />}
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