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

export default function POIAccordion({ expanded, handleClick, poiName, poiData, isNotFound }) {
    const classes = useStyles();

    if (isNotFound) {
        return (
            <Accordion
                className={classes.accordion}
                expanded={expanded}
            >
                <POISummary
                    poiName={poiName}
                    isNotFound={true}
                />
            </Accordion>
        );
    }

    return (
        <Accordion
            className={classes.accordion}
            expanded={expanded}
        >
            <POISummary
                poiName={poiName}
                poiData={poiData}
                handleClick={handleClick}
            />
            <POIDetail
                poiData={poiData}
            />
        </Accordion>
    );
};