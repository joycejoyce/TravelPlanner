// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Accordion, AccordionDetails } from '@material-ui/core';

// my components
import { selectPOIData } from "../poiDataSlice.js";
import POISummary from "./POISummary.js";
import POIDetail from "./POIDetail.js";

// React
import { useState } from "react";
import { useSelector } from "react-redux";
import { POIName } from "../../criteria/POIs.js";

const useStyles = makeStyles((theme) => {
    return ({
        root: {
            "& *": {
                letterSpacing: ".3px"
            }
        },
        accordion: {
            width: "390px"
        }
    });
});

export default function GenPOIInfo() {
    // styles
    const classes = useStyles();

    // React
    // const [expanded, setExpanded] = useState(false);
    const [expanded, setExpanded] = useState(POIName.poi1);
    const poiDatas = useSelector(selectPOIData);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={["genPOIInfo", classes.root].join(" ")}>
            {
                Object.entries(poiDatas).map(([poiName, poiData]) => {
                    return (
                        <Accordion
                            className={classes.accordion}
                            expanded={expanded === poiName}
                            onChange={handleChange(poiName)}
                        >
                            <POISummary
                                poiName={poiName}
                                poiData={poiData}
                            />
                            <POIDetail
                                poiData={poiData}
                            />
                        </Accordion>
                    );
                })
            }
        </div>
    );
}