// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import AccorndionCtrlBtn from "./AccorndionCtrlBtn";
import POIAccordion from "./POIAccordion";
import { POIName } from "../../criteria/POIs";

// React
import { useState } from "react";

const useStyles = makeStyles((theme) => {
    return ({
    });
});

export default function POIDisplayPart({poiDatas}) {
    // styles
    const classes = useStyles();

    // React
    // const [expanded, setExpanded] = useState(false);
    const [expanded, setExpanded] = useState(
        Object.keys(POIName).reduce((accu, poiName) => {
            if (poiName === POIName.breakfast) {
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
            }
        </div>
    );
}