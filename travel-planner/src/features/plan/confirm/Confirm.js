// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import getPOIData, { getPOIData_mock, addMarkers, initMap, resetMap } from "./poiDataHandler.js";
import { CriteriaName, selectAll, resetCriteria, changePOIs } from "../criteria/criteriaSlice.js";
import { getStyles_mapContainer, getStyles_map } from "../../../common/styles/styles.js";
import { changePOI, selectPOIData } from "./poiDataSlice.js";
import { openModal } from "./cancel-modal/cancelModalSlice.js";
import GenPOIInfo from "./gen-poi-info/GenPOIInfo.js";
import ItineraryInfo from "./itinerary-info/ItineraryInfo.js";
import CancelModal from "./cancel-modal/CancelModal.js";
import { StepNames } from "../PlanStepper.js";
import useStep from "../../../common/util/useStep.js";
import { getAllItineraries, save, checkItiNumOverLimit, getFirstItiName, changeItineraries } from "../../my-itineraries/dataHandler.js";
import ButtonSection from "../buttonSection/ButtonSection.js";
import { mock_criteria } from "./mockData.js";
import { URL } from "../Plan.js";
import { ItineraryInfoFieldName, selectItineraryInfo } from "./itinerary-info/itineraryInfoSlice.js";
import { changeErrMsg } from "./validate-itinerary/validateItinerarySlice.js";
import validate from "./validate-itinerary/itineraryValidator.js";
import CenterPointDesc from "../../../common/components/CenterPointDesc.js";
import Loading from "../../../common/components/Loading.js";
import ReplaceItineraryModal from "../../my-itineraries/ReplaceItineraryModal.js";
import { changeQuota } from "../../navbar/quota/quotaSlice.js";

// React
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

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
        }
    });
});

export default function Confirm({ setAnimationKey }) {
    const isTesting = false;

    // styles
    const classes = useStyles();
    const rootClassName = ["confirm", classes.genPOIs].join(" ");

    // React
    let criteria = useSelector(selectAll);
    if (isTesting) {
        criteria = mock_criteria;
    }
    const [isOpen_replaceItiModal, setIsOpen_replaceItiModal] = useState(false);
    const [itiToReplace, setItiToReplace] = useState("");
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const poiData = useSelector(selectPOIData);
    const centerPoint = criteria[CriteriaName.centerPoint];
    const itineraryInfo = useSelector(selectItineraryInfo);
    const history = useHistory();

    // map
    const mapName = "modifyPOIMap";
    const mapProps = {
        center: criteria[CriteriaName.centerPoint].position,
        id: mapName,
        zoom: 10
    };

    // ctrl
    const closeModal_replaceIti = () => {
        setIsOpen_replaceItiModal(false);
    };
    const doChangePOI = (poiData) => {
        dispatch(changePOI(poiData));
    };
    const handleChangeItiToReplace = (e) => {
        const { value } = e.target;
        setItiToReplace(value);
    };
    const handleClickModify = () => {
        setAnimationKey();
        history.push(`/plan/${URL.criteria}`);
    };
    const goToNextPage = () => {
        setAnimationKey();
        const itineraryName = itineraryInfo[ItineraryInfoFieldName.name];
        history.push(`/plan/${URL.getItinerary}/${itineraryName}`);
    }
    const handleClickSave = () => {
        const isItiNumOverLimit = checkItiNumOverLimit();
        if (isItiNumOverLimit) {
            setItiToReplace(getFirstItiName());
            setIsOpen_replaceItiModal(true);
            return;
        }

        const doChangeErrMsg = (errMsgObj) => {
            dispatch(changeErrMsg(errMsgObj));
        };
        const hasError = validate({ poiData, itineraryInfo }, doChangeErrMsg);
        if (!hasError) {
            save(itineraryInfo, criteria, poiData);
            goToNextPage();
        }
    };
    const handleClickCancel = () => {
        dispatch(openModal());
    };
    const cancelPlan = () => {
        setAnimationKey();
        dispatch(resetCriteria());
        history.push(`/plan/${URL.criteria}`);
    };
    const replaceItinerary = () => {
        const allItineraries = getAllItineraries();
        delete allItineraries[itiToReplace];
        changeItineraries(allItineraries);
        save(itineraryInfo, criteria, poiData);
        goToNextPage();
    };
    const handleClickCenter = () => {
        const { latLng } = centerPoint.position;
        resetMap(latLng);
    };
    const doChangeQuota = (amount, source) => {
        const quotaInput = {
            amount,
            source
        };
        dispatch(changeQuota(quotaInput));
    }

    useEffect(() => {
        async function doGetPOIData() {
            const appElem = document.getElementById("app");
            if (appElem) {
                appElem.scrollTo(0,0);
            }

            let poiData = null;
            const reduxCtrl = {
                doChangePOI,
                doChangeQuota,
            }
            if (isTesting) {
                await initMap(mapProps);
                const doChangeCriteria_POIs = () => {
                    const poiCriteria = criteria[CriteriaName.pois];
                    Object.entries(poiCriteria).forEach(([poiName, hasPOI]) => {
                        dispatch(changePOIs({ name: poiName, checked: hasPOI }));
                    });
                };
                doChangeCriteria_POIs();
                poiData = getPOIData_mock(reduxCtrl);
                // await new Promise(r => setTimeout(r, 3000));
            }
            else {
                poiData = await getPOIData(mapProps, criteria, reduxCtrl);
            }

            addMarkers(poiData, centerPoint.position.latLng);
            setLoaded(true);
        }
        
        doGetPOIData();
    }, []);

    useStep(StepNames.confirm);

    return (
        <div id="confirm" className={rootClassName}>
            <div className={["contents", classes.contents].join(" ")}>
                <div className={"mapSection " + classes.mapSection}>
                    <div id={mapProps.id} className={classes.map}></div>
                    {
                        loaded ?
                        <CenterPointDesc
                            data={centerPoint}
                            handleClick={handleClickCenter}
                        /> :
                        <></>
                    }
                </div>
                {
                    loaded ?
                    <>
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
                        <ReplaceItineraryModal
                            ctrl={{
                                isOpen: isOpen_replaceItiModal,
                                closeModal: closeModal_replaceIti
                            }}
                            replaceItinerary={replaceItinerary}
                            itiToReplaceCtrl={{
                                value: itiToReplace,
                                onChange: handleChangeItiToReplace
                            }}
                        />
                    </> : <Loading />
                }
            </div>
        </div>
    );
}