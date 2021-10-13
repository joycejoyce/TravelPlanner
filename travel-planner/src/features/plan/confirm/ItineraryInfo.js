// MUI
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { Favorite as HeartIcon } from "@material-ui/icons";

// my components
import { getImgPath } from "../../../common/util/PathGetter.js";
import { selectAll } from "../criteria/criteriaSlice.js";
import { mock_criteria } from "./mockData.js";
import { err as heartColor } from "../../../common/styles/colors.json";

// React
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => {
    return ({
        itineraryInfo: {
            marginTop: theme.spacing(6)
        },
        contents: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(6),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: theme.spacing(4)
        },
        section: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: theme.spacing(2)
        },
        title: {
            fontSize: "20px",
            letterSpacing: ".3px"
        },
        rating: {
            gap: "10px"
        }
    });
});

const StyledRating = withStyles({
    iconFilled: {
        color: heartColor,
    },
    iconHover: {
        color: heartColor,
    },
})(Rating);

export default function ItineraryInfo() {
    // styles
    const classes = useStyles();

    // React
    // const criteria = useSelector(selectAll);
    const criteria = mock_criteria;

    const getDefaultValue = () => {
        const { centerPoint, date } = criteria;
        const { desc } = centerPoint;
        const dateStr = [(date.getMonth() + 1), date.getDate()].join("/");

        const defaultValue = [dateStr, desc].join(" - ");
        return defaultValue;
    };

    const src = getImgPath("like-this-itinarary.svg");
    const defaultValue = getDefaultValue();

    return (
        <div className={["itineraryInfo", classes.itineraryInfo].join(" ")}>
            <img src={src} />
            <div className={classes.contents}>
                <div className={classes.section}>
                    <div className={classes.title}>Give it a name:</div>
                    <TextField
                        id="itinerary-name"
                        // label="name"
                        defaultValue={defaultValue}
                    />
                </div>
                <div className={classes.section}>
                    <div className={classes.title}>How much do you like it?</div>
                    <StyledRating
                        className={classes.rating}
                        name="customized-color"
                        defaultValue={0}
                        getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
                        // precision={0.5}
                        // max={5}
                        icon={<HeartIcon fontSize="24px" />}
                    />
                </div>
            </div>
        </div>
    )
}