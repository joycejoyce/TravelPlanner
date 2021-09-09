// MUI
import { Typography, Link, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowForward as ArrowIcon } from '@material-ui/icons';

// my components
import Logo from "../sub/Logo.js";
import { textHightlight as textHightlightColor } from "../../colors.json";
import { secondary as secondaryFont } from "../../fonts.json";

// others
import { Link as RouterLink } from "react-router-dom";
// import styled from "styled-components";

// const Container = styled.div`

// `;

const useStyles = makeStyles((theme) => ({
    home: {
        width: "310px",
        height: "100%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        [theme.breakpoints.up('md')]: {
            width: "478px"
        }
    },
    highlightText: {
        color: textHightlightColor,
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
        fontFamily: secondaryFont,
        fontSize: "30px",
        "& .MuiSvgIcon-root": {
            fontSize: "24px"
        },
        marginTop: theme.spacing(12),
        textTransform: "none",
        letterSpacing: "1px"
    }
}));

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
        <div className={classes.home}>
            <Logo className="logo" width="70px" margin="0 auto" />
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
    );
}