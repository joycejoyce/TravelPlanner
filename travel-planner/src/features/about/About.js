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
import { selectIdx, changeIdx } from "../navbar/navSlice.js";
import useQuotaExceeded from "../../common/util/useQuotaExceeded.js";
import { NavItem } from "../navbar/Navbar.js";

// React
import { useEffect } from "react";
import { useRouteMatch } from "react-router";
import { useDispatch, useSelector } from "react-redux";

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

    // tool
    const dispatch = useDispatch();

    // data
    const { path } = useRouteMatch();
    const curNavIdx = useSelector(selectIdx);

    // initialize
    useEffect(() => {
        const pageNavIdx = NavItem[RootURL.about].idx;
        if (curNavIdx !== pageNavIdx) {
            dispatch(changeIdx(pageNavIdx));
        }
    }, []);
    useQuotaExceeded(false);

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