// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import { lightColors } from "../../../common/styles/colors.json";
import { secondary as secondaryFont } from "../../../common/styles/fonts.json";
import { selectDesc, selectPosition } from "./centerPointSlice.js";

// React
import { useSelector } from "react-redux";

const containerClassName = "popup-container";

const useStyles = makeStyles((theme) => ({
    popupBubble: {
        position: "absolute",
        top: "0",
        left: "0",
        transform: "translate(-50%, -100%)",
        backgroundColor: "white",
        padding: "5px",
        borderRadius: "3px",
        fontSize: "16px",
        overflowY: "auto",
        maxHeight: "200px",
        maxWidth: "300px",
        boxShadow: "0px 2px 10px 1px rgba(0, 0, 0, 0.5)",
        // color: theme.palette.primary.main,
        color: lightColors.primary,
        textAlign: "center"
    },
    popupBubbleAnchor: { /* The parent of the bubble. A zero-height div at the top of the tip. */
        position: "absolute",
        width: "100%",
        bottom: "8px",
        left: "0",
        "&::after": { /* This element draws the tip. */
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            /* Center the tip horizontally. */
            transform: "translate(-50%, 0)",
            /* The tip is a https://css-tricks.com/snippets/css/css-triangle/ */
            width: 0,
            height: 0,
            /* The tip is 8px high, and 12px wide. */
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderTop: "8px solid white",
        }
    },
    popupContainer: { /* JavaScript will position this div at the bottom of the popup tip. */
        cursor: "auto",
        height: 0,
        position: "absolute",
        /* The max width of the info window. */
        width: "200px"
    },
    desc: {
        fontFamily: secondaryFont,
        fontSize: "18px",
        margin: "10px 0",
        fontWeight: "bold"
    }
}));

export function getContainerDiv() {
    return document.querySelector("." + containerClassName);
}

export default function InfoWindow() {
    const classes = useStyles();

    const desc = useSelector(selectDesc);
    const { address } = useSelector(selectPosition);

    return (
        <div className={containerClassName}>
            <div className={classes.popupBubbleAnchor}>
                <div className={classes.popupBubble}>
                    <div className={classes.desc}>{desc}</div>
                    <div className={classes.address}>{address}</div>
                </div>
            </div>
        </div>
    )
}

