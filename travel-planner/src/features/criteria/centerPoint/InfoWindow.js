// MUI
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Button } from "@material-ui/core";
import { Edit as EditIcon } from '@material-ui/icons';

// my components
import { lightColors } from "../../../common/styles/colors.json";
import { secondary as secondaryFont } from "../../../common/styles/fonts.json";
import { selectDesc, selectPosition } from "./centerPointSlice.js";
import { openModal } from "./modalOpenSlice.js";
import { addClickListener, setMapToModifiable } from "./mapHandler.js"

// React
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const containerClassName = "popup-container";

const useStyles = makeStyles((theme) => ({
    popupBubble: {
        position: "absolute",
        top: "0",
        left: "0",
        transform: "translate(-50%, -100%)",
        backgroundColor: "white",
        padding: "5px",
        paddingRight: "40px",
        borderRadius: "3px",
        fontSize: "16px",
        overflowY: "auto",
        maxHeight: "200px",
        maxWidth: "300px",
        boxShadow: "0px 2px 10px 1px rgba(0, 0, 0, 0.5)",
        // color: theme.palette.primary.main,
        color: lightColors.primary,
        textAlign: "center",
        // test start
        // top: "-400px",
        // left: "400px"
        // test end
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
    },
    editIcon: {
        color: lightColors.secondary,
        position: "absolute",
        right: "0",
        top: "0"
    }
}));

export function getContainerDiv() {
    return document.querySelector("." + containerClassName);
}

export default function InfoWindow() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const desc = useSelector(selectDesc);
    const { address } = useSelector(selectPosition);
    // const desc = "test desc";
    // const address = "test address";

    const editIconClassName = "editIcon"

    const handleClickEdit = () => {
        dispatch(openModal());
        setMapToModifiable();
    }

    useEffect(() => {
        addClickListener(
            document.querySelector("." + editIconClassName),
            handleClickEdit
        );
    }, [true]);

    return (
        <div className={containerClassName}>
            <div className={classes.popupBubbleAnchor}>
                <div className={classes.popupBubble}>
                    <IconButton
                        className={editIconClassName + " " + classes.editIcon}
                    >
                        <EditIcon />
                    </IconButton>
                    <div className={classes.desc}>{desc}</div>
                    <div className={classes.address}>{address}</div>
                </div>
            </div>
        </div>
    )
}

