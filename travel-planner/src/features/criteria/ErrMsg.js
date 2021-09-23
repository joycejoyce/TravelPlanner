// MUI
import { makeStyles } from "@material-ui/core/styles";

// my component
import { err as errColor, errBK as errBKColor } from "../../common/styles/colors.json";
import { secondary as secondaryFont } from "../../common/styles/fonts.json";

const useStyles = makeStyles((theme) => {
    return ({
        errMsg: {
            color: errColor,
            fontFamily: secondaryFont,
            background: errBKColor,
            lineHeight: "36px",
            textAlign: "center",
            borderRadius: "18px",
            width: "fit-content",
            padding: "0 24px",
            margin: "0 auto"
        }
    });
});

export default function ErrMsg({errMsg}) {
    const classes = useStyles();

    return (
        <div className={"errMsg " + classes.errMsg}>{errMsg}</div>
    );
}