// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import getPOIData, { getPOIData_mock, addMarkers, initMap, getIconUrl } from "./poiDataHandler.js";
import { CriteriaName, selectAll, resetCriteria } from "../criteria/criteriaSlice.js";
import { getStyles_mapContainer, getStyles_map } from "../../../common/styles/styles.js";
import { changePOI, selectPOIData } from "./poiDataSlice.js";
import { POIName } from "../criteria/POIs.js";
import { secondary as secondaryFont } from "../../../common/styles/fonts.json";
import { URL as RootURL } from "../../../app/InnerApp.js";
import { openModal } from "./cancel-modal/modalOpenSlice.js";
import GenPOIInfo from "./gen-poi-info/GenPOIInfo.js";
import ItineraryInfo from "./ItineraryInfo.js";
import CancelModal from "./cancel-modal/CancelModal.js";
import { StepNames } from "../PlanStepper.js";
import useStep from "../../../common/util/useStep.js";

// React
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ButtonSection from "../buttonSection/ButtonSection.js";

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
            paddingBottom: theme.spacing(6)
        },
        map: {
            ...styles_map
        },
        centerPointDesc: {
            marginTop: theme.spacing(1),
            width: "380px",
            display: "flex",
            gap: theme.spacing(1),
            alignItems: "center",
            "& > .title": {
                width: "40px",
                textAlign: "center",
                fontSize: "12px",
            },
            "& > .desc": {
                fontFamily: secondaryFont,
                letterSpacing: ".5px"
            },
            "& > .title,.address": {
                letterSpacing: ".3px"
            },
            "& .address": {
                fontSize: "14px"
            }
        }
    });
});

function CenterPointDesc({ data }) {
    // styles
    const classes = useStyles();

    const { desc, position } = data;
    const { address } = position

    return (
        <div className={classes.centerPointDesc}>
            <img src={getIconUrl("center")} width="32px" />
            {/* <div className="title">Center Point</div> */}
            <div className="desc">{desc}</div>
            <div className="address">{address}</div>
        </div>
    )
}

export default function Confirm({ setAnimationKey }) {
    // styles
    const classes = useStyles();
    const rootClassName = ["confirm", classes.genPOIs].join(" ");

    // React
    const dispatch = useDispatch();
    const criteria = useSelector(selectAll);
    const centerPoint = criteria[CriteriaName.centerPoint];
    // const centerPoint = {
    //     desc: "test desc test desc test desctest desc test desc test desc",
    //     position: {
    //         latLng: { lat: 25.04877825798245, lng: 121.51770848147402 },
    //         address: "test address"
    //     }
    // };
    const history = useHistory();

    // map
    const mapName = "modifyPOIMap";
    const mapProps = {
        center: criteria[CriteriaName.centerPoint].position,
        // center: { lat: 24.810059549453758, lng: 120.97512116891903 }, //Big City
        // center: { lat: 25.042271471648643, lng: 121.50680555326282}, // 西門紅樓
        id: mapName,
        zoom: 10
    };

    // ctrl
    const doChangePOI = (poiData) => {
        dispatch(changePOI(poiData));
    };
    const handleClickModify = () => {
        setAnimationKey();
        history.push(`/plan/${URL.criteria}`);
    };
    const handleClickSave = () => {

    };
    const handleClickCancel = () => {
        dispatch(openModal());
    };
    const cancelPlan = () => {
        setAnimationKey();
        dispatch(resetCriteria());
        history.push(`/plan/${URL.criteria}`);
    };

    useEffect(() => {
        async function doGetPOIData() {
            const poiData = await getPOIData(mapProps, doChangePOI, criteria);
            
            // test start
            // await initMap(mapProps);
            // const poiData = getPOIData_mock(doChangePOI);
            // test end

            addMarkers(poiData, centerPoint.position.latLng);
        }
        doGetPOIData();
    }, []);

    useStep(StepNames.confirm);

    return (
        <div className={rootClassName}>
            <div className={["contents", classes.contents].join(" ")}>
                {/* <h1>Confirm</h1> */}
                <div className={"mapSection " + classes.mapSection}>
                    <div id={mapProps.id} className={classes.map}></div>
                    <CenterPointDesc data={centerPoint} />
                </div>
                <GenPOIInfo handleClickModify={handleClickModify} />
                <CancelModal doCancel={cancelPlan} />
                <ItineraryInfo />
                <ButtonSection
                    rightCtrl={{
                        handleClick: handleClickSave,
                        text: "Save",
                        icon: null
                    }}
                    leftCtrl={{
                        handleClick: handleClickCancel,
                        text: "Cancel",
                        icon: null
                    }}
                />
            </div>
        </div>
    );
}