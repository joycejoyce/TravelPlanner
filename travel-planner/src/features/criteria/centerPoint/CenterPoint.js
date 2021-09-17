// MUI
import { makeStyles } from "@material-ui/core/styles";
import { CenterFocusStrong as CenterIcon } from '@material-ui/icons';

// my components
import { lightColors, darkColors } from "../../../common/styles/colors.json";
import { initMap, hideInfoWindow } from "./mapHandler.js";
import ConfirmModal from "./ConfirmModal.js";
import { changePosition } from "./centerPointSlice.js";
import { openModal } from "./modalOpenSlice.js";
import { places } from "../../../common/map/place.js";

// React
import { useEffect } from "react";
import { useDispatch } from "react-redux";

let isDarkMode = false;

const useStyles = makeStyles((theme) => {
    isDarkMode = theme.palette.type === "dark";
    const palette = isDarkMode ? darkColors : lightColors;

    return ({
        centerPoint: {
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            "& > *": {
                width: "85vw",
                [theme.breakpoints.up('md')]: {
                    width: "70vw"
                },
                minWidth: "380px",
                maxWidth: "900px"
            }
        },
        explanation: {
            borderRadius: "3px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            color: palette.primary,
            background: palette.primaryBK
        },
        map: {
            height: "400px",
            [theme.breakpoints.up('md')]: {
                height: "515px"
            }
        },
        popupContainer: { /* JavaScript will position this div at the bottom of the popup tip. */
            cursor: "auto",
            height: 0,
            position: "absolute",
            /* The max width of the info window. */
            width: "200px"
        }
    });
});

function Explanation() {
    const classes = useStyles();

    return (
        <div className={"explanation " + classes.explanation}>
            <CenterIcon />
            <div className="expText">Choose a center point by tapping on the map</div>
        </div>
    )
}

export default function CenterPoint(centerPointCtrl) {
    const classes = useStyles();

    const mapName = "centerPointMap";
    const mapProps = {
        center: places.taiwan,
        id: mapName,
        zoom: 2
    };
    
    const infoWindowProps = {
        id: [mapName, "infoWindow"].join("_")
    }

    const dispatch = useDispatch();

    const reduxCtrl = {
        dispatch,
        openModal,
        changePosition
    }    

    useEffect(async () => {
        await initMap(mapProps, reduxCtrl, infoWindowProps);
        hideInfoWindow();
    }, [true]);

    return (
        <div className={"centerPoint " + classes.centerPoint}>
            <Explanation />
            <div id={mapProps.id} className={classes.map}></div>
            <div 
                id={infoWindowProps.id}
                className={classes.popupContainer}
                style={{display: "none"}}
            ></div>
            <ConfirmModal />
        </div>
    );
}