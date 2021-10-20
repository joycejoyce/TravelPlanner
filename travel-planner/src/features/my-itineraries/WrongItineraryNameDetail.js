// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import { secondary as secondaryFont } from "../../common/styles/fonts.json";
import { err as errColor } from "../../common/styles/colors.json";

const useStyles = makeStyles((theme) => ({
    wrong: {
        textAlign: "center",
        fontSize: "1.3rem",
        color: errColor
    },
    wrongName: {
        fontFamily: secondaryFont,
        fontSize: "2rem",
        lineHeight: "3rem"
    }
}));

export default function WrongItineraryNameDetail({ name }) {
    // styles
    const classes = useStyles();

    return (
        <div className={classes.wrong}>
            <div>No itinerary named:</div>
            <div className={classes.wrongName}>{name}</div>
        </div>
    )
}