// MUI
import { makeStyles } from "@material-ui/styles";

// my components
import { lightColors } from "../../../common/styles/colors.json";

const useStyles = makeStyles((theme) => {
    return ({
        bulletPoint: {
            display: "flex",
            gap: theme.spacing(1),
            alignItems: "center",
            marginBottom: theme.spacing(1)
        },
        circle: {
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: lightColors.text
        },
        text: {
            fontSize: "16px",
            // color: lightColors.navbarBlue
        }
    });
});

export default function SubBulletPoint({ text }) {
    // styles
    const classes = useStyles();

    return (
        <div className={classes.bulletPoint}>
            <div className={classes.circle}></div>
            <div className={classes.text}>{text}</div>
        </div>
    )
}