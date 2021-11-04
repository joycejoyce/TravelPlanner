// MUI
import { makeStyles } from "@material-ui/styles";

// my components
import ItineraryDetailWrapper from "./ItineraryDetailWrapper.js";
import AllItineraryCards from "./AllItineraryCards.js";
import { getStyles_rootSubPages, getStyles_routingPage } from "../../common/styles/styles.js";
import { RootURL } from "../../config.json";
import useChangeNavIdx from "../../common/util/useChangeNavIdx.js";
import useQuotaExceeded from "../../common/util/useQuotaExceeded.js";

// React
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";

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

    // init
    useChangeNavIdx(RootURL.myItineraries);
    const quotaExceeded = useQuotaExceeded(true, setParentAnimationKey);

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