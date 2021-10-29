// MUI
import { makeStyles } from "@material-ui/styles";

// my components
import { changeIdx } from "../navbar/navSlice";
import { NavItem } from "../navbar/Navbar.js";
import { RootURL } from "../../config.json";
import TableContents from "./TableContents.js";
import LanguageSelect from "./LanguageSelect.js";
import Sections from "./sections/Sections.js";
import GoTopButton from "./GoTopButton.js";
import { getStyles_pageTitle, getStyles_rootSubPages, getStyles_routingPage } from "../../common/styles/styles.js";

// React
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => {
    const animationPartStyles = getStyles_routingPage();
    const titleStyles = getStyles_pageTitle(theme);
    const pageStyles = getStyles_rootSubPages(theme);

    return ({
        animationPart: {
            ...animationPartStyles,
            ...pageStyles
        },
        contents: {
            textAlign: "center"
        },
        title: {
            ...titleStyles
        }
    });
});

export default function About() {
    // styles
    const classes = useStyles();

    // ctrl
    const dispatch = useDispatch();

    // initial actions
    const navIdx = NavItem[RootURL.about].idx;
    dispatch(changeIdx(navIdx));

    return (
        <div>
            <div className={classes.animationPart}>
                <div className={classes.about}>
                    <div className={["contents", classes.contents].join(" ")}>
                        <div className={classes.title}>About “Itinerary”</div>
                        <TableContents />
                        <LanguageSelect />
                        <Sections />
                        <GoTopButton />
                    </div>
                </div>
            </div>
        </div>
    );
}