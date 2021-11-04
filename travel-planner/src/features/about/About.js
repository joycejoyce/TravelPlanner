// MUI
import { makeStyles } from "@material-ui/styles";

// my components
import { RootURL } from "../../config.json";
import TableContents from "./TableContents.js";
import LanguageSelect from "./LanguageSelect.js";
import Sections from "./sections/Sections.js";
import Line from "./Line.js";
import GoTopButton from "./GoTopButton.js";
import { getStyles_pageTitle, getStyles_rootSubPages, getStyles_routingPage } from "../../common/styles/styles.js";
import useChangeNavIdx from "../../common/util/useChangeNavIdx.js";
import useQuotaExceeded from "../../common/util/useQuotaExceeded.js";

const useStyles = makeStyles((theme) => {
    const animationPartStyles = getStyles_routingPage();
    const titleStyles = getStyles_pageTitle(theme);
    const pageStyles = getStyles_rootSubPages(theme);

    return ({
        animationPart: {
            ...animationPartStyles,
            ...pageStyles,
        },
        contents: {
            textAlign: "center"
        },
        title: {
            ...titleStyles
        }
    });
});

export default function About({ setAnimationKey }) {
    // styles
    const classes = useStyles();

    // initial actions
    useChangeNavIdx(RootURL.about);
    useQuotaExceeded(false, setAnimationKey);

    return (
        <div>
            <GoTopButton />
            <div className={classes.animationPart}>
                <div className={classes.about}>
                    <div className={["contents", classes.contents].join(" ")}>
                        <div className={classes.title}>About “Itinerary”</div>
                        <LanguageSelect />
                        <TableContents />
                        <Line />
                        <Sections />
                    </div>
                </div>
            </div>
        </div>
    );
}