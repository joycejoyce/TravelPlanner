// MUI
import { makeStyles } from "@material-ui/styles";

// my components
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

export const DevSections = {
    utilizeGMap: {
        label: {
            english: "Utilize Google Maps APIs",
            chinese: "使用Google Maps APIs"
        },
        ref: "utilize-google-map",
        component: <UtilizeGMap />
    },
    uiDesign: {
        label: {
            english: "UI Design",
            chinese: "介面設計"
        },
        ref: "ui-design",
        component: <UIDesign />
    },
    softwareArchitecture: {
        label: {
            english: "Software Architecture",
            chinese: "軟體架構"
        },
        ref: "software-architecture",
        component: <SoftwareArchitecture />
    },
    planAlgorithm: {
        label: {
            english: "Trip Planning Algorithm",
            chinese: "旅程規劃演算法"
        },
        ref: "plan-algorithm",
        component: <PlanAlgorithm />
    }
};

export default function Development() {
    // styles
    const classes = useStyles();

    return (
        <div className={classes.development}>
            {
                Object.values(DevSections).map(section => section.component)
            }
            {/* <UtilizeGMap />
            <UIDesign />
            <SoftwareArchitecture />
            <PlanAlgorithm /> */}
        </div>
    );
}