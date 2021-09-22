// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import { secondary as secondaryFont } from "../../common/styles/fonts.json";

const useStyles = makeStyles((theme) => {
    return ({
        criterion: {

        },
        summary: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: theme.palette.primary.main,
            fontSize: "18px"
        },
        numCircle: {
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: theme.palette.secondary.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: secondaryFont
        },
        detail: {
            marginTop: theme.spacing(1)
        }
    });
});

export default function Criterion({criterion}) {
    const classes = useStyles();
    const {
        num,
        summary,
        detail
    } = criterion;

    return (
        <div className={"criterion " + classes.criterion}>
            <div className={"summary " + classes.summary}>
                <div className={"circle " + classes.numCircle}>{num}</div>
                <div className={"summaryText" + classes.summaryText}>{summary}</div>
            </div>
            <div className={"detail " + classes.detail}>{detail}</div>
        </div>
    );
}