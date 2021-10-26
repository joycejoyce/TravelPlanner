// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import AccorndionCtrlBtn from "./AccorndionCtrlBtn";
import POIAccordion from "./POIAccordion";
import POISummary from "./POISummary.js";
import { POIName } from "../../criteria/POIs";

// React
import { useState } from "react";

const useStyles = makeStyles((theme) => {
    return ({
    });
});

export default function POIDisplayPart({ poiDatas, poiCriteria }) {
    // styles
    const classes = useStyles();

    // React
    let got1Expanded = false;
    const [expanded, setExpanded] = useState(
        Object.entries(poiCriteria).reduce((accu, [poiName, checked]) => {
            if (!got1Expanded && checked && poiDatas[poiName]) {
                got1Expanded = true;
                accu[poiName] = true;
            }
            else {
                accu[poiName] = false;
            }
            return accu;
        }, {})
    );

    // ctrl
    const handleClickAcc = (poiName) => {
        const newValue = !expanded[poiName];
        setExpanded({ ...expanded, [poiName]: newValue });
    };

    return (
        <div>
            <AccorndionCtrlBtn
                ctrl={{ expanded, setExpanded }}
            />
            {
                Object.entries(poiCriteria).map(([poiName, hasCriteriaPOI]) => {
                    if (!hasCriteriaPOI) {
                        return <></>;
                    }

                    if (!poiDatas[poiName]) {
                        return (
                            <POIAccordion
                                key={poiName}
                                expanded={false}
                                poiName={poiName}
                                isNotFound={true}
                            />
                        )
                    }

                    return (
                        <POIAccordion
                            key={poiName}
                            expanded={expanded[poiName]}
                            handleClick={handleClickAcc}
                            poiName={poiName}
                            poiData={poiDatas[poiName]}
                        />
                    );
                })
            }
            {/* {
                Object.entries(poiDatas).map(([poiName, poiData]) => {
                    if (!poiData) {
                        return <></>;
                    }

                    return (
                        <POIAccordion
                            key={poiName}
                            expanded={expanded[poiName]}
                            handleClick={handleClickAcc}
                            poiName={poiName}
                            poiData={poiData}
                        />
                    );
                })
            } */}
        </div>
    );
}