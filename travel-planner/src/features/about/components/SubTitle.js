// MUI
import { makeStyles } from "@material-ui/styles";

// my components
import { lightColors } from "../../../common/styles/colors.json";

const useStyles = makeStyles((theme) => {
    return ({
        text: {
            fontWeight: "bold",
            fontSize: "18px",
            color: lightColors.navbarBlue
        }
    });
});

export default function SubTitle({ text }) {
    // styles
    const classes = useStyles();

    return (
        <h3 className={classes.text}>{text}</h3>
    );
}