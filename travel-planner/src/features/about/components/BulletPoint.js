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
            minWidth: "10px",
            width: "10px",
            minHeight: "10px",
            height: "10px",
            borderRadius: "50%",
            background: lightColors.navbarBlue
        },
        text: {
            fontSize: "16px",
            color: lightColors.navbarBlue
        }
    });
});

export default function BulletPoint({ key, text }) {
    // styles
    const classes = useStyles();

    return (
        <div key={key} className={classes.bulletPoint}>
            <div className={classes.circle}></div>
            <div className={classes.text}>{text}</div>
        </div>
    )
}