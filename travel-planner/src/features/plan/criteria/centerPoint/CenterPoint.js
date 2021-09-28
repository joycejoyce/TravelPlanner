// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import { initMap, hideInfoWindow, setMapToReadOnly } from "./mapHandler.js";
import ConfirmModal from "./ConfirmModal.js";
import { changePosition, selectDesc, selectPosition } from "../criteriaSlice.js";
import { openModal } from "./modalOpenSlice.js";
import { places } from "../../../../common/map/place.js";
import Explanation from "./Explanation.js";

// React
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => {
    return ({
        centerPoint: {
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            "& > *:not(.MuiButtonBase-root)": {
                width: "85vw",
                [theme.breakpoints.up('md')]: {
                    width: "70vw"
                },
                minWidth: "380px",
                maxWidth: "900px"
            },
            transform: "translateX(-32px)"
        },
        map: {
            height: "450px",
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
        },
        nextBtn: {
            width: "100px",
            fontSize: "16px"
        }
    });
});

export default function CenterPoint() {
    const classes = useStyles();

    // Redux
    const dispatch = useDispatch();
    const desc = useSelector(selectDesc);
    const position = useSelector(selectPosition);
    const isPosSet = position.latLng ? true : false;

    // map
    const mapName = "centerPointMap";
    const mapProps = {
        center: isPosSet ? position.latLng : places.taiwan,
        id: mapName,
        zoom: 2
    };
    const infoWindowProps = {
        id: [mapName, "infoWindow"].join("_")
    };

    useEffect(() => {
        async function doInitMap() {
            console.log("doInitMap");
            const reduxCtrl = {
                dispatch,
                openModal,
                changePosition
            };
            await initMap(mapProps, reduxCtrl, infoWindowProps);
            if (desc) {
                setMapToReadOnly();
            }
            else {
                hideInfoWindow();
            }
        }
        doInitMap();
    }, []);

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