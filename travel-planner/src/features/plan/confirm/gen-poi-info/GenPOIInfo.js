// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Edit as EditIcon } from "@material-ui/icons";

// my components
import { selectPOIData } from "../poiDataSlice.js";
import AccorndionCtrlBtn from "./AccorndionCtrlBtn.js";
import POIAccordion from "./POIAccordion.js";
import { primary as primaryFont } from "../../../../common/styles/fonts.json";

// React
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { POIName } from "../../criteria/POIs.js";

const useStyles = makeStyles((theme) => {
    return ({
        root: {
            "& *": {
                letterSpacing: ".3px"
            }
        },
        modifyBtn: {
            fontFamily: primaryFont,
            float: "right",
            marginTop: "3px"
        }
    });
});

function GenPOIInfo({ handleClickModify }) {
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
    const poiDatas = useSelector(selectPOIData);

    // ctrl
    const handleClickAcc = (poiName) => {
        const newValue = !expanded[poiName];
        setExpanded({ ...expanded, [poiName]: newValue });
    };

    return (
        <div className={["genPOIInfo", classes.root].join(" ")}>
            <AccorndionCtrlBtn
                ctrl={{ expanded, setExpanded }}
            />
            {
                Object.entries(poiDatas).map(([poiName, poiData]) => {
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
            <Button
                className={classes.modifyBtn}
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleClickModify}
            >
                modify criteria
            </Button>
        </div>
    );
}

export default GenPOIInfo;