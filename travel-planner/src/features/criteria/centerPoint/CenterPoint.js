// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { CenterFocusStrong as CenterIcon } from '@material-ui/icons';

// my components
import { lightColors, darkColors } from "../../../common/styles/colors.json";
import doMapOperations, { MapOperations, MapNames } from "../../../common/map/Map.js";
import { places } from "../../../common/map/Place.js";
import ConfirmModal from "./ConfirmModal.js";
import addMapListener, { addInfoWindow } from "./mapHandler.js";
import { changePosition } from "./centerPointSlice.js";

// React
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

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

    const dispatch = useDispatch();

    useEffect(async () => {
        const newMapCtrl = await doMapOperations(mapProps);
        const {google, map} = newMapCtrl;

        const centerPointCtrl = {
            dispatch,
            changePosition
        };
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
                mapCtrl={{...mapCtrl, mapDivSelector}}
            />
        </div>
    );
}