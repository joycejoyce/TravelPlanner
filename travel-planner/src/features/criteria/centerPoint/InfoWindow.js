// MUI
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { Edit as EditIcon } from '@material-ui/icons';

// my components
import { lightColors } from "../../../common/styles/colors.json";
import { secondary as secondaryFont } from "../../../common/styles/fonts.json";
import { selectDesc, selectPosition } from "./centerPointSlice.js";
import { openModal } from "./modalOpenSlice.js";
import { addClickDomListener } from "./mapHandler.js";

// React
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
    popupBubble: {
        position: "absolute",
        top: "0",
        left: "0",
        transform: "translate(-50%, -100%)",
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "3px",
        fontSize: "16px",
        overflowY: "auto",
        maxHeight: "180px",
        maxWidth: "300px",
        boxShadow: "0px 2px 10px 1px rgba(0, 0, 0, 0.5)",
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
            top: "-1px",
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
    desc: {
        fontFamily: secondaryFont,
        fontSize: "18px",
        margin: "10px 0",
        fontWeight: "bold",
        minWidth: "150px",
        maxWidth: "220px"
    },
    editIcon: {
        color: lightColors.secondary,
        background: lightColors.primary,
        position: "absolute",
        right: "3px",
        top: "3px"
    },
    // titlePart: {
    //     display: "flex"
    // }
}));

export default function InfoWindow({ idPrefix }) {
    const classes = useStyles();

    const dispatch = useDispatch();

    const desc = useSelector(selectDesc);
    const { address } = useSelector(selectPosition);
    // const desc = "test desc";
    // const address = "test address";

    const editIconId = [ idPrefix, "editIcon" ].join("_");

    const handleClickEdit = () => {
        dispatch(openModal());
    }

    useEffect(() => {
        addClickDomListener(
            document.getElementById(editIconId),
            handleClickEdit
        );
    }, [true]);

    const infoWindowId = [ idPrefix, "content" ].join("_");

    return (
        <div
            id={infoWindowId}
            className={classes.popupBubbleAnchor}
        >
            <div className={classes.popupBubble}>
                <div className={classes.titlePart}>
                    <IconButton
                        id={editIconId}
                        className={classes.editIcon}
                    >
                        <EditIcon />
                    </IconButton>
                    <div className={classes.desc}>{desc}</div>
                </div>
                <div className={classes.address}>{address}</div>
            </div>
        </div>
    );
}

