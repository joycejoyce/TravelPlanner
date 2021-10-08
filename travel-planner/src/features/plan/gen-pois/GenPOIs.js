// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import getPOIData from "./poiDataHandler.js";
import { CriteriaName, selectAll } from "../criteria/criteriaSlice.js";
import { getStyles_mapContainer, getStyles_map } from "../../../common/styles/styles.js";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => {
    const styles_mapContainer = getStyles_mapContainer(theme);
    const styles_map = getStyles_map(theme);

    return ({
        mapSection: {
            ...styles_mapContainer
        },
        contents: {
            // background: "yellow"
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        map: {
            ...styles_map
        }
    });
});

export default function GenPOIs() {
    // styles
    const classes = useStyles();
    const rootClassName = ["gen-pois", classes.genPOIs].join(" ");

    // Redux
    const dispatch = useDispatch();
    const criteria = useSelector(selectAll);

    // map
    const mapName = "modifyPOIMap";
    const mapProps = {
        // center: criteria[CriteriaName.centerPoint].position,
        center: { lat: 24.810059549453758, lng: 120.97512116891903 }, //Big City
        id: mapName,
        zoom: 15
    };

    useEffect(() => {
        async function doGetPOIData() {
            const reduxCtrl = {
                dispatch
            };

            const poiData = await getPOIData(mapProps, reduxCtrl, criteria);
        }
        doGetPOIData();
    }, []);

    return (
        <div className={rootClassName}>
            <div className={["contents", classes.contents].join(" ")}>
                <h1>GenPOIs</h1>
                <div className={"mapSection " + classes.mapSection}>
                    <div id={mapProps.id} className={classes.map}></div>
                </div>
            </div>
        </div>
    );
}