// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { CenterFocusStrong as CenterIcon } from '@material-ui/icons';

// my components
import { lightColors, darkColors } from "../../../colors.json";
import doMapOperations, { MapOperations, MapNames } from "../../map/Map.js";
import { places } from "../../map/Place.js";
import ConfirmModal from "./ConfirmModal.js";
import addMapListener, { addInfoWindow } from "../../mapHandler/MapHandler_CenterPoint.js";

// others
import { useState, useEffect } from "react";

let isDarkMode = false;

const useStyles = makeStyles((theme) => {
    isDarkMode = theme.palette.type === "dark";
    const palette = isDarkMode ? darkColors : lightColors;

    return ({
        centerPoint: {
            transform: "translateX(-10px)",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            // height: "50vh"
        },
        explanation: {
            borderRadius: "3px",
            width: "365px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            color: palette.primary,
            background: palette.primaryBK
        },
        map: {
            // height: "100%"
            height: "300px"
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

    const mapProps = {
        action: MapOperations.GetMap,
        center: places.myHome,
        mapName: MapNames.CenterPointMap,
        zoom: 1
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [mapCtrl, setMapCtrl] = useState(null);

    useEffect(async () => {
        const newMapCtrl = await doMapOperations(mapProps);
        const {google, map} = newMapCtrl;
        addMapListener(google, map, setModalOpen, centerPointCtrl);

        setMapCtrl(newMapCtrl);
    }, [true]);

    const mapContentId = mapProps.mapName + "_" + "content";
    const mapDivSelector = "#" + mapContentId;

    return (
        <div className={"centerPoint " + classes.centerPoint}>
            <Explanation />
            <div className={mapProps.mapName + " " + classes.map}></div>
            <div id={mapContentId}></div>
            <Button id="openModal" onClick={() => setModalOpen(true)}>Open modal</Button>
            <ConfirmModal
                open={modalOpen}
                setOpen={setModalOpen}
                ctrl={centerPointCtrl}
                mapCtrl={{...mapCtrl, mapDivSelector}}
            />
        </div>
    );
}