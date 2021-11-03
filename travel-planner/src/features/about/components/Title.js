// MUI
import { makeStyles } from "@material-ui/styles";

// my components
import { secondary as secondaryFont } from "../../../common/styles/fonts.json";

const useStyles = makeStyles((theme) => {
    return ({
        title: {
            fontFamily: secondaryFont,
            fontSize: "28px",
            letterSpacing: ".9px",
            fontWeight: "bold",
            marginBottom: "10px",
            height: "50px",
            // borderTop: ".5px solid #9C9C9C",
            // borderBottom: ".5px solid #9C9C9C",
            lineHeight: "50px",
            // paddingLeft: theme.spacing(1),
            textAlign: "center",
            background: theme.palette.text.primary,
            color: theme.palette.background.paper,
            borderRadius: "5px"
        }
    });
});

export function Title({ id, text }) {
    // styles
    const classes = useStyles();

    return (
        <div
            id={id}
            className={classes.title}
        >
            {text}
        </div>
    );
}