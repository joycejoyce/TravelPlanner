// MUI
import { Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// my components
import Logo from "../sub/Logo.js";
import { textHightlight as textHightlightColor } from "../../colors.json";

// others
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

// const Container = styled.div`

// `;

const useStyles = makeStyles((theme) => ({
    home: {
        width: "290px",
        height: "100%",
        margin: "0 auto"
    },
    highlightText: {
        color: textHightlightColor,
        fontFamily: "Gentium Book Basic"
    },
    paragraph: {
        marginTop: theme.spacing(8)
    },
    techLink: {
        position: "absolute",
        bottom: "0",
        fontFamily: theme.typography.fontFamily,
        letterSpacing: ".5px",
        fontSize: "14px"
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
            <Link className={classes.techLink} color="textPrimary" component={TechLink}>
                technologies<br />behind the scenes
            </Link>
        </div>
    );
}