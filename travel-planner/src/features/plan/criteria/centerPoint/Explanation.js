// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Edit as EditIcon } from '@material-ui/icons';
import { CenterFocusStrong as CenterIcon } from '@material-ui/icons';

// React
import { useSelector } from "react-redux";

// my components
import { selectDesc } from "../criteriaSlice.js";
import { lightColors, darkColors } from "../../../../common/styles/colors.json";

const useStyles = makeStyles((theme) => {
    const isDarkMode = theme.palette.type === "dark";
    const palette = isDarkMode ? darkColors : lightColors;

    return ({
        explanation: {
            borderRadius: "3px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            color: palette.primary,
            background: palette.primaryBK,
            "& .expText": {
                fontSize: "14px"
            }
        },
        editIcon: {
            color: palette.secondary,
            margin: "0 3px"
        },
        expText2: {
            display: "flex",
            alignItems: "center"
        }
    });
});



export default function Explanation() {
    const classes = useStyles();
    
    const ExpText1 = () => {
        return (
            <div className={classes.expText1}>
                Choose a center point by tapping on the map
            </div>
        )
    }

    const ExpText2 = () => {
        return (
            <div className={classes.expText2}>
                Click <EditIcon className={classes.editIcon} /> to modify the center point
            </div>
        )
    }

    const desc = useSelector(selectDesc);
    const explanation = desc ?
        (<ExpText2 />) :
        (<ExpText1 />)
    ;

    return (
        <div className={"explanation " + classes.explanation}>
            <CenterIcon />
            <div className="expText">{explanation}</div>
        </div>
    )
}