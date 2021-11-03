// MUI
import { makeStyles } from "@material-ui/styles";

// my components
import { lightColors } from "../../../common/styles/colors.json";

const useStyles = makeStyles((theme) => {
    return ({
        subTitle: {
            height: "30px",
            width: "240px",
            maxWidth: "900px",
            margin: "8px 0",
            background: lightColors.subTitleBK,
            // borderRadius: "15px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "16px",
            color: lightColors.navbarBlue,
            lineHeight: "30px"
        }
    });
});

export default function SubTitle({ text }) {
    // styles
    const classes = useStyles();

    return (
        <div className={classes.subTitle}>
            { text }
        </div>
    );
}