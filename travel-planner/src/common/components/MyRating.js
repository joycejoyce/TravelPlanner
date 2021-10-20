// MUI
import { withStyles } from "@material-ui/core/styles";
import { Rating } from "@material-ui/lab";

// my components
import { err as heartColor } from "../styles/colors.json";

const StyledRating = withStyles({
    iconFilled: {
        color: heartColor,
    },
    iconHover: {
        color: heartColor,
    },
})(Rating);

export default StyledRating;