// MUI
import { makeStyles } from "@material-ui/core/styles";
import { AccordionDetails } from "@material-ui/core";

// my components
import MapIcon from "../../../../common/components/MapIcon.js";

const useStyles = makeStyles((theme) => {
    return ({
        poiDetail: {

        }
    });
});

export default function POIDetail({ poiData }) {
    const classes = useStyles();

    return (
        <AccordionDetails>
            test
        </AccordionDetails>
    );
}