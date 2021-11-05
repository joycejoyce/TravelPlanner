// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import { initMap, hideInfoWindow, setMapToReadOnly } from "./mapHandler.js";
import ConfirmModal from "./CenterPointModal.js";
import { changePosition, selectDesc, selectPosition } from "../criteriaSlice.js";
import { openModal } from "./centerPointModalSlice.js";
import { openModal as openModal_exceedQuota } from "../../../navbar/quota/exceedQuotaModalSlice.js";
import { places } from "../../../../common/map/place.js";
import Explanation from "./Explanation.js";
import { getStyles_mapContainer, getStyles_map } from "../../../../common/styles/styles.js";
import { changeQuota } from "../../../navbar/quota/quotaSlice.js";

// React
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => {
    const styles_mapContainer = getStyles_mapContainer(theme);
    const styles_map = getStyles_map(theme);

    return ({
        centerPoint: {
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            ...styles_mapContainer,
            transform: "translateX(-32px)"
        },
        map: {
            ...styles_map
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

function Map({ id }) {
    const classes = useStyles();

    const dispatch = useDispatch();

    const quotaInput = {
        amount: 1,
        source: "initMap"
    };
    dispatch(changeQuota(quotaInput));

    return (
        <div id={id} className={classes.map}></div>
    );
}

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
        function checkIsGMapAvailable() {
            const imgElems = document.getElementsByTagName("img");
            if (imgElems) {
                for (let elem of imgElems) {
                    const { src } = elem;
                    if (src.includes("google_gray.svg")) {
                        dispatch(openModal_exceedQuota());
                    }
                }
            }
        }
        async function doInitMap() {
            console.log("doInitMap_CenterPoint");
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
            setTimeout(() => {
                checkIsGMapAvailable();
            }, 1000);
        }
        doInitMap();

    }, []);

    return (
        <div className={"centerPoint " + classes.centerPoint}>
            <Explanation />
            <Map id={mapProps.id} />
            {/* <div id={mapProps.id} className={classes.map}></div> */}
            <div
                id={infoWindowProps.id}
                className={classes.popupContainer}
                style={{ display: "none" }}
            ></div>
            <ConfirmModal />
        </div>
    );
}