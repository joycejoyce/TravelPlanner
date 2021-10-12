// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Accordion, Button } from '@material-ui/core';
import { UnfoldMoreSharp as ExpandIcon, UnfoldLessSharp as CollapseIcon } from "@material-ui/icons";

// my components
import { selectPOIData } from "../poiDataSlice.js";
import POISummary from "./POISummary.js";
import POIDetail from "./POIDetail.js";
import { primary as primaryFont } from "../../../../common/styles/fonts.json";

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
        },
        ctrlBtn: {
            fontFamily: primaryFont,
            margin: "0 0 0 auto",
            display: "flex"
        }
    });
});

function AccorndionCtrlBtn({ ctrl }) {
    const classes = useStyles();
    const { expanded, setExpanded } = ctrl;
    const allPOIs = Object.keys(POIName);
    const expandAll = expanded.length === allPOIs.length; // current status
    const icon = expandAll ? (<CollapseIcon />) : (<ExpandIcon />);
    const text = expandAll ? "Collapse all" : "Expand all";
    const handleClick = () => {
        if (expandAll) {
            setExpanded([]);
        }
        else {
            setExpanded(allPOIs);
        }
    };

    return (
        <Button
            className={classes.ctrlBtn}
            endIcon={icon}
            onClick={handleClick}
        >
            {text}
        </Button>
    )
}

export default function GenPOIInfo() {
    // styles
    const classes = useStyles();

    // React
    // const [expanded, setExpanded] = useState(false);
    const [expanded, setExpanded] = useState([POIName.poi1]);
    const poiDatas = useSelector(selectPOIData);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={["genPOIInfo", classes.root].join(" ")}>
            <AccorndionCtrlBtn ctrl={{expanded, setExpanded}} />
            {
                Object.entries(poiDatas).map(([poiName, poiData]) => {
                    return (
                        <Accordion
                            className={classes.accordion}
                            expanded={expanded.includes(poiName)}
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