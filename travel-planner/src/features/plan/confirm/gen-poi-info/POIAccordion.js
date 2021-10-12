// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Accordion } from "@material-ui/core";

// my components
import POISummary from "./POISummary.js";
import POIDetail from "./POIDetail.js";

const useStyles = makeStyles((theme) => {
    return ({
        accordion: {
            width: "390px"
        }
    });
});

export default function POIAccordion({ expanded, handleClick, poiName, poiData }) {
    const classes = useStyles();

    return (
        <Accordion
            className={classes.accordion}
            expanded={expanded}
            onClick={() => handleClick(poiName)}
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
};