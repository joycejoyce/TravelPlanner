// MUI
import { makeStyles } from "@material-ui/styles";

// my components
import ItineraryDetailWrapper from "./ItineraryDetailWrapper.js";
import AllItineraryCards from "./AllItineraryCards.js";
import { getStyles_routingPage } from "../../common/styles/styles.js";
import Navbar from "../navbar/Navbar.js";
import useExceedQuotaNotification from "../navbar/quota/useExceedQuotaNotification.js";

// React
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => {
    const animationPartStyles = getStyles_routingPage();

    return ({
        animationPart: {
            ...animationPartStyles,
            top: "110px",
            [theme.breakpoints.up('md')]: {
                top: "150px"
            }
        }
    });
});

export default function MyItineraries() {
    // styles
    const classes = useStyles();

    // routing data
    const { path, url } = useRouteMatch();

    const history = useHistory();
    const quotaExceeded = useExceedQuotaNotification(history);

    return (
        quotaExceeded && (<div>
            <Navbar />
            <div className={classes.animationPart}>
                <Switch>
                    <Route
                        path={`${path}/:itineraryName`}
                        render={() => (<ItineraryDetailWrapper />)}
                    />
                    <Route
                        path={`${path}`}
                        render={() => (<AllItineraryCards />)}
                    />
                </Switch>
            </div>
        </div>
    ));
}