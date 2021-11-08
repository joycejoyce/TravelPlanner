// MUI
import { makeStyles } from "@material-ui/styles";

// my components
import ItineraryDetailWrapper from "./ItineraryDetailWrapper.js";
import AllItineraryCards from "./AllItineraryCards.js";
import { getStyles_rootSubPages, getStyles_routingPage } from "../../common/styles/styles.js";
import { RootURL } from "../../config.json";
import { NavItem } from "../navbar/Navbar.js";
import { selectIdx, changeIdx } from "../navbar/navSlice.js";
import useQuotaExceeded from "../../common/util/useQuotaExceeded.js";

// React
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => {
    const animationPartStyles = getStyles_routingPage();
    const pageStyles = getStyles_rootSubPages(theme);

    return ({
        animationPart: {
            ...animationPartStyles,
            ...pageStyles
        }
    });
});

export default function MyItineraries({ setAnimationKey: setParentAnimationKey }) {
    // styles
    const classes = useStyles();

    // data
    const { path } = useRouteMatch();
    const curNavIdx = useSelector(selectIdx);

    // tools
    const dispatch = useDispatch();

    // init
    useEffect(() => {
        const pageNavIdx = NavItem[RootURL.myItineraries].idx;
        if (curNavIdx !== pageNavIdx) {
            dispatch(changeIdx(pageNavIdx));
        }
    }, []);
    const quotaExceeded = useQuotaExceeded(true);

    if (!quotaExceeded) {
        return (
            <div>
                <div className={classes.animationPart}>
                    <Switch>
                        <Route
                            path={`${path}/:itineraryName`}
                            render={() => (<ItineraryDetailWrapper setParentAnimationKey={setParentAnimationKey} />)}
                        />
                        <Route
                            path={`${path}`}
                            render={() => (<AllItineraryCards />)}
                        />
                    </Switch>
                </div>
            </div>
        );
    }

    return (
        <></>
    );
}