// MUI
import { makeStyles } from "@material-ui/styles";

// my components
import { SectionItem } from "../sections/Sections.js";
import UtilizeGMap from "./UtilizeGMap.js";
import UIDesign from "./UIDesign.js";
import SoftwareArchitecture from "./SoftwareArchitecture.js";
import PlanAlgorithm from "./PlanAlgorithm.js";

const useStyles = makeStyles((theme) => {
    return ({
        development: {

        }
    });
});

export default function Development() {
    // styles
    const classes = useStyles();

    return (
        <div id={SectionItem.development.ref} className={classes.development}>
            <UtilizeGMap />
            <UIDesign />
            <SoftwareArchitecture />
            <PlanAlgorithm />
        </div>
    );
}