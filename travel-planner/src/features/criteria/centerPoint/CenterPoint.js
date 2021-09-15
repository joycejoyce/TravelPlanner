// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { CenterFocusStrong as CenterIcon } from '@material-ui/icons';

// my components
import { lightColors, darkColors } from "../../../common/styles/colors.json";
import { setupMap, addMapListener } from "./mapHandler.js";
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
                width: "90vw",
                [theme.breakpoints.up('md')]: {
                    width: "70vw"
                },
                minWidth: "395px",
                maxWidth: "990px"
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
        infoWindowId: mapName + "_infoWindow",
        zoom: 1
    };

    const dispatch = useDispatch();

    useEffect(async () => {
        await setupMap(mapProps);
        addMapListener(dispatch, openModal, changePosition);
    }, [true]);

    return (
        <div className={"centerPoint " + classes.centerPoint}>
            <Explanation />
            <div id={mapProps.id} className={classes.map}></div>
            <div id={mapProps.infoWindowId}></div>
            {/* <Button id="openModal" onClick={() => setModalOpen(true)}>Open modal</Button> */}
            <ConfirmModal />
        </div>
    );
}