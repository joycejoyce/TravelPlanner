// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Edit as EditIcon } from "@material-ui/icons";

// my components
import { selectPOIData } from "../poiDataSlice.js";
import { primary as primaryFont } from "../../../../common/styles/fonts.json";
import ErrMsg from "../../../../common/components/ErrMsg.js";
import { ItineraryFieldName, selectErrMsg } from "../validate-itinerary/validateItinerarySlice.js";

// React
import React from "react";
import { useSelector } from "react-redux";
import POIDisplayPart from "./POIDisplayPart.js";

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
    
    // data
    const poiDatas = useSelector(selectPOIData);
    const errMsg = useSelector(selectErrMsg);

    return (
        <div className={["genPOIInfo", classes.root].join(" ")}>
            <ErrMsg errMsg={errMsg[ItineraryFieldName.poiNumber]} />
            <POIDisplayPart
                poiDatas={poiDatas}
            />
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