// MUI
import { makeStyles } from "@material-ui/styles";

// my components
import { lightColors } from "../../../common/styles/colors.json";

const useStyles = makeStyles((theme) => {
    return ({
        subTitle: {
            height: "50px",
            width: "80vw",
            maxWidth: "900px",
            margin: "0 0 8px 0",
            background: lightColors.subTitleBK,
            borderRadius: "25px",
            paddingLeft: theme.spacing(3),
            textAlign: "center"
        },
        text: {
            fontWeight: "bold",
            fontSize: "18px",
            color: lightColors.navbarBlue,
            lineHeight: "50px"
        }
    });
});

export default function SubTitle({ text }) {
    // styles
    const classes = useStyles();

    return (
        <div className={classes.subTitle}>
            <h3 className={classes.text}>{text}</h3>
        </div>
    );
}