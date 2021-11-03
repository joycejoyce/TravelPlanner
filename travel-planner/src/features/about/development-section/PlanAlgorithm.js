// MUI
import { makeStyles } from "@material-ui/styles";

// my components
import SubTitle from "../components/SubTitle.js";
import { selectLanguage } from "../languageSlice.js";
import { DevSections } from "./Development.js";

// React
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => {
    return ({
        algoImg: {
            width: "80vw",
            minWidth: "600px",
            maxWidth: "900px"
        }
    });
});

export default function PlanAlgorithm() {
    // styles
    const classes = useStyles();

    // data
    const language = useSelector(selectLanguage);

    const sectionData = DevSections.planAlgorithm;
    const title = sectionData.label[language];
    const id = sectionData.ref;

    return (
        <div id={id} className={classes.planAlgorithm}>
            <SubTitle text={title} />
            <img
                className={classes.algoImg}
                src="/img/algorithm.svg"
            />
        </div>
    );
}