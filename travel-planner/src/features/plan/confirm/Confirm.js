// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import getPOIData, { getPOIData_mock, addMarkers, initMap } from "./poiDataHandler.js";
import { CriteriaName, selectAll } from "../criteria/criteriaSlice.js";
import { getStyles_mapContainer, getStyles_map } from "../../../common/styles/styles.js";
import { changePOI, selectPOIData } from "./poiDataSlice.js";
import GenPOIInfo from "./gen-poi-info/GenPOIInfo.js";
import { POIName } from "../criteria/POIs.js";

// React
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

export default function Confirm() {
    // styles
    const classes = useStyles();
    const rootClassName = ["gen-itinerary", classes.genPOIs].join(" ");

    // React
    const dispatch = useDispatch();
    const criteria = useSelector(selectAll);
    // const poiDatas = useSelector(selectPOIData);

    // map
    const mapName = "modifyPOIMap";
    const mapProps = {
        // center: criteria[CriteriaName.centerPoint].position,
        // center: { lat: 24.810059549453758, lng: 120.97512116891903 }, //Big City
        center: { lat: 25.042271471648643, lng: 121.50680555326282}, // 西門紅樓
        id: mapName,
        zoom: 13
    };

    const doChangePOI = (poiData) => {
        dispatch(changePOI(poiData));
    };

    useEffect(() => {
        async function doGetPOIData() {
            // const reduxCtrl = {
            //     dispatch,
            //     changePOI
            // };

            // const poiData = await getPOIData(mapProps, doChangePOI, criteria);
            await initMap(mapProps);
            const poiData = getPOIData_mock(doChangePOI);
            addMarkers(poiData);
        }
        doGetPOIData();
    }, []);

    return (
        <div className={rootClassName}>
            <div className={["contents", classes.contents].join(" ")}>
                {/* <h1>Confirm</h1> */}
                <div className={"mapSection " + classes.mapSection}>
                    <div id={mapProps.id} className={classes.map}></div>
                </div>
                {/* {
                    Object.entries(poiDatas).map(([poiName, poiData]) => {
                        return (<div>{poiName}</div>);
                    })
                } */}
                <GenPOIInfo />
            </div>
        </div>
    );
}