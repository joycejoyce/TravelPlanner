// MUI
import { makeStyles } from "@material-ui/styles";

// my components
import ItineraryDetail from "./ItineraryDetail";
import AllItineraryCards from "./AllItineraryCards.js";
import { getStyles_routingPage } from "../../common/styles/styles.js";

// React
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import Navbar from "../navbar/Navbar";

const useStyles = makeStyles((theme) => {
    const animationPartStyles = getStyles_routingPage();

    return ({
        animationPart: {
            ...animationPartStyles,
            top: "150px"
        }
    });
});

export default function MyItineraries() {
    // styles
    const classes = useStyles();

    // routing data
    const { path, url } = useRouteMatch();

    return (
        <div>
            <Navbar />
            <div className={classes.animationPart}>
                <Switch>
                    <Route
                        path={`${path}/:itineraryName`}
                        render={() => (<ItineraryDetail />)}
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