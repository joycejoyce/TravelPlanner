// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import { initMap, hideInfoWindow } from "./mapHandler.js";
import ConfirmModal from "./ConfirmModal.js";
import { changePosition } from "./centerPointSlice.js";
import { openModal } from "./modalOpenSlice.js";
import { places } from "../../../common/map/place.js";
import Explanation from "./Explanation.js";

// React
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => {
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
        map: {
            height: "400px",
            [theme.breakpoints.up('md')]: {
                height: "515px"
            }
        },
        popupContainer: { /* JavaScript will position this div at the bottom of the popup tip. */
            cursor: "auto",
            position: "absolute",
            /* The max width of the info window. */
            width: "300px",
            height: 0
        }
    });
});

export default function CenterPoint() {
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