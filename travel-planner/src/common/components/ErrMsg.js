// MUI
import { makeStyles } from "@material-ui/core/styles";

// my component
import { err as errColor, errBK as errBKColor } from "../styles/colors.json";
import { secondary as secondaryFont } from "../styles/fonts.json";

const useStyles = makeStyles((theme) => {
    return ({
        errMsg: {
            color: errColor,
            fontFamily: secondaryFont,
            background: errBKColor,
            textAlign: "center",
            borderRadius: "18px",
            width: "fit-content",
            whiteSpace: "pre-wrap"
        }
    });
});

export default function ErrMsg({errMsg}) {
    const classes = useStyles();
    const hasErr = errMsg && errMsg.length > 0;
    const styles = {
        padding: hasErr ? "8px 24px" : "0",
        marginBottom: hasErr ? "4px" : "0"
    };

    return (
        <div
            className={"errMsg " + classes.errMsg}
            style={styles}
        >
            {errMsg}
        </div>
    );
}